import { useCallback, useState } from 'react';
import { codecs, codecMap } from '../codecs';

export function useDecoder() {
  const [formatId, setFormatId] = useState<string>(codecs[0].id);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Codec ativo: placeholder, exemplo e a função decode vêm daqui
  const codec = codecMap[formatId];

  const decode = useCallback(() => {
    try {
      setResult(codec.decode(input));
      setError(null);
    } catch (e) {
      setResult('');
      setError(e instanceof Error ? e.message : 'Não foi possível decodificar esse conteúdo.');
    }
  }, [codec, input]);

  // Ao trocar de formato, limpa tudo para não misturar entrada de um formato com o decode de outro
  const changeFormat = useCallback((id: string) => {
    setFormatId(id);
    setInput('');
    setResult('');
    setError(null);
  }, []);

  // Ao editar o texto, remove o erro antigo para não ficar apontando algo já corrigido
  const updateInput = useCallback((value: string) => {
    setInput(value);
    setError(null);
  }, []);

  return {
    formatId,
    codec,
    input,
    setInput: updateInput,
    result,
    error,
    decode,
    changeFormat,
  };
}
