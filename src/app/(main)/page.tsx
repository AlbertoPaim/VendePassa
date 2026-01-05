import { getItens } from '@/config/axios';
import { ItemGrid } from '@/components/ui/itemGrid';
import Hero from '@/components/ui/Hero';

export default async function Home() {
  const itens = await getItens();


  return (
    <main className="max-w-[1200px] w-full flex flex-col items-center mx-auto px-4">

      <h1 className="mt-10 text-[var(--azulEscuro)] text-4xl font-extrabold tracking-tight mb-4 font-heading text-center">
        Vende Passa
      </h1>


      <Hero items={itens} />

      <p className=" text-[var(--azulEscuro)] text-xl text-secondary mb-2 text-center max-w-2xl">
        Descubra tesouros e dê uma nova vida a itens incríveis.
      </p>
      <ItemGrid items={itens} />

    </main>
  );
}