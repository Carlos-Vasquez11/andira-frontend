"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DashboardHeader } from "@/components/dashboard-header"
import { MobileFooterNav } from "@/components/mobile-footer-nav"
import { OrderHistoryCard, type Order } from "@/components/order-history-card"
import { OrderDetailsModal } from "@/components/order-details-modal"
import { DepositModal } from "@/components/deposit-modal"
import { WithdrawModal } from "@/components/withdraw-modal"
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Eye, EyeOff, PieChart } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [currency, setCurrency] = useState<"USDT" | "VEF">("VEF")
  const [exchangeRate] = useState(36.5)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [usdtBuyPrice, setUsdtBuyPrice] = useState(36.8)
  const [usdtSellPrice, setUsdtSellPrice] = useState(36.2)
  const [showBalance, setShowBalance] = useState(true)
  const [selectedStock, setSelectedStock] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)

  const [holdings, setHoldings] = useState<any[]>([])
  const [orders, setOrders] = useState<Order[]>([])

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
          balanceUSDT: 0,
          cashVEF: 0,
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
          balanceUSDT: 0,
          cashVEF: 0,
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

  const formatCurrency = (amount: number) => {
    if (currency === "USDT") {
      return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    } else {
      return `Bs. ${(amount * exchangeRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  }

  const getPrice = (priceUSD: number) => {
    return currency === "USDT" ? priceUSD : priceUSD * exchangeRate
  }

  const handleStockClick = (holding: any) => {
    setSelectedStock(holding)
    setIsModalOpen(true)
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
    setIsOrderModalOpen(true)
  }

  const totalPortfolioValue = holdings.reduce((sum, holding) => sum + holding.priceUSD * holding.shares, 0)

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

  const investmentsValueVEF = holdings.reduce((sum, holding) => sum + holding.priceVEF * holding.shares, 0)
  const totalBalanceVEF = user.cashVEF + investmentsValueVEF + user.balanceUSDT * exchangeRate
  const totalBalance = currency === "USDT" ? totalBalanceVEF / exchangeRate : totalBalanceVEF

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      {/* Content wrapper */}
      <div className="relative z-10">
        <DashboardHeader user={user} />

        <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
          {/* Currency Toggle */}
          <div className="flex justify-end mb-6">
            <div className="flex bg-card border border-border rounded-lg p-1">
              <Button
                variant={currency === "USDT" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrency("USDT")}
                className="text-sm"
              >
                USDT
              </Button>
              <Button
                variant={currency === "VEF" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrency("VEF")}
                className="text-sm"
              >
                VEF
              </Button>
            </div>
          </div>

          {/* Balance Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl">Balance Total</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowBalance(!showBalance)} className="h-8 w-8">
                  {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-foreground mb-4">
                  {showBalance ? formatCurrency(totalBalance) : "••••••"}
                </div>
                {currency === "VEF" && (
                  <p className="text-sm text-muted-foreground">Tasa BCV: Bs. {exchangeRate.toFixed(2)} por USD</p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/dashboard/balance-breakdown?test=true")}
                  className="mt-4"
                >
                  <PieChart className="mr-2 h-4 w-4" />
                  Ver Desglose
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md"
                  onClick={() => setIsDepositModalOpen(true)}
                >
                  <ArrowDownRight className="mr-2 h-4 w-4" />
                  Ingresar Dinero
                </Button>
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md"
                  onClick={() => setIsWithdrawModalOpen(true)}
                >
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Retirar Dinero
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Compra y Venta de USDT */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Compra y Venta de USDT</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button className="h-14 bg-green-700 hover:bg-green-800 text-white font-semibold shadow-lg">
                  <div className="flex flex-col items-center">
                    <span>Comprar USDT</span>
                    <span className="text-sm font-normal mt-1">Bs. {usdtBuyPrice.toFixed(2)}</span>
                  </div>
                </Button>
                <Button className="h-14 bg-red-700 hover:bg-red-800 text-white font-semibold shadow-lg">
                  <div className="flex flex-col items-center">
                    <span>Vender USDT</span>
                    <span className="text-sm font-normal mt-1">Bs. {usdtSellPrice.toFixed(2)}</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Orders History Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Historial de Órdenes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-4 px-4">
                <div className="flex space-x-4 pb-4">
                  {orders.map((order) => (
                    <OrderHistoryCard key={order.id} order={order} onClick={() => handleOrderClick(order)} />
                  ))}
                  {orders.length === 0 && <p className="text-muted-foreground text-sm">No hay órdenes recientes</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mis Inversiones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Mis Inversiones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {holdings.map((holding) => {
                  const currentValue = holding.priceUSD * holding.shares
                  const total = getPrice(currentValue)

                  return (
                    <Card
                      key={holding.symbol}
                      className="cursor-pointer hover:shadow-lg transition-all border-2 border-white/20 hover:border-primary/50 bg-card/80 backdrop-blur-sm"
                      onClick={() => handleStockClick(holding)}
                    >
                      <CardContent className="p-2 sm:p-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className="w-10 h-10 flex-shrink-0 bg-white rounded-lg flex items-center justify-center overflow-hidden border-2 border-border shadow-sm">
                              <Image
                                src={holding.logo || "/placeholder.svg"}
                                alt={`${holding.name} logo`}
                                width={40}
                                height={40}
                                className="object-contain p-1"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">
                                {holding.symbol}
                              </h3>
                              <p className="text-xs text-muted-foreground truncate">{holding.name}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 w-full sm:w-auto">
                            <Card className="bg-muted/30 border-border/50">
                              <CardContent className="p-1.5 text-center">
                                <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 truncate">
                                  Nominales
                                </p>
                                <p className="font-semibold text-foreground text-sm sm:text-base">{holding.shares}</p>
                              </CardContent>
                            </Card>

                            <Card className="bg-muted/30 border-border/50">
                              <CardContent className="p-1.5 text-center">
                                <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 truncate">Precio</p>
                                <p className="font-semibold text-foreground text-xs sm:text-base truncate">
                                  {formatCurrency(getPrice(holding.priceUSD))}
                                </p>
                              </CardContent>
                            </Card>

                            <Card className="bg-muted/30 border-border/50 col-span-2 sm:col-span-1">
                              <CardContent className="p-1.5 text-center">
                                <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 truncate">Total</p>
                                <p className="font-semibold text-foreground text-xs sm:text-base truncate">
                                  {formatCurrency(total)}
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        <div className="pt-1.5 border-t border-foreground/20 flex justify-end">
                          <div className="flex items-center space-x-1.5 sm:space-x-2">
                            {holding.change > 0 ? (
                              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-700" />
                            ) : (
                              <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-700" />
                            )}
                            <Badge
                              variant={holding.change > 0 ? "default" : "destructive"}
                              className={`text-[10px] sm:text-xs ${holding.change > 0 ? "bg-green-700 hover:bg-green-800" : "bg-red-700 hover:bg-red-800"}`}
                            >
                              {holding.change > 0 ? "+" : ""}
                              {holding.change}%
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {holdings.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Aún no tienes inversiones</p>
                  <Button onClick={() => router.push("/mercado")}>Explorar Mercado</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stock Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden border-2 border-border shadow-sm">
                <Image
                  src={selectedStock?.logo || "/placeholder.svg"}
                  alt={`${selectedStock?.name} logo`}
                  width={48}
                  height={48}
                  className="object-contain p-1"
                />
              </div>
              <div>
                <div>{selectedStock?.symbol}</div>
                <div className="text-sm font-normal text-muted-foreground">{selectedStock?.name}</div>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedStock && (
            <div className="space-y-6">
              {/* Main metrics in a grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-muted/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Valor Actual</p>
                    <p className="text-2xl font-bold text-foreground">
                      {formatCurrency(getPrice(selectedStock.priceUSD * selectedStock.shares))}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Valor Inicial</p>
                    <p className="text-2xl font-bold text-foreground">
                      {formatCurrency(getPrice(selectedStock.initialValue || 0))}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modals */}
      <OrderDetailsModal order={selectedOrder} isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        userBalance={{ balanceUSDT: user?.balanceUSDT || 0, cashVEF: user?.cashVEF || 0 }}
      />

      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        userBalance={{ balanceUSDT: user?.balanceUSDT || 0, cashVEF: user?.cashVEF || 0 }}
      />

      <MobileFooterNav />
    </div>
  )
}
