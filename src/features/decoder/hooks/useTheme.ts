import { useEffect, useState } from 'react';

export function useTheme() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return { dark, toggle: () => setDark(d => !d) };
}

/**
 * 
 * - Inicializa o tema com o valor salvo em `localStorage` na chave `theme`.
 * - Quando não há valor salvo, usa a preferência do sistema consultada por
 *   `window.matchMedia('(prefers-color-scheme: dark)')`.
 * - Mantém o estado `dark` atualizado e, após cada alteração, adiciona ou
 *   remove a classe `dark` do elemento `<html>`.
 * - Persiste cada alteração em `localStorage` como `'dark'` ou `'light'`.
 * - Retorna `dark`, um booleano que indica se o tema escuro está ativo, e
 *   `toggle`, uma função que alterna entre os temas.
 *
 * Não recebe parâmetros. Depende de `localStorage`, `window` e `document`,
 * portanto deve ser usado em ambiente de navegador, não durante renderização
 * no servidor sem uma camada que forneça essas APIs.
 */