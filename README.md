# DecodeHack

Site para decodificar mensagens em **binário**, **Morse**, **Base64** e **hexadecimal**. A pessoa escolhe o formato, cola o conteúdo e recebe o texto já decodificado, pronto para copiar.

## Funcionalidades

- Decodificação de binário, Morse, Base64 e hexadecimal
- Exemplo e placeholder que mudam conforme o formato escolhido
- Botão de copiar o resultado, com feedback visual
- Tema claro e escuro, alternado por um botão no header
- Atalho `Ctrl + Enter` (ou `Cmd + Enter`) para decodificar sem tirar a mão do teclado

## Tecnologias

- React + TypeScript
- Vite
- Tailwind CSS v4
- lucide-react (ícones)

## A interface (React)

A interface é pequena: um seletor de formato, um card de entrada e um card de resultado. A ideia foi separar bem cada responsabilidade.

**Componentes de UI** (`components/ui`) são genéricos e não sabem nada sobre decodificação: `Button`, `Card`, `Textarea` e `CopyButton`. Eles usam só tokens de cor (`bg-surface`, `text-text-muted` etc.), então não precisam saber qual tema está ativo.

**Componentes da feature** (`features/decoder/components`) montam a tela em cima dos de UI: `FormatSelector`, `DecoderCard` e `ResultCard`. Eles só recebem props e desenham, sem lógica de decodificação.

**A página** (`DecoderPage`) é quem junta tudo. Ela chama o hook `useDecoder` e distribui o estado e as ações para os componentes.

**O hook** (`useDecoder`) guarda o estado (formato escolhido, texto digitado, resultado e erro) e, quando a pessoa clica em decodificar, procura o codec do formato selecionado e chama a função `decode` dele. O hook não sabe *como* decodificar, só *quem* chamar.

**O tema** funciona só no `<html>`: o hook `useTheme` liga e desliga a classe `dark` nele, e o CSS troca as variáveis de cor. Nenhum componente usa `dark:` espalhado.

### Estrutura de pastas

```
src/
├── app/
│   ├── App.tsx
│   └── main.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── PageContainer.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Textarea.tsx
│       └── CopyButton.tsx
├── features/
│   └── decoder/
│       ├── components/
│       │   ├── FormatSelector.tsx
│       │   ├── DecoderCard.tsx
│       │   └── ResultCard.tsx
│       ├── codecs/
│       │   ├── types.ts
│       │   ├── utils.ts
│       │   ├── binary.ts
│       │   ├── hex.ts
│       │   ├── base64.ts
│       │   ├── morse.ts
│       │   ├── index.ts
│       │   └── codecs.test.ts
│       ├── hooks/
│       │   └── useDecoder.ts
│       └── DecoderPage.tsx
├── hooks/
│   └── useTheme.ts
├── lib/
│   └── cn.ts
└── styles/
    └── theme.css
```

## As conversões (TypeScript puro)

Os codecs ficam em `features/decoder/codecs/` e **não usam React nem módulos do Node**. Cada um é só uma função que recebe uma `string` e devolve outra, ou lança um `Error` com uma mensagem explicando o que está errado.

### A ideia central: tudo vira byte

Texto, para o computador, é uma sequência de números (bytes). Binário, hexadecimal e Base64 são só jeitos diferentes de escrever esses mesmos números:

```
Texto:   O         i
Byte:    79        105
Binário: 01001111  01101001
Hex:     4F        69
```

### Funções usadas e por que

| Função | Onde | Por que usei |
|---|---|---|
| `parseInt(x, 2)` | `binary.ts` | Lê um texto como número na base 2. `parseInt('01001111', 2)` devolve `79`. |
| `parseInt(x, 16)` | `hex.ts` | Mesma função, mas na base 16. `parseInt('4F', 16)` também devolve `79`. |
| `atob()` | `base64.ts` | Já vem no navegador e decodifica Base64 para uma string em que cada caractere representa um byte. |
| `charCodeAt(0)` | `base64.ts` | Pega o número de cada caractere que o `atob` devolveu, transformando a string em bytes de verdade. |
| `TextDecoder` | `utils.ts` | Transforma bytes em texto entendendo UTF-8. |
| `split()` e `match()` | todos | Separam a entrada em pedaços (grupos de 8 bits, pares de hex, letras de Morse). |
| Regex (`/^[01]{8}$/` etc.) | todos | Validam cada pedaço antes de converter. |
| `Error` | todos | Cada codec lança um erro com mensagem clara, e o hook mostra essa mensagem na tela. |

