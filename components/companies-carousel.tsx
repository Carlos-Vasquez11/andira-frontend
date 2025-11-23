"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

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
  // The animation translates -50%, so we need 2 full sets visible at least, using 3 for safety on wide screens
  const allCompanies = [...companies, ...companies, ...companies]

  return (
    <div className="w-full overflow-hidden">
      <div className="flex animate-marquee">
        {allCompanies.map((company, index) => (
          <div key={`${company.name}-${index}`} className="flex-shrink-0 px-4 w-[160px] sm:w-[200px] md:w-[240px]">
            <Card className="border-border bg-card hover:bg-accent/10 transition-colors h-full">
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
          </div>
        ))}
      </div>
    </div>
  )
}
