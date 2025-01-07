// Generate images using code (.js, .ts, .tsx)
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx

import { ImageResponse } from 'next/og'
import type { Product } from '@/data/types/product'
import { api } from '@/data/api'
import { env } from '@/env'

import colors from 'tailwindcss/colors'

export const runtime = 'edge'

// Image metadata
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#config-exports
export const alt = 'About Acme'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

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

// Image generation
export default async function OgImage({ params }: { params: { slug: string } }) {
    const product = await getProduct(params.slug)

    const productImageURL = new URL(product.image, env.APP_URL).toString()

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    backgroundColor: colors.zinc[950],
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <img
                    src={productImageURL}
                    alt=""
                    style={{ width: '100%' }}
                />
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
        }
    )
}