import type { Codec } from './types';
import { ensureInput } from './utils';

/** Código Morse internacional → caractere. */
const MORSE_TABLE: Record<string, string> = {
  '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
  '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
  '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
  '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
  '-.--': 'Y', '--..': 'Z',
  '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
  '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9',
  '.-.-.-': '.', '--..--': ',', '..--..': '?', '.----.': "'", '-.-.--': '!',
  '-..-.': '/', '-.--.': '(', '-.--.-': ')', '.-...': '&', '---...': ':',
  '-.-.-.': ';', '-...-': '=', '.-.-.': '+', '-....-': '-', '..--.-': '_',
  '.-..-.': '"', '...-..-': '$', '.--.-.': '@',
};

export const morseCodec: Codec = {
  id: 'morse',
  label: 'Morse',
  placeholder: '--- ..',
  example: { input: '--- ..', output: 'OI' },

  decode(input) {
    const normalized = ensureInput(input)
      // Aceita variações visuais de ponto e traço
      .replace(/[•·∙]/g, '.')
      .replace(/[−–—]/g, '-')
      // Quebra de linha vira separador de palavra
      .replace(/\s*\n\s*/g, ' / ');

    // Palavras: "/" ou "|" (com ou sem espaços), ou 3+ espaços seguidos
    const words = normalized.split(/\s*[/|]\s*|\s{3,}/).filter((w) => w.trim() !== '');

    const decoded = words.map((word) =>
      word
        .trim()
        .split(/\s+/) // Letras: um espaço entre cada símbolo
        .map((symbol) => {
          if (!/^[.-]+$/.test(symbol)) {
            throw new Error(`Use apenas pontos (.) e traços (-). Símbolo inválido: "${symbol}".`);
          }
          const char = MORSE_TABLE[symbol];
          if (!char) {
            throw new Error(`Código Morse desconhecido: "${symbol}".`);
          }
          return char;
        })
        .join(''),
    );

    return decoded.join(' ');
  },
};
