
import { FactsCarousel } from "@/components/facts-carousel";
import { PopularFoods } from "@/components/popular-foods";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold pt-10 text-center">
          Makan Apa Kita Hari Ini?
        </h1>
      </header>

      {/* Main Content */}
      <main className="pb-4">
        {/* Section 1: Facts Carousel */}
        <section className="py-6">
          <FactsCarousel />
        </section>

        {/* Section 2: Popular Foods */}
        <section className="py-1">
          <PopularFoods />
        </section>

        <Link href="/mood">
          <Button
            size="lg"
            className="rounded-full fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50"
          >
            Aku mau makan! 🤤
          </Button>
        </Link>
      </main>
    </div>
  );
}
