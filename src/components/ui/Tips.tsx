import Image from "next/image"

export default function Tips() {
    return (
        <section className=" w-full rounded-xl overflow-hidden mb-8 relative">
            <h3 className="text-2xl text-center sm:text-3xl md:text-4xl font-extrabold drop-shadow-2xl mb-3">Dicas & Cuidados</h3>
            <p className="text-sm text-center sm:text-base md:text-lg opacity-95 drop-shadow-md">Encontre a peça certa e mantenha a qualidade: recomendações práticas para escolher tamanho e conservar suas roupas.</p>

            <div className="relative w-full sm:h-72 md:h-80 lg:h-96">

                <Image
                    src="/passas.png"
                    alt="Dicas Vende Passa"
                    fill
                    sizes="100vw"
                    className="object-contain"
                />

                <div className="absolute inset-0 flex items-center justify-center px-6">

                </div>
            </div>

            <div className="text-black mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <article className="bg-white/6 dark:bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-black">
                    <h4 className="font-semibold mb-1">Escolha do tamanho</h4>
                    <p className="text-sm opacity-90">Meça sua peça favorita e compare com as medidas do anúncio. Quando em dúvida, prefira o tamanho maior para conforto.</p>
                </article>

                <article className="bg-white/6 dark:bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-black">
                    <h4 className="font-semibold mb-1">Higiene e qualidade</h4>
                    <p className="text-sm opacity-90">Todas as peças são inspecionadas e higienizadas antes de postar. Recomendamos lavar conforme etiqueta (água morna, sabão suave) e evitar alvejantes fortes.</p>
                </article>

                <article className="bg-white/6 dark:bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-black">
                    <h4 className="font-semibold mb-1">Como escolher</h4>
                    <p className="text-sm opacity-90">Considere o caimento, tecido e ocasião. Para peças justas, verifique medidas de cintura/peito; para sobreposição, deixe folga para conforto.</p>
                </article>
            </div>
        </section>
    )
}
