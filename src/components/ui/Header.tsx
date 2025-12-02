export const Header = () => {
    return (
        <header className="bg-button z-100 text-white fixed top-0 right-0 left-0 flex justify-between items-center shadow-md p-4">
            <h1 className="text-2xl font-bold">Vende e Passa</h1>
            <nav>
                <ul className="flex gap-4 text-xl">
                    <a className="hover:text-input" href="/"><li>Inicio</li></a>
                    <a className="hover:text-input" href="/sobre"><li>Sobre</li></a>
                    <a className="hover:text-input" href="/contatos"><li>Contatos</li></a>
                </ul>
            </nav>
        </header>
    )
}