import Image from "next/image"
import { MdWhatsapp, MdEmail } from "react-icons/md";

export default function Sobre() {
    const whatsappNumber = "+55 71 8602-0429";
    const sanitized = whatsappNumber.replace(/[^+\d]/g, '');
    const whatsappUrl = `https://wa.me/${sanitized}`
    return (
        <main className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
                <header className="mb-6">
                    <h1 className="text-3xl font-extrabold">Sobre a Vende e Passa</h1>
                    <p className="mt-2 text-gray-600">Conectando compradores de forma simples, rápida e segura.</p>
                </header>

                <section className="grid gap-6 md:grid-cols-2">
                    <div>
                        <h2 className="text-xl font-bold mb-2">Nossa missão</h2>
                        <p className="text-gray-700">Facilitar a negociação de itens usados e novos, oferecendo uma plataforma confiável e fácil de usar para que todos possam comprar com confiança.</p>

                        <h3 className="text-lg font-semibold mt-4">Valores</h3>
                        <ul className="list-disc list-inside text-gray-700 mt-2">
                            <li>Transparência e confiança</li>
                            <li>Simplicidade e usabilidade</li>
                            <li>Comunidade e respeito</li>
                        </ul>
                    </div>


                    <div>

                        <Image
                            src="/passas.png"
                            alt="Dicas Vende Passa"
                            height={500}
                            width={500}
                            sizes="100vw"
                            className="object-contain "
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-2">Fale com a gente</h2>
                        <p className="text-gray-700 mb-4">Tem dúvidas? Entre em contato pelos canais abaixo.</p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-md font-semibold">
                                <MdWhatsapp /> WhatsApp
                            </a>

                            <a href="mailto:contato@vendeepassa.com" className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium">
                                <MdEmail /> contato@vendeepassa.com
                            </a>
                        </div>
                    </div>


                </section>

                <footer className="mt-8 text-sm text-gray-500">Quer saber mais? Envie uma mensagem, teremos prazer em ajudar.</footer>

            </div>


        </main>
    );
}
