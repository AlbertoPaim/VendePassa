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
                    className="w-[300px] bg-white/80 backdrop-blur-sm justify-between rounded-lg shadow-sm"
                >
                    {value
                        ? category.find((category) => category.value === value)?.label
                        : "Filtrar"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Filtrar" className="h-9" />
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