import Image from "next/image";
import Link from "next/link";
import { MdWhatsapp, MdEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";

export const Footer = () => {
    const whatsappNumber = "+55 71 8602-0429";

    const sanitized = whatsappNumber.replace(/[^+\d]/g, '');
    const whatsappUrl = `https://wa.me/${sanitized}`

    return (
        <footer className="w-full bg-gradient-to-b  to-[var(--azulMedio)] bg-[var(--azulEscuro)]  shadow-inner border-t mt-12 text-white">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
                        <div className="w-40 md:w-48">
                            <Image src="/logo.png" width={192} height={64} alt="Vende Passa Logo" className="w-full h-auto" />
                        </div>
                        <p className="text-sm text-[var(--laranjaClaro)] max-w-sm">Ajudamos você a encontrar ótimas oportunidades e vender com facilidade.</p>
                    </div>

                    {/* Quick links */}
                    <nav aria-label="Links rápidos" className="flex flex-col sm:flex-row gap-6 items-center md:items-start">
                        <div className="flex flex-col gap-2 text-sm">
                            <span className="font-semibold text-white">Navegação</span>
                            <Link href="/" className="text-[var(--laranjaClaro)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--laranjaClaro)]">Início</Link>
                            <Link href="/sobre" className="text-[var(--laranjaClaro)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--laranjaClaro)]">Sobre</Link>
                            <Link href="/contatos" className="text-[var(--laranjaClaro)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--laranjaClaro)]">Contatos</Link>
                        </div>

                        <div className="flex flex-col gap-2 text-sm">
                            <span className="font-semibold text-white">Contato</span>

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Abrir WhatsApp"
                                className="w-full sm:w-auto inline-flex items-center gap-2 border border-white/20 text-white px-4 py-2 rounded-md transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--laranjaClaro)]"
                            >
                                <MdWhatsapp size={18} />
                                <span>{whatsappNumber || 'WhatsApp'}</span>
                            </a>

                            <a
                                target="_blank"
                                href={`mailto:contato@vendepassa.com`}
                                aria-label="Enviar email"
                                className="w-full sm:w-auto inline-flex items-center gap-2 border border-white/20 text-white px-4 py-2 rounded-md transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--laranjaClaro)]"
                            >
                                <MdEmail size={18} />
                                <span>vendepassa@gmail.com</span>
                            </a>
                            <a
                                target="_blank"
                                href="https://www.instagram.com/vendepassa"
                                className=" w-full sm:w-auto inline-flex items-center gap-2 border border-white/20 text-white px-4 py-2 rounded-md transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--laranjaClaro)]"
                            >
                                <FaInstagram />

                                <span>@vendepassa</span>
                            </a>

                        </div>
                    </nav>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
                    <div className="text-[var(--laranjaClaro)] text-xs">&copy; {new Date().getFullYear()} Vende e Passa. Todos os direitos reservados.</div>

                    <div className="text-xs text-white/70">Feito com ♡ · <span className="text-[var(--laranjaClaro)]">VendePassa</span></div>
                </div>
            </div>
        </footer>
    )
}