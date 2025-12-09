"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { MobileFooterNav } from "@/components/mobile-footer-nav"
import { ArrowLeft, Wallet, TrendingUp, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockHoldings = [
  {
    symbol: "BANESCO",
    shares: 150,
    priceVEF: 454.125,
  },
  {
    symbol: "POLAR",
    shares: 75,
    priceVEF: 1054.85,
  },
  {
    symbol: "CANTV",
    shares: 200,
    priceVEF: 319.375,
  },
  {
    symbol: "DIGITEL",
    shares: 100,
    priceVEF: 569.4,
  },
]

export default function BalanceBreakdownPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [exchangeRate] = useState(36.5)

  useEffect(() => {
    const checkAuth = () => {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get("test") === "true") {
        setUser({
          id: "test",
          firstName: "Usuario",
          lastName: "Prueba",
          email: "test@kairos.com",
          avatar: "/generic-user-avatar.svg",
          balanceUSDT: 500.0,
          cashVEF: 350000.0,
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
        setUser({
          ...parsedUser,
          balanceUSDT: 500.0,
          cashVEF: 350000.0,
        })
      } catch (error) {
        console.error("Error parsing user data:", error)
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

  const investmentsValueVEF = mockHoldings.reduce((sum, holding) => sum + holding.shares * holding.priceVEF, 0)
  const usdtValueVEF = user.balanceUSDT * exchangeRate
  const totalBalanceVEF = user.cashVEF + investmentsValueVEF + usdtValueVEF

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />

      <div className="relative z-10">
        <DashboardHeader user={user} />

        <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
          <Button variant="ghost" onClick={() => router.push("/dashboard?test=true")} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Dashboard
          </Button>

          <h1 className="text-3xl font-bold text-foreground mb-8">Desglose de Balance</h1>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card className="border-2 border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Wallet className="mr-2 h-5 w-5 text-accent" />
                  Efectivo Disponible
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">
                  Bs. {user.cashVEF.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-sm text-muted-foreground">Bolívares disponibles para operar</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Inversiones en Acciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">
                  Bs.{" "}
                  {investmentsValueVEF.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-sm text-muted-foreground">Valor total de tus nominales</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-700/30">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Coins className="mr-2 h-5 w-5 text-green-700" />
                  USDT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">
                  ${user.balanceUSDT.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-sm text-muted-foreground">
                  Equivalente a Bs.{" "}
                  {usdtValueVEF.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent/50">
            <CardHeader>
              <CardTitle className="text-2xl">Balance Total Consolidado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50">
                  <span className="text-muted-foreground">Efectivo Disponible (VEF)</span>
                  <span className="font-semibold text-foreground">
                    Bs. {user.cashVEF.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50">
                  <span className="text-muted-foreground">Inversiones en Acciones (VEF)</span>
                  <span className="font-semibold text-foreground">
                    Bs.{" "}
                    {investmentsValueVEF.toLocaleString("es-VE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50">
                  <span className="text-muted-foreground">USDT</span>
                  <div className="text-right">
                    <span className="font-semibold text-foreground block">
                      $
                      {user.balanceUSDT.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Bs. {usdtValueVEF.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                <div className="border-t-2 border-accent/30 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-foreground">Total en Bolívares</span>
                    <span className="text-3xl font-bold text-foreground">
                      Bs.{" "}
                      {totalBalanceVEF.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-right">
                    Tasa BCV: Bs. {exchangeRate.toFixed(2)} por USDT
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Distribución de Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Efectivo Disponible</span>
                    <span className="text-sm font-semibold text-foreground">
                      {((user.cashVEF / totalBalanceVEF) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-3 border border-border/30">
                    <div
                      className="bg-accent h-3 rounded-full transition-all"
                      style={{ width: `${(user.cashVEF / totalBalanceVEF) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Inversiones en Acciones</span>
                    <span className="text-sm font-semibold text-foreground">
                      {((investmentsValueVEF / totalBalanceVEF) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-3 border border-border/30">
                    <div
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ width: `${(investmentsValueVEF / totalBalanceVEF) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">USDT</span>
                    <span className="text-sm font-semibold text-foreground">
                      {((usdtValueVEF / totalBalanceVEF) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-3 border border-border/30">
                    <div
                      className="bg-green-700 h-3 rounded-full transition-all"
                      style={{ width: `${(usdtValueVEF / totalBalanceVEF) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <MobileFooterNav />
    </div>
  )
}
