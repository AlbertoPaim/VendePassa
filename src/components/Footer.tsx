import { MdWhatsapp, MdEmail } from "react-icons/md";

export const Footer = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
    const sanitized = whatsappNumber.replace(/[^+\d]/g, '');
    const whatsappUrl = sanitized ? `https://api.whatsapp.com/send?phone=${sanitized}` : `https://wa.me/`;

    return (
        <footer className="w-full bg-white shadow-inner border-t mt-12">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold">Vende e Passa</h3>
                        <p className="text-sm text-gray-600 mt-1">Ajudamos você a encontrar ótimas oportunidades e vender com facilidade.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-green-600 font-semibold px-3 py-2 rounded-md hover:bg-green-50"
                        >
                            <MdWhatsapp size={20} />
                            <span>{whatsappNumber || 'WhatsApp'}</span>
                        </a>

                        <a
                            href="mailto:contato@vendeepassa.com"
                            className="inline-flex items-center gap-2 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50"
                        >
                            <MdEmail size={20} />
                            <span>contato@vendeepassa.com</span>
                        </a>
                    </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Vende e Passa. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    )
}