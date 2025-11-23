"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const companies = [
  { name: "Bolsa de Valores de Caracas", logo: "/companies/bvc.png" },
  { name: "Protinal", logo: "/companies/protinal.png" },
  { name: "Banco de Venezuela", logo: "/companies/bdv.jpg" },
  { name: "CANTV", logo: "/companies/cantv.png" },
  { name: "Bancaribe", logo: "/companies/bancaribe.png" },
  { name: "Banco Nacional de Crédito", logo: "/companies/bnc.png" },
  { name: "Ron Santa Teresa", logo: "/companies/santa-teresa.png" },
  { name: "Helados EFE", logo: "/companies/efe.jpg" },
  { name: "Cerámica Carabobo", logo: "/companies/ceramica-carabobo.png" },
]

export function CompaniesCarousel() {
  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {companies.map((company, index) => (
            <CarouselItem
              key={`${company.name}-${index}`}
              className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <Card className="border-border bg-card hover:bg-accent/10 transition-colors">
                <CardContent className="p-4 flex flex-col items-center justify-center gap-3 h-32 sm:h-40">
                  <div className="relative w-20 sm:w-24 h-12 sm:h-16 flex items-center justify-center">
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={company.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, 150px"
                    />
                  </div>
                  <p className="font-semibold text-foreground text-center text-xs sm:text-sm line-clamp-2">
                    {company.name}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
