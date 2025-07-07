"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const facts = [
  {
    id: 1,
    title: "Tahukah kamu?",
    content:
      "Ternyata, kita tuh bikin sekitar 226 keputusan soal makanan setiap hari — dan kebanyakan tanpa sadar!",
    source: "Wansink & Sobal, 2007",
  },
  {
    id: 2,
    title: "Tahukah kamu?",
    content:
      "Lebih dari setengah orang dewasa (52%) stres setiap hari cuma gara-gara bingung mau makan apa.",
    source: "Harris Poll, 2021",
  },
  {
    id: 3,
    title: "Tahukah kamu?",
    content:
      "Bayangin, kita habiskan sekitar 132 jam setahun cuma buat mikirin: “Makan apa ya hari ini?”",
    source: "Waitrose Food Report",
  },
];

export function FactsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full px-6">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {facts.map((fact) => (
            <CarouselItem key={fact.id}>
              <Card className="border-none shadow-md bg-gradient-to-b from-[#3b1b61] to-[#1a0433] rounded-3xl py-4">
                <CardContent className="px-6">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {fact.title}
                  </h3>
                  <p className="text-sm text-gray-300 font-medium leading-relaxed">
                    {fact.content}
                  </p>
                  <p className="text-right text-xs italic">{fact.source}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Dot Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {facts.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-2 h-2 min-h-2 rounded-full transition-all duration-200 ${
                index === current ? "bg-white" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
