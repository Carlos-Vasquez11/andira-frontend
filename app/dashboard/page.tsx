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

const mockHoldings = [
  {
    symbol: "BANESCO",
    name: "Banesco Banco Universal",
    shares: 150,
    priceUSD: 12.45,
    priceVEF: 12.45 * 36.5,
    change: 2.3,
    logo: "/banesco-logo.jpg",
    averagePurchasePrice: 11.8,
    initialValue: 11.8 * 150,
    averageHoldingDays: 45,
    totalReturn: 8.2,
  },
  {
    symbol: "POLAR",
    name: "Empresas Polar",
    shares: 75,
    priceUSD: 28.9,
    priceVEF: 28.9 * 36.5,
    change: -1.2,
    logo: "/polar-logo.jpg",
    averagePurchasePrice: 30.2,
    initialValue: 30.2 * 75,
    averageHoldingDays: 62,
    totalReturn: -4.3,
  },
  {
    symbol: "CANTV",
    name: "CANTV",
    shares: 200,
    priceUSD: 8.75,
    priceVEF: 8.75 * 36.5,
    change: 0.8,
    logo: "/cantv-logo.jpg",
    averagePurchasePrice: 8.5,
    initialValue: 8.5 * 200,
    averageHoldingDays: 30,
    totalReturn: 2.9,
  },
  {
    symbol: "DIGITEL",
    name: "Digitel",
    shares: 100,
    priceUSD: 15.6,
    priceVEF: 15.6 * 36.5,
    change: 3.1,
    logo: "/digitel-logo.jpg",
    averagePurchasePrice: 14.9,
    initialValue: 14.9 * 100,
    averageHoldingDays: 21,
    totalReturn: 4.7,
  },
]