**Sobre o `parseInt`:** sempre passo o segundo argumento (a base). Sem ele o JavaScript tenta adivinhar a base e isso dá resultado errado em alguns casos. Outro detalhe: quando o texto não é um número válido, o `parseInt` devolve `NaN` em vez de dar erro. Por isso a validação com regex vem **antes** da conversão, e não depois.

**Sobre o `TextDecoder`:** poderia converter cada byte com `String.fromCharCode`, e funcionaria para letras simples. Mas o "á" ocupa **2 bytes** em UTF-8 (`C3 A1`), e converter byte a byte mostraria `Ã¡`. O `TextDecoder` junta os bytes certos. Também usei a opção `fatal: true`: com ela, bytes que não formam um texto válido (como `11111111`) geram um erro, em vez de aparecer o caractere `�` no resultado.

**Sobre o `atob`:** ele devolve uma "string binária", em que cada caractere é um byte. Por isso ainda é preciso passar por `charCodeAt(0)` e depois pelo `TextDecoder`, senão acentos e emojis quebram.

### Como cada formato funciona

**Binário (`binary.ts`)**
1. Separa a entrada em grupos de 8 bits. Aceita com espaço (`01001111 01101001`) ou tudo junto (`0100111101101001`), quebrando de 8 em 8.
2. Valida cada grupo com `/^[01]{8}$/`.
3. Converte com `parseInt(grupo, 2)`.
4. Entrega os bytes ao `bytesToText`.

**Hexadecimal (`hex.ts`)**
1. Remove separadores (espaço, vírgula e `:`) e prefixos `0x`.
2. Valida se só tem dígitos de `0-9` e `A-F` e se a quantidade é par, já que cada byte usa 2 dígitos.
3. Quebra em pares com `match(/../g)`.
4. Converte com `parseInt(par, 16)`.

**Base64 (`base64.ts`)**
1. Limpa espaços e quebras de linha e aceita a variante URL-safe (`-` e `_` viram `+` e `/`).
2. Valida o alfabeto e refaz o padding (`=`) caso tenha sido omitido.
3. Decodifica com `atob()`.
4. Transforma cada caractere em byte com `charCodeAt(0)`.

**Morse (`morse.ts`)**

Esse é o único sem função pronta. Ele não passa por bytes: usa uma tabela (`MORSE_TABLE`) que liga cada sequência de pontos e traços a um caractere (`'.-'` → `A`, `'-...'` → `B`). Letras são separadas por espaço e palavras por `/`, `|`, quebra de linha ou três espaços ou mais. Também aceita `•` e `−` no lugar de `.` e `-`. Como o Morse não diferencia maiúsculas de minúsculas, o resultado sai em maiúsculas.

### O padrão `Codec` e o registry

Todo formato implementa a mesma interface (`types.ts`):

```ts
export interface Codec {
  id: string;
  label: string;        // nome no botão, ex.: "Binário"
  placeholder: string;  // texto de exemplo no campo
  example: { input: string; output: string };
  decode: (input: string) => string;
}
```

O `index.ts` junta todos em uma lista (`codecs`) e em um mapa por id (`codecMap`). O seletor de formato desenha os botões a partir da lista, e o hook busca o codec pelo id. Por causa disso, a interface não precisa saber quais formatos existem.

## Como rodar

```bash
# instalar as dependências
npm install

# rodar em modo de desenvolvimento
npm run dev

# rodar os testes
npm test
```

## Limitações e próximos passos

- Por enquanto o site só **decodifica**. Nas proximas versões irei adicionar a feature de codificação.
- O Morse usa a tabela internacional básica, sem letras acentuadas.
- Planejamento para a próxima versão: detecção automática do formato, e novos formatos como ROT13, URL encode e ASCII decimal.
