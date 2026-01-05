'use client';

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const category = [
    { value: "ROUPAS", label: "Roupas" },
    { value: "CALCADOS", label: "Calçados" },
    { value: "ELETRONICOS", label: "Eletrônicos" },
    { value: "LIVROS", label: "Livros" },
    { value: "DECORACAO", label: "Decoração" },
    { value: "OUTROS", label: "Outros" },
    { value: "", label: "Remover Filtro" },
]

interface FiltroProps {
    onCategoryChange: (categoryValue: string) => void;
}

export function Filtro({ onCategoryChange }: FiltroProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[300px] bg-gradient-to-r from-white/10 via-white/5 to-transparent dark:from-white/5 dark:via-white/3 backdrop-blur-md justify-between rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-200 transform hover:scale-105 border border-white/10 dark:border-white/20 px-4 py-2"
                >
                    <div className="flex items-center gap-3 min-w-0">
                        <span className={cn("w-2 h-2 rounded-full transition-all", value ? "bg-gradient-to-r from-green-400 to-blue-500 ring-1 ring-white/20" : "bg-transparent")} />
                        <span className=" text-[var(--azulEscuro)] truncate text-sm font-medium min-w-0">
                            {value
                                ? category.find((category) => category.value === value)?.label
                                : "Filtrar"}
                        </span>
                    </div>
                    <ChevronsUpDown className={cn("transition-transform", value ? "text-white rotate-180" : "opacity-60")} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-2 rounded-xl border border-white/10 dark:border-white/20 bg-background/60 backdrop-blur-md shadow-2xl">
                <Command>
                    <CommandInput placeholder="Filtrar" className="h-10 px-3 rounded-md bg-transparent placeholder:text-muted-foreground" />
                    <CommandList>
                        <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                        <CommandGroup>
                            {category.map((category) => (
                                <CommandItem
                                    key={category.value}
                                    value={category.value}
                                    onSelect={(currentValue) => {
                                        const newValue = currentValue === value ? "" : currentValue;

                                        setValue(newValue)
                                        setOpen(false)

                                        onCategoryChange(newValue);
                                    }}
                                    className="rounded-md hover:bg-accent/30 transition-colors px-2 py-2"
                                >
                                    {category.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === category.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}