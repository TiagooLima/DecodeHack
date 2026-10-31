import { Wallet } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { CopyButton } from '@/components/ui/CopyButton';
import { Textarea } from '@/components/ui/Textarea';

interface ResultCardProps {
  result: string;
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <Card aria-labelledby="result-title" className="flex h-full flex-col">
      <CardHeader
        icon={<Wallet size={18} />}
        label="Resultado"
        description="Decodificação pronta para copiar."
      />

      <CardTitle description="O texto decodificado aparece abaixo.">
        <span id="result-title">Resultado da decodificação</span>
      </CardTitle>

      <div className="mt-auto flex flex-col gap-6 pt-6">
        <Textarea
          label="Mensagem decodificada"
          readOnly
          aria-label="Texto decodificado"
          value={result}
          hint='A mensagem pode ser copiada para a área de transferência.'
          placeholder="O resultado aparece aqui."
        />

        <CopyButton text={result} fullWidth />
      </div>
    </Card>
  );
}
