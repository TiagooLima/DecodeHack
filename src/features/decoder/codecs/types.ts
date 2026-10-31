export interface Codec {
  /** Identificador único, usado pelo registry e pelo estado do hook */
  id: string;
  /** Nome exibido no botão do seletor, ex.: "Binário" */
  label: string;
  /** Placeholder do textarea, ex.: "01001111 01101001" */
  placeholder: string;
  /** Exemplo mostrado abaixo do campo */
  example: { input: string; output: string };
  /** Converte a entrada em texto. Lança Error com mensagem em português se a entrada for inválida. */
  decode: (input: string) => string;
}
