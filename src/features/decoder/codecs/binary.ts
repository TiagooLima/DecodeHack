import type { Codec } from './types';
import { bytesToText, ensureInput } from './utils';

export const binaryCodec: Codec = {
  id: 'binary',
  label: 'Binário',
  placeholder: '01001111 01101001',
  example: { input: '01001111 01101001', output: 'Oi' },

  decode(input) {
    const clean = ensureInput(input);

    // Aceita grupos separados por espaço ("01001111 01101001")
    // ou tudo junto ("0100111101101001"), quebrando de 8 em 8 bits.
    const groups = /\s/.test(clean) ? clean.split(/\s+/) : (clean.match(/.{1,8}/g) ?? []);

    if (!groups.every((g) => /^[01]{8}$/.test(g))) {
      throw new Error('Use apenas 0 e 1, em grupos de 8 bits (ex.: 01001111 01101001).');
    }

    const bytes = groups.map((g) => parseInt(g, 2));
    return bytesToText(bytes);
  },
};
