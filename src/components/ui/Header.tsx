export const Header = () => {
    return (
        <header className="backdrop-blur-sm bg-white/60 dark:bg-slate-900/60 z-50 fixed inset-x-0 top-0 flex items-center justify-between px-6 py-3 shadow-sm border-b border-gray-200/50">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Vende e Passa</h1>
            <nav>
                <ul className="flex gap-6 items-center">
                    <a className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300" href="/"><li>Início</li></a>
                    <a className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300" href="/sobre"><li>Sobre</li></a>
                    <a className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300" href="/contatos"><li>Contatos</li></a>
                </ul>
            </nav>
        </header>
    )
} 