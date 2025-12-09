"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { MobileFooterNav } from "@/components/mobile-footer-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Construction } from "lucide-react"
import Image from "next/image"

export default function AlertasPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get("test") === "true") {
        setUser({
          firstName: "Usuario",
          lastName: "Prueba",
          email: "test@kairos.com",
          avatar: "/generic-user-avatar.svg",
        })
        setIsLoading(false)
        return
      }

      const token = localStorage.getItem("kairos_token")
      const userData = localStorage.getItem("kairos_user")

      if (!token || !userData) {
        router.push("/auth")
        return
      }

      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        router.push("/auth")
        return
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="relative z-10">
        <DashboardHeader user={user} />

        <div className="container mx-auto px-4 py-16 pb-20 md:pb-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-border/40 bg-card/50">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <Image
                    src="/funny-construction-worker-with-hard-hat-saying-wor.jpg"
                    alt="Página en construcción"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
                <CardTitle className="text-3xl font-bold text-foreground">Alertas en Desarrollo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  <Construction className="h-8 w-8 text-accent mr-2" />
                  <span className="text-lg font-semibold text-foreground">Trabajo en Progreso</span>
                </div>
                <p className="text-foreground/80 text-lg mb-6">
                  Estamos trabajando en el sistema de alertas para mantenerte informado sobre los movimientos de tus
                  inversiones en tiempo real.
                </p>
                <p className="text-sm text-muted-foreground">
                  Pronto podrás configurar alertas personalizadas para precios, volúmenes y noticias del mercado.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <MobileFooterNav />
    </div>
  )
}