const mockOrders: Order[] = [
  {
    id: "ORD-2024-001234",
    type: "Compra",
    status: "Ejecutada",
    amount: 1867.5,
    date: "15/01/2025",
    stockName: "BANESCO",
    currency: "Bolívares",
    orderType: "Mercado",
    quantity: 150,
    averagePrice: 12.45,
    market: "BVC",
    emissionDate: "15/01/2025",
  },
  {
    id: "ORD-2024-001235",
    type: "Compra USDT",
    status: "Ejecutada",
    amount: 500.0,
    date: "18/01/2025",
    currency: "USDT",
    market: "Banco Central de Venezuela",
    emissionDate: "18/01/2025",
  },
  {
    id: "ORD-2024-001236",
    type: "Venta",
    status: "Pendiente de Liquidación",
    amount: 2167.5,
    date: "20/01/2025",
    stockName: "POLAR",
    currency: "Bolívares",
    orderType: "Límite",
    quantity: 75,
    averagePrice: 28.9,
    market: "BVC",
    emissionDate: "20/01/2025",
  },
  {
    id: "ORD-2024-001237",
    type: "Transferencia",
    status: "Ejecutada",
    amount: 1000.0,
    date: "22/01/2025",
    currency: "Bolívares",
    market: "Banco Central de Venezuela",
    emissionDate: "22/01/2025",
    direction: "Depósito",
  },
  {
    id: "ORD-2024-001238",
    type: "Compra",
    status: "Pendiente",
    amount: 1750.0,
    date: "25/01/2025",
    stockName: "CANTV",
    currency: "Bolívares",
    orderType: "Límite",
    quantity: 200,
    averagePrice: 8.75,
    market: "BVC",
    emissionDate: "25/01/2025",
  },
  {
    id: "ORD-2024-001239",
    type: "Venta USDT",
    status: "Ejecutada",
    amount: 300.0,
    date: "28/01/2025",
    currency: "USDT",
    market: "Banco Central de Venezuela",
    emissionDate: "28/01/2025",
  },
  {
    id: "ORD-2024-001240",
    type: "Venta",
    status: "Cancelada",
    amount: 1560.0,
    date: "30/01/2025",
    stockName: "DIGITEL",
    currency: "Bolívares",
    orderType: "Mercado",
    quantity: 100,
    averagePrice: 15.6,
    market: "BVC",
    emissionDate: "30/01/2025",
  },
  {
    id: "ORD-2024-001241",
    type: "Transferencia",
    status: "Ejecutada",
    amount: 2500.0,
    date: "02/02/2025",
    currency: "Bolívares",
    market: "Banco Central de Venezuela",
    emissionDate: "02/02/2025",
    direction: "Retiro",
  },
]

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

  useEffect(() => {
    const checkAuth = () => {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get("test") === "true") {
        setUser({
          id: "test",
          firstName: "Usuario",
          lastName: "Prueba",
          email: "test@kairos.com",
          avatar: "/professional-woman-avatar.png",
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

  const totalPortfolioValue = mockHoldings.reduce((sum, holding) => sum + holding.priceUSD * holding.shares, 0)

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

  const investmentsValueVEF = mockHoldings.reduce((sum, holding) => sum + holding.priceVEF * holding.shares, 0)
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
                  {mockOrders.map((order) => (
                    <OrderHistoryCard key={order.id} order={order} onClick={() => handleOrderClick(order)} />
                  ))}
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
                {mockHoldings.map((holding) => {
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

              {mockHoldings.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Aún no tienes inversiones</p>
                  <Button>Explorar Mercado</Button>
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
                      {formatCurrency(getPrice(selectedStock.initialValue))}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">Representación de mis Tenencias</p>
                    <p className="text-2xl font-bold text-foreground">
                      {((selectedStock.priceUSD * selectedStock.shares * 100) / totalBalance).toFixed(1)}%
                    </p>
                  </div>
                  <div className="w-full bg-muted/50 border border-border/30 rounded-full h-3">
                    <div
                      className="bg-foreground h-3 rounded-full transition-all"
                      style={{
                        width: `${Math.min((selectedStock.priceUSD * selectedStock.shares * 100) / totalBalance, 100)}%`,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">Nominales</p>
                    <p className="text-xl font-bold text-foreground">{selectedStock.shares}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">Precio Promedio de Compra</p>
                    <p className="text-xl font-bold text-foreground">
                      {formatCurrency(getPrice(selectedStock.averagePurchasePrice))}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">Precio Actual</p>
                    <p className="text-xl font-bold text-foreground">
                      {formatCurrency(getPrice(selectedStock.priceUSD))}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Performance metrics */}
              <div className="grid grid-cols-2 gap-4">
                <Card
                  className={
                    selectedStock.totalReturn >= 0
                      ? "bg-green-700/10 border-green-700/30"
                      : "bg-red-700/10 border-red-700/30"
                  }
                >
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Rendimiento Total</p>
                    <div className="flex items-center justify-center space-x-2">
                      {selectedStock.totalReturn >= 0 ? (
                        <TrendingUp className="h-5 w-5 text-green-700" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-700" />
                      )}
                      <p
                        className={`text-2xl font-bold ${selectedStock.totalReturn >= 0 ? "text-green-700" : "text-red-700"}`}
                      >
                        {selectedStock.totalReturn >= 0 ? "+" : ""}
                        {selectedStock.totalReturn}%
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Días Promedio de Tenencia</p>
                    <p className="text-2xl font-bold text-foreground">{selectedStock.averageHoldingDays} días</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Order Details Modal */}
      <OrderDetailsModal order={selectedOrder} isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      {/* Deposit Modal */}
      <DepositModal isOpen={isDepositModalOpen} onClose={() => setIsDepositModalOpen(false)} />

      {/* Withdraw Modal */}
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        balanceVEF={user?.cashVEF || 0}
        balanceUSDT={user?.balanceUSDT || 0}
      />
      {/* Mobile Footer Navigation */}
      <MobileFooterNav />
    </div>
  )
}
