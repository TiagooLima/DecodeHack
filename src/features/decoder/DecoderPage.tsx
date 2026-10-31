import { PageContainer } from '@/components/layout/PageContainer';
import { codecs, codecMap } from './codecs'; 
import { DecoderCard } from './components/DecoderCard';
import { FormatSelector } from './components/FormatSelector';
import { ResultCard } from './components/ResultCard';
import { useDecoder } from './hooks/useDecoder'; 

export function DecoderPage() {
  const { formatId, input, setInput, result, error, decode, changeFormat } = useDecoder();
  const codec = codecMap[formatId];

  return (
    <main className="pb-24 pt-16 sm:pt-20">
      {/* Hero */}
      <PageContainer size="wide" className="text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted">
          Decodificações em um único lugar
        </p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight text-text sm:text-4xl">
          Decodifique mensagens, códigos e dados
        </h1>
        <p className="mt-4 text-sm text-text-secondary">
          Escolha o formato, insira o conteúdo e veja a decodificação pronta para copiar.
        </p>
      </PageContainer>

      {/* Ferramenta */}
      <PageContainer size="full" className="mt-10 flex flex-col gap-5">
        <FormatSelector formats={codecs} value={formatId} onChange={changeFormat} />

        <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
          <DecoderCard
            codec={codec}
            input={input}
            onInputChange={setInput}
            onDecode={decode}
            error={error}
          />

          <ResultCard result={result} />
        </div>
      </PageContainer>
    </main>
  );
}
