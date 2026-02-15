import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/10">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        {/* Placeholder for more sections like Pricing */}
      </main>
      <Footer />
    </div>
  )
}
