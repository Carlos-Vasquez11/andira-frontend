"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useRef } from "react"

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
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let scrollPosition = 0

    const scroll = () => {
      scrollPosition += 0.5 // Speed of scroll

      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollPosition

        // Reset scroll when we've scrolled past half (for infinite effect)
        const maxScroll = scrollContainer.scrollWidth / 2
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0
        }
      }

      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  const duplicatedCompanies = [...companies, ...companies, ...companies, ...companies]

  return (
    <div className="relative overflow-hidden w-full">
      <div ref={scrollRef} className="flex gap-4 overflow-x-hidden" style={{ scrollBehavior: "auto" }}>
        {duplicatedCompanies.map((company, index) => (
          <Card
            key={`${company.name}-${index}`}
            className="flex-shrink-0 w-40 sm:w-48 md:w-52 lg:w-56 border-border bg-card hover:bg-accent/10 transition-colors"
          >
            <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 h-32 sm:h-40">
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
        ))}
      </div>
    </div>
  )
}
