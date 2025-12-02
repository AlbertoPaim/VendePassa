import { getItens } from '@/config/axios';
import { ItemGrid } from '@/components/ui/itemGrid';

export default async function Home() {
  const itens = await getItens();


  return (
    <main className="max-w-[1200px] w-full flex flex-col items-center mx-auto px-4">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-primary font-heading text-center">
        Vende Passa
      </h1>
      <p className="text-lg text-secondary mb-2 text-center max-w-2xl">
        Descubra tesouros e dê uma nova vida a itens incríveis.
      </p>

      <ItemGrid items={itens} />

    </main>
  );
}