import { z } from 'zod'
import data from '../data.json'
import { NextResponse } from 'next/server'

export async function GET(
    _: Request,
    { params }: { params: { slug: string } }
) {
    await new Promise(resolve => setTimeout(resolve, 3000)) //simular um delay na chamada

    const slug = z.string().parse(params.slug)

    const product = data.products.find(product => product.slug === slug)

    console.log(product)

    if (!product) {
        return Response.json(
            {
                message: 'Product not found',
            },
            {
                status: 400,
            }
        )
    }

    return Response.json(product)
}
