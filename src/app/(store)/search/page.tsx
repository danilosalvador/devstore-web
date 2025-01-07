import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { api } from "@/data/api";
import type { Product } from "@/data/types/product";

interface SearchProps {
    searchParams: {
        q: string
    }
}

export async function getSearchProducts(query: string): Promise<Product[]> {
    const response = await api(`/products/search?q=${query}`, {
        //cache: 'force-cache' // cache (valor padrão)
        //cache: 'no-store' // sem cache
        next: {
            revalidate: 60 * 60, // cache é invalido depois de 1h
        }
    })

    const products = await response.json()

    return products
}

export default async function Search({ searchParams }: SearchProps) {
    const { q: query } = searchParams

    if (!query) {
        redirect('/')
    }

    const products = await getSearchProducts(query)

    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm">
                Resultados para: <span className="font-semibold">{query}</span>
            </p>

            <div className="grid grid-cols-3 gap-6">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        className="relative group rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-center"
                    >
                        <Image
                            className="group-hover:scale-105 transition-transform duration-500"
                            src={product.image}
                            width={480}
                            height={480}
                            quality={100}
                            alt=""
                        />

                        <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[350px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                            <span className="text-sm truncate">{product.title}</span>
                            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                                {product.price.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
