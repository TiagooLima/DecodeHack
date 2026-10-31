import type { FormEvent, KeyboardEvent } from 'react';
import { ArrowRight, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';
import type { Codec } from '../codecs/types';

interface DecoderCardProps {
  /** Formato selecionado: define placeholder e exemplo */
  codec: Codec;
  input: string;
  onInputChange: (value: string) => void;
  onDecode: () => void;
  error: string | null;
}

export function DecoderCard({ codec, input, onInputChange, onDecode, error }: DecoderCardProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onDecode();
  };

  // Ctrl+Enter (ou Cmd+Enter) decodifica sem sair do campo
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onDecode();
    }
  };

  return (
    <Card aria-labelledby="decoder-title" className="flex h-full flex-col">
      <CardHeader
        icon={<Wallet size={18} />}
        label="Decodificação"
        description="Escolha o formato e insira o conteúdo."
      />

      <CardTitle description="Use binário, Morse, Base64 ou hexadecimal. O resultado aparece abaixo.">
        <span id="decoder-title">Qual código que você quer decodificar?</span>
      </CardTitle>

      <form onSubmit={handleSubmit} className="mt-auto flex flex-col gap-6 pt-6">
        <Textarea
          label="Mensagem a decodificar"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={codec.placeholder}
          hint={`Ex.: ${codec.example.input} → ${codec.example.output}`}
          error={error}
        />

        <Button
          type="submit"
          fullWidth
          disabled={!input.trim()}
          iconRight={<ArrowRight size={16} aria-hidden />}
        >
          Decodificar
        </Button>
      </form>
    </Card>
  );
}
