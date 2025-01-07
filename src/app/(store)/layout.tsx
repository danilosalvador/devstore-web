import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { CartProvider } from "../contexts/cart-context";

export default function SoreLayout({ children }: { children: ReactNode }) {
    return (
        <CartProvider>
            <div className="min-h-screen w-full max-w-[1600px] mx-auto grid grid-rows-[min-content_max-content] gap-5 p-8">
                <Header />
                {children}
            </div>
        </CartProvider>
    )
}
