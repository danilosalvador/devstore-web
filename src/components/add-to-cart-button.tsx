'use client'

import { useCart } from "@/app/contexts/cart-context"

interface AddToCartButtonProps {
    productId: number
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
    const { addToCart } = useCart()

    function handleAddProductToCart() {
        addToCart(productId)
    }

    return (
        <button
            className="mt-8 flex items-center justify-center h-12 rounded-full bg-emerald-600 font-semibold text-white"
            type="button"
            onClick={handleAddProductToCart}
        >
            Adicionar ao carrinho
        </button>
    )
}