"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { Building2, User, ArrowLeft, DollarSign } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface ExchangeRate {
  rate: number
  date: string
}

export default function TarifasPage() {
  const [usdRate, setUsdRate] = useState<ExchangeRate | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUSDRate = async () => {
      try {
        const response = await fetch("https://bcv-api.rafnixg.dev/v1/exchange/usd")
        const data = await response.json()
        setUsdRate({
          rate: data.rate,
          date: data.date,
        })
      } catch (error) {
        console.error("Error fetching USD rate:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUSDRate()
  }, [])

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

      {/* USD Exchange Rate */}
      <section className="py-8 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-border/40 bg-card/50">
              <CardHeader>
                <DollarSign className="h-8 w-8 text-accent mb-2 mx-auto" />
                <CardTitle>Tasa de Cambio Oficial USD</CardTitle>
                <CardDescription>Banco Central de Venezuela</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-foreground/60">Cargando tasa oficial...</p>
                ) : usdRate ? (
                  <div className="text-center">
                    <p className="text-3xl font-bold text-accent mb-2">{usdRate.rate.toLocaleString("es-VE")} VEF</p>
                    <p className="text-sm text-foreground/60">
                      Actualizado: {new Date(usdRate.date).toLocaleDateString("es-VE")}
                    </p>
                  </div>
                ) : (
                  <p className="text-foreground/60">No se pudo cargar la tasa oficial</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Tarifas</h2>
            <p className="text-lg text-foreground/80 mb-6">
              Comisiones competitivas para personas naturales y jurídicas
            </p>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-8">
              <p className="text-sm text-foreground/80">
                <strong>Importante:</strong> Los precios se muestran en USD para referencia, pero todos los pagos se
                realizan en VEF (Bolívares) según la tasa oficial del Banco Central de Venezuela.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border/40 bg-card/50">
              <CardHeader>
                <User className="h-8 w-8 text-accent mb-2" />
                <CardTitle>Personas Naturales</CardTitle>
                <CardDescription>Tarifas para inversionistas individuales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground/80">Comisión por compra/venta</span>
                  <span className="font-semibold text-foreground">0.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/80">Custodia mensual</span>
                  <span className="font-semibold text-foreground">$5 USD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/80">Apertura de cuenta</span>
                  <span className="font-semibold text-accent">Gratis</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/80">Monto mínimo</span>
                  <span className="font-semibold text-accent">$0 USD</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/50">
              <CardHeader>
                <Building2 className="h-8 w-8 text-accent mb-2" />
                <CardTitle>Personas Jurídicas</CardTitle>
                <CardDescription>Tarifas para empresas e instituciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground/80">Comisión por compra/venta</span>
                  <span className="font-semibold text-foreground">0.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/80">Custodia mensual</span>
                  <span className="font-semibold text-foreground">$25 USD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/80">Apertura de cuenta</span>
                  <span className="font-semibold text-foreground">$50 USD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/80">Monto mínimo</span>
                  <span className="font-semibold text-accent">$0 USD</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="bg-card/50 border border-border/40 rounded-lg p-6 max-w-2xl mx-auto">
              <h4 className="font-semibold text-foreground mb-4">Información Adicional</h4>
              <ul className="text-sm text-foreground/80 space-y-2 text-left">
                <li>• Todas las transacciones se procesan en VEF según la tasa oficial del BCV</li>
                <li>• No hay comisiones ocultas ni cargos adicionales</li>
                <li>• Tarifas sujetas a cambios previo aviso</li>
                <li>• Consulta términos y condiciones completos</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Abrir Cuenta Ahora
            </Button>
          </div>
        </div>
      </section>

      <SharedFooter />
    </div>
  )
}
