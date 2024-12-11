import Image from "next/image";
import { api } from "@/data/api";
import type { Product } from "@/data/types/product";

interface ProductProps {
    params: {
        slug: string
    }
}

export async function getProduct(slug: string): Promise<Product> {
    const response = await api(`/products/${slug}`, {
        //cache: 'force-cache' // cache padrão
        //cache: 'no-store' // sem cache
        next: {
            revalidate: 60 * 60, // cache é invalido depois de 1h
        }
    })

    const product = await response.json()

    return product
}

export default async function ProductPage({ params }: ProductProps) {
    const product = await getProduct(params.slug)

    return (
        <div className="relative grid max-h-[860px] grid-cols-3">
            <div className="col-span-2 overflow-hidden">
                <Image
                    src={product.image}
                    alt=""
                    width={1000}
                    height={1000}
                    quality={100}
                />
            </div>

            <div className="flex flex-col justify-center px-12">
                <h1 className="text-3xl font-bold leading-tight">
                    {product.title}
                </h1>
                <p className="mt-2 text-zinc-400 leading-relaxed">
                    {product.description}
                </p>

                <div className="mt-8 flex items-center gap-3">
                    <span className="inline-block px-5 py-2.5 rounded-full bg-violet-500 font-semibold">
                        {product.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                    </span>
                    <span className="text-sm text-zinc-400">
                        Em 12x s/ juros de {(product.price / 12).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                    </span>
                </div>

                <div className="mt-8 space-y-4">
                    <span className="block font-semibold">Tamanhos</span>
                    <div className="flex gap-2">
                        <button type="button" className="flex items-center justify-center h-9 w-14 rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold">
                            P
                        </button>
                        <button type="button" className="flex items-center justify-center h-9 w-14 rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold">
                            M
                        </button>
                        <button type="button" className="flex items-center justify-center h-9 w-14 rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold">
                            G
                        </button>
                        <button type="button" className="flex items-center justify-center h-9 w-14 rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold">
                            GG
                        </button>
                    </div>
                </div>

                <button type="button" className="mt-8 flex items-center justify-center h-12 rounded-full bg-emerald-600 font-semibold text-white">
                    Adicionar ao carrinho
                </button>
            </div>
        </div>
    )
}