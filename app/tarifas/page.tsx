"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { Building2, User, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function TarifasPage() {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-foreground/80 hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Link>
      </div>

      {/* Pricing Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-neon-cyan to-neon-blue bg-clip-text text-transparent">
              Tarifas
            </h2>
            <p className="text-xl text-foreground/70">Comisiones competitivas y transparentes para todos</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Natural Person Card */}
            <Card className="relative border-0 overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-card to-card" />
              <div className="absolute inset-0 bg-gradient-to-t from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader className="relative z-10 pb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-cyan flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-background" />
                </div>
                <CardTitle className="text-2xl">Personas Naturales</CardTitle>
                <CardDescription className="text-base">Para inversionistas individuales</CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 space-y-5">
                <div className="flex justify-between items-center py-3 border-b border-border/30">
                  <span className="text-foreground/70">Comisión por compra</span>
                  <span className="text-xl font-bold text-foreground">0.5%</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/30">
                  <span className="text-foreground/70">Comisión por venta</span>
                  <span className="text-xl font-bold text-foreground">1.5%</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-foreground/70">Custodia mensual</span>
                  <span className="text-xl font-bold text-neon-cyan flex items-center gap-2">
                    <Check className="h-5 w-5" />0 VEF
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-foreground/70">Apertura de cuenta</span>
                  <span className="text-xl font-bold text-neon-cyan flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    Gratis
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-foreground/70">Monto mínimo</span>
                  <span className="text-xl font-bold text-neon-cyan flex items-center gap-2">
                    <Check className="h-5 w-5" />0 VEF
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Legal Person Card */}
            <Card className="relative border-0 overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-card to-card" />
              <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader className="relative z-10 pb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8 text-background" />
                </div>
                <CardTitle className="text-2xl">Personas Jurídicas</CardTitle>
                <CardDescription className="text-base">Para empresas e instituciones</CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 space-y-5">
                <div className="flex justify-between items-center py-3 border-b border-border/30">
                  <span className="text-foreground/70">Comisión por compra</span>
                  <span className="text-xl font-bold text-foreground">0.5%</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/30">
                  <span className="text-foreground/70">Comisión por venta</span>
                  <span className="text-xl font-bold text-foreground">1.5%</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-foreground/70">Custodia mensual</span>
                  <span className="text-xl font-bold text-neon-cyan flex items-center gap-2">
                    <Check className="h-5 w-5" />0 VEF
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-foreground/70">Apertura de cuenta</span>
                  <span className="text-xl font-bold text-neon-cyan flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    Gratis
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-foreground/70">Monto mínimo</span>
                  <span className="text-xl font-bold text-neon-cyan flex items-center gap-2">
                    <Check className="h-5 w-5" />0 VEF
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-gradient-to-r from-neon-blue to-neon-cyan text-background hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl font-semibold shadow-lg shadow-neon-blue/20"
              >
                Abrir Cuenta Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SharedFooter />
    </div>
  )
}
