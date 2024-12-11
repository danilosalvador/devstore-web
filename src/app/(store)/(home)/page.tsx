import Image from "next/image";
import Link from "next/link";
import { api } from "@/data/api";
import type { Product } from "@/data/types/product";

export async function getFeaturedProducts(): Promise<Product[]> {
    const response = await api('/products/featured', {
        //cache: 'force-cache' // cache padrão
        //cache: 'no-store' // sem cache
        next: {
            revalidate: 60 * 60, // cache é invalido depois de 1h
        }
    })

    const products = await response.json()

    return products
}

export default async function Home() {
    const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

    return (
        <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
            <Link
                href={`/product/${highlightedProduct.slug}`}
                className="relative group col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-center"
            >
                <Image
                    className="group-hover:scale-105 transition-transform duration-500"
                    src={highlightedProduct.image}
                    width={920}
                    height={920}
                    quality={100}
                    alt=""
                />

                <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[350px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                    <span className="text-sm truncate">{highlightedProduct.title}</span>
                    <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                        {highlightedProduct.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}
                    </span>
                </div>
            </Link>
            {otherProducts.map((product) => (
                <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="relative group col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-center"
                >
                    <Image
                        className="group-hover:scale-105 transition-transform duration-500"
                        src={product.image}
                        width={920}
                        height={920}
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
    )
}