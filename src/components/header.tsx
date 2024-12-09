import Link from "next/link";
import Image from "next/image";

import { Search, ShoppingBag } from 'lucide-react'

export function Header() {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
                <Link href="/" className="text-2xl font-extrabold text-white">
                    devstore
                </Link>

                <form className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700">
                    <Search className="w5 h-5 text-zinc-500" />

                    <input type="text" placeholder="Buscar produtos..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500" />
                </form>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-sm">Cart (0)</span>
                </div>

                <div className="w-px h-4 bg-zinc-600" />

                <Link href="/" className="flex items-center gap-2 hover:underline">
                    <span className="text-sm">Account</span>
                    <Image
                        width={24}
                        height={24}
                        alt=""
                        src="https://github.com/danilosalvador.png"
                        className="w-6 h-6 rounded-full"
                    />
                </Link>
            </div>
        </div>
    )
}