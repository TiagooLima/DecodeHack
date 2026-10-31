import { base64Codec } from './base64';
import { binaryCodec } from './binary';
import { hexCodec } from './hex';
import { morseCodec } from './morse';
import type { Codec } from './types';

export type { Codec } from './types';

/** Ordem desta lista = ordem dos botões no FormatSelector. */
export const codecs: Codec[] = [binaryCodec, morseCodec, base64Codec, hexCodec];

/** Busca por id, usada pelo useDecoder. */
export const codecMap: Record<string, Codec> = Object.fromEntries(codecs.map((c) => [c.id, c]));
