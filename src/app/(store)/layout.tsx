import { Header } from "@/components/header";
import type { ReactNode } from "react";

export default function SoreLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen w-full max-w-[1600px] mx-auto grid grid-rows-[min-content_max-content] gap-5 p-8">
            <Header />
            {children}
        </div>
    )
}