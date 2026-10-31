import { useId } from 'react';
import { Button } from '@/components/ui/Button';
import type { Codec } from '../codecs/types';

interface FormatSelectorProps {
  formats: Pick<Codec, 'id' | 'label'>[];
  value: string;
  onChange: (id: string) => void;
}

/** Linha de botões "Escolha o formato". O formato ativo usa o estilo primário. */
export function FormatSelector({ formats, value, onChange }: FormatSelectorProps) {
  const labelId = useId();

  return (
    <div className="flex flex-col gap-2">
      <span id={labelId} className="text-xs text-text-secondary">
        Escolha o formato
      </span>

      <div role="group" aria-labelledby={labelId} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {formats.map((format) => {
          const active = format.id === value;
          return (
            <Button
              key={format.id}
              size="sm"
              variant={active ? 'primary' : 'secondary'}
              aria-pressed={active}
              onClick={() => onChange(format.id)}
            >
              {format.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
