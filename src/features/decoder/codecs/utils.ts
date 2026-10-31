/** Remove espaços das pontas e lança erro se o campo estiver vazio. */
export function ensureInput(input: string): string {
  const clean = input.trim();
  if (!clean) {
    throw new Error('Digite ou cole um conteúdo para decodificar.');
  }
  return clean;
}

/**
 * Converte bytes em texto UTF-8.
 * `fatal: true` faz o TextDecoder falhar com bytes inválidos,
 * em vez de devolver caracteres estranhos (�).
 */
export function bytesToText(bytes: ArrayLike<number>): string {
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(bytes));
  } catch {
    throw new Error('Esse conteúdo não forma um texto válido (UTF-8). Confira se o formato escolhido está certo.');
  }
}
