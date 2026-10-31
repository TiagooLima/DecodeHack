import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button, type ButtonProps } from './Button';

interface CopyButtonProps extends Omit<ButtonProps, 'onClick' | 'children' | 'iconLeft' | 'iconRight'> {
  /** Texto que será copiado */
  text: string;
  /** Tempo (ms) que o estado "Copiado!" fica visível */
  feedbackMs?: number;
  label?: string;
  copiedLabel?: string;
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback para contextos sem Clipboard API (http, navegadores antigos)
    try {
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(el);
      return ok;
    } catch {
      return false;
    }
  }
}

export function CopyButton({
  text,
  feedbackMs = 2000,
  label = 'Copiar',
  copiedLabel = 'Copiado!',
  variant = 'primary',
  disabled,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = async () => {
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (!ok) return;

    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), feedbackMs);
  };

  return (
    <>
      <Button
        variant={variant}
        disabled={disabled || !text}
        onClick={handleClick}
        iconLeft={copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
        {...props}
      >
        {copied ? copiedLabel : label}
      </Button>
      {/* Anuncia o feedback para leitores de tela */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ''}
      </span>
    </>
  );
}
