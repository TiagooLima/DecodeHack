import type { Codec } from './types';
import { bytesToText, ensureInput } from './utils';

export const base64Codec: Codec = {
  id: 'base64',
  label: 'Base64',
  placeholder: 'T2k=',
  example: { input: 'T2k=', output: 'Oi' },

  decode(input) {
    // Remove espaços e quebras de linha e aceita a variante URL-safe (- e _)
    const normalized = ensureInput(input)
      .replace(/\s+/g, '')
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .replace(/=+$/, '');

    if (!/^[A-Za-z0-9+/]+$/.test(normalized)) {
      throw new Error('Base64 inválido. Use apenas letras, números, + e / (e = no final).');
    }
    if (normalized.length % 4 === 1) {
      throw new Error('Base64 incompleto. Confira se o texto foi copiado por inteiro.');
    }

    // Refaz o padding (=) que pode ter sido omitido
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);

    let binary: string;
    try {
      binary = atob(padded);
    } catch {
      throw new Error('Base64 inválido. Confira se o texto foi copiado por inteiro.');
    }

    // atob devolve uma string em que cada caractere é um byte
    const bytes = Array.from(binary, (char) => char.charCodeAt(0));
    return bytesToText(bytes);
  },
};
