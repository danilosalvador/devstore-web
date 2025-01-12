import type { Metadata } from "next";
import Image from "next/image";
import { api } from "@/data/api";
import type { Product } from "@/data/types/product";
import { AddToCartButton } from "@/components/add-to-cart-button";

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

export async function generateMetadata({ params }: ProductProps): Promise<Metadata> {
    const p = await params;
    const product = await getProduct(p.slug)

    return {
        title: product.title,
    }
}

/*
    Geração estática no Next.js
    Permite criar uma versão em cache das páginas da aplicação antes de serem publicadas.
    A função [generateStaticParams] deve retornar um array de objetos, onde cada objeto representa um parâmetro que desejamos gerar de forma estática.
    Recomenda-se utilizar a geração estática apenas para páginas que são realmente importantes e que precisam ser carregadas de forma rápida.

    Comando de build: npm run build
    Comando para iniciar: npm run start
*/
export async function generateStaticParams() {
    const response = await api('/products/featured')
    const products: Product[] = await response.json()

    return products.map((product) => {
        return { slug: product.slug }
    })
}

export default async function ProductPage({ params }: ProductProps) {
    const p = await params;
    const product = await getProduct(p.slug)

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

                <AddToCartButton
                    productId={product.id}
                />
            </div>
        </div>
    )
}