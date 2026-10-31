import type { Codec } from './types';
import { bytesToText, ensureInput } from './utils';

export const hexCodec: Codec = {
  id: 'hex',
  label: 'Hex',
  placeholder: '4F 69',
  example: { input: '4F 69', output: 'Oi' },

  decode(input) {
    const clean = ensureInput(input);

    // Aceita "4F 69", "4f69", "0x4F 0x69", "4F,69" e "4F:69"
    const hex = clean
      .split(/[\s,:]+/)
      .map((token) => token.replace(/^0x/i, ''))
      .join('');

    if (!/^[0-9a-f]+$/i.test(hex)) {
      throw new Error('Use apenas dígitos hexadecimais (0-9 e A-F).');
    }
    if (hex.length % 2 !== 0) {
      throw new Error('Cada byte precisa de 2 dígitos hexadecimais. Confira se não falta algum dígito.');
    }

    const bytes = (hex.match(/../g) ?? []).map((pair) => parseInt(pair, 16));
    return bytesToText(bytes);
  },
};
