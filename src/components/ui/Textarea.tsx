import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Rótulo acima do campo, ex.: "Mensagem a decodificar" */
  label?: string;
  /** Dica acima do campo, ex.: "Ex.: 01001111 01101001 → Oi" */
  hint?: string;
  /** Mensagem de erro. Quando existe, substitui a dica e marca o campo como inválido */
  error?: string | null;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, id, className, rows = 3, ...props },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const messageId = `${fieldId}-message`;
  const message = error || hint;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={fieldId} className="text-xs text-text-secondary">
          {label}
        </label>
      )}

      {message && (
        <p
          id={messageId}
          role={error ? 'alert' : undefined}
          className={cn('text-[11px] leading-4', error ? 'text-danger' : 'text-text-muted')}
        >
          {message}
        </p>
      )}

      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        spellCheck={false}
        className={cn(
          'min-h-48 w-full resize-y rounded-xl border bg-input px-4 py-3.5 text-sm leading-relaxed text-text',
          'placeholder:text-text-muted',
          'transition-[border-color,box-shadow] duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary/25 focus-visible:shadow-[0_0_12px_2px_color-mix(in_srgb,var(--text-secondary)_15%,transparent)]',
          'read-only:cursor-default',
          error ? 'border-danger' : 'border-border-strong hover:border-text-muted',
          className,
        )}
        {...props}
      />

    </div>
  );
});
