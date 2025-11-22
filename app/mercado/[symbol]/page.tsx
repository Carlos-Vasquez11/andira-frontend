"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { MobileFooterNav } from "@/components/mobile-footer-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, TrendingUp, TrendingDown, Construction, Loader2, CheckCircle2, XCircle } from "lucide-react"
import { config } from "@/lib/config"
import { calculateCommissionAmount, type UserType } from "@/lib/tariffs"

const allStocks = [
  {
    symbol: "BANESCO",
    name: "Banesco Banco Universal",
    priceUSD: 12.45,
    change: 2.3,
    logo: "/banesco-logo.jpg",
    industry: "Financiero",
    sector: "Banca",
    volume: 5234567,
    apertura: 12.15,
    cierreAnterior: 12.17,
    precioMinimo: 12.05,
    precioMaximo: 12.58,
    precioMinimo52: 9.8,
    precioMaximo52: 14.2,
    promedioVolumen: 4123456,
    promedioCierre: 11.95,
  },
  {
    symbol: "POLAR",
    name: "Empresas Polar",
    priceUSD: 28.9,
    change: -1.2,
    logo: "/polar-logo.jpg",
    industry: "Beverages",
    sector: "Consumer, Non-cyclical",
    volume: 3456789,
    apertura: 29.2,
    cierreAnterior: 29.25,
    precioMinimo: 28.5,
    precioMaximo: 29.4,
    precioMinimo52: 24.5,
    precioMaximo52: 32.1,
    promedioVolumen: 3234567,
    promedioCierre: 28.5,
  },
  {
    symbol: "CANTV",
    name: "CANTV",
    priceUSD: 8.75,
    change: 0.8,
    logo: "/cantv-logo.jpg",
    industry: "Telecomunicaciones",
    sector: "Servicios",
    volume: 6789012,
    apertura: 8.68,
    cierreAnterior: 8.68,
    precioMinimo: 8.62,
    precioMaximo: 8.82,
    precioMinimo52: 7.2,
    precioMaximo52: 9.8,
    promedioVolumen: 5678901,
    promedioCierre: 8.45,
  },
  {
    symbol: "DIGITEL",
    name: "Digitel",
    priceUSD: 15.6,
    change: 3.1,
    logo: "/digitel-logo.jpg",
    industry: "Telecomunicaciones",
    sector: "Servicios",
    volume: 2345678,
    apertura: 15.12,
    cierreAnterior: 15.13,
    precioMinimo: 15.05,
    precioMaximo: 15.75,
    precioMinimo52: 12.3,
    precioMaximo52: 17.2,
    promedioVolumen: 2123456,
    promedioCierre: 14.8,
  },
  {
    symbol: "MOVILNET",
    name: "Movilnet",
    priceUSD: 5.25,
    change: -0.5,
    logo: "/movilnet-logo.jpg",
    industry: "Telecomunicaciones",
    sector: "Servicios",
    volume: 1234567,
    apertura: 5.28,
    cierreAnterior: 5.28,
    precioMinimo: 5.18,
    precioMaximo: 5.32,
    precioMinimo52: 4.2,
    precioMaximo52: 6.5,
    promedioVolumen: 1123456,
    promedioCierre: 5.15,
  },
  {
    symbol: "MERCANTIL",
    name: "Banco Mercantil",
    priceUSD: 18.3,
    change: 1.7,
    logo: "/mercantil-logo.jpg",
    industry: "Financiero",
    sector: "Banca",
    volume: 4567890,
    apertura: 18.0,
    cierreAnterior: 18.0,
    precioMinimo: 17.95,
    precioMaximo: 18.45,
    precioMinimo52: 15.2,
    precioMaximo52: 20.5,
    promedioVolumen: 4234567,
    promedioCierre: 17.8,
  },
  {
    symbol: "PROVINCIAL",
    name: "Banco Provincial",
    priceUSD: 14.8,
    change: -2.1,
    logo: "/provincial-logo.jpg",
    industry: "Financiero",
    sector: "Banca",
    volume: 3789012,
    apertura: 15.12,
    cierreAnterior: 15.12,
    precioMinimo: 14.65,
    precioMaximo: 15.25,
    precioMinimo52: 12.5,
    precioMaximo52: 17.8,
    promedioVolumen: 3456789,
    promedioCierre: 14.5,
  },
  {
    symbol: "VENEZOLANO",
    name: "Banco Venezolano de Crédito",
    priceUSD: 9.6,
    change: 0.3,
    logo: "/venezolano-logo.jpg",
    industry: "Financiero",
    sector: "Banca",
    volume: 2890123,
    apertura: 9.57,
    cierreAnterior: 9.57,
    precioMinimo: 9.52,
    precioMaximo: 9.68,
    precioMinimo52: 8.1,
    precioMaximo52: 11.2,
    promedioVolumen: 2678901,
    promedioCierre: 9.4,
  },
  {
    symbol: "ELECTRICIDAD",
    name: "Electricidad de Caracas",
    priceUSD: 22.4,
    change: 4.2,
    logo: "/electricidad-logo.jpg",
    industry: "Energía",
    sector: "Servicios Públicos",
    volume: 1890234,
    apertura: 21.5,
    cierreAnterior: 21.5,
    precioMinimo: 21.45,
    precioMaximo: 22.58,
    precioMinimo52: 18.2,
    precioMaximo52: 24.5,
    promedioVolumen: 1789012,
    promedioCierre: 21.2,
  },
  {
    symbol: "SIDERURGICA",
    name: "Siderúrgica del Orinoco",
    priceUSD: 11.2,
    change: -3.5,
    logo: "/siderurgica-logo.jpg",
    industry: "Metalurgia",
    sector: "Industrial",
    volume: 2345678,
    apertura: 11.6,
    cierreAnterior: 11.61,
    precioMinimo: 11.05,
    precioMaximo: 11.75,
    precioMinimo52: 9.2,
    precioMaximo52: 13.8,
    promedioVolumen: 2234567,
    promedioCierre: 11.0,
  },
  {
    symbol: "MAVESA",
    name: "Mavesa",
    priceUSD: 7.8,
    change: 1.2,
    logo: "/mavesa-logo.jpg",
    industry: "Alimentos",
    sector: "Consumer, Non-cyclical",
    volume: 3456789,
    apertura: 7.7,
    cierreAnterior: 7.71,
    precioMinimo: 7.65,
    precioMaximo: 7.88,
    precioMinimo52: 6.5,
    precioMaximo52: 9.2,
    promedioVolumen: 3234567,
    promedioCierre: 7.6,
  },
  {
    symbol: "CORIMON",
    name: "Corimon",
    priceUSD: 16.5,
    change: 2.8,
    logo: "/corimon-logo.jpg",
    industry: "Manufactura",
    sector: "Industrial",
    volume: 2789012,
    apertura: 16.05,
    cierreAnterior: 16.05,
    precioMinimo: 16.0,
    precioMaximo: 16.68,
    precioMinimo52: 13.8,
    precioMaximo52: 18.5,
    promedioVolumen: 2567890,
    promedioCierre: 16.0,
  },
]

type TimeFilter = "1D" | "1S" | "1M" | "1A" | "5A" | "MAX"

// Generate mock chart data based on time filter
const generateChartData = (timeFilter: TimeFilter, currentPrice: number) => {
  const dataPoints: { [key in TimeFilter]: number } = {
    "1D": 24,
    "1S": 7,
    "1M": 30,
    "1A": 12,
    "5A": 60,
    MAX: 120,
  }

  const points = dataPoints[timeFilter]
  const data = []

  for (let i = 0; i < points; i++) {
    const variance = (Math.random() - 0.5) * currentPrice * 0.1
    data.push({
      time: i,
      price: currentPrice + variance,
    })
  }

  return data
}

// Generate mock order book data
const generateOrderBook = (currentPrice: number) => {
  const sellOrders = []
  const buyOrders = []

  // Generate 5 sell orders (above current price)
  for (let i = 0; i < 5; i++) {
    const price = currentPrice + (i + 1) * 0.05 * currentPrice
    const nominales = Math.floor(Math.random() * 1000) + 1
    sellOrders.push({
      nominales,
      precio: price,
    })
  }

  // Generate 5 buy orders (below current price)
  for (let i = 0; i < 5; i++) {
    const price = currentPrice - (i + 1) * 0.05 * currentPrice
    const nominales = Math.floor(Math.random() * 1000) + 1
    buyOrders.push({
      precio: price,
      nominales,
    })
  }

  return { sellOrders, buyOrders }
}

export default function StockDetailPage() {
  const router = useRouter()
  const params = useParams()
  const symbol = params.symbol as string

  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currency, setCurrency] = useState<"USD" | "VEF">("USD")
  const [exchangeRate] = useState(36.5)

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isOrderStatusModalOpen, setIsOrderStatusModalOpen] = useState(false)
  const [orderStatus, setOrderStatus] = useState<"loading" | "success" | "error">("loading")
  const [orderErrorMessage, setOrderErrorMessage] = useState("")
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy")
  const [inputMode, setInputMode] = useState<"nominales" | "money">("nominales")
  const [orderMode, setOrderMode] = useState<"limit" | "market">("market")
  const [nominalesInput, setNominalesInput] = useState("")
  const [moneyInput, setMoneyInput] = useState("")
  const [limitPrice, setLimitPrice] = useState("")
  const [availableBalance] = useState(10000) // Mock available balance in USD
  const [availableShares] = useState(150) // Mock available shares
  const [userType] = useState<UserType>("personaNatural")

  const stock = allStocks.find((s) => s.symbol === symbol)

  useEffect(() => {
    const checkAuth = () => {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get("test") === "true") {
        setUser({
          firstName: "Usuario",
          lastName: "Prueba",
          email: "test@kairos.com",
          avatar: "/professional-woman-avatar.png",
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
      <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f2744] to-[#1a3a5c] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user || !stock) {
    return null
  }

  const formatCurrency = (amount: number) => {
    if (currency === "USD") {
      return `$ ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    } else {
      return `Bs. ${(amount * exchangeRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  }

  const getPrice = (priceUSD: number) => {
    return currency === "USD" ? priceUSD : priceUSD * exchangeRate
  }

  const { sellOrders, buyOrders } = generateOrderBook(getPrice(stock.priceUSD))

  const spread =
    sellOrders.length > 0 && buyOrders.length > 0
      ? (((sellOrders[0].precio - buyOrders[0].precio) / buyOrders[0].precio) * 100).toFixed(2)
      : "0.00"

  const bestOffer = orderType === "buy" ? sellOrders[0]?.precio : buyOrders[0]?.precio

  const handleNominalesChange = (value: string) => {
    const numValue = Number.parseFloat(value)
    if (value === "" || (!isNaN(numValue) && numValue >= 0)) {
      setNominalesInput(value)
    }
  }

  const handleMoneyChange = (value: string) => {
    const numValue = Number.parseFloat(value)
    if (value === "" || (!isNaN(numValue) && numValue >= 0)) {
      setMoneyInput(value)
    }
  }

  const handleLimitPriceChange = (value: string) => {
    const numValue = Number.parseFloat(value)
    if (value === "" || (!isNaN(numValue) && numValue >= 0)) {
      setLimitPrice(value)
    }
  }

  const getAvailableNominales = () => {
    const price = bestOffer || getPrice(stock.priceUSD)
    return Math.floor(availableBalance / price)
  }

  const matchOrdersFromBook = (requestedNominals: number, orders: Array<{ precio: number; nominales: number }>) => {
    let remainingNominals = requestedNominals
    let totalCost = 0
    const matchedOrders: Array<{ precio: number; nominales: number }> = []

    for (const order of orders) {
      if (remainingNominals <= 0) break

      const nominalsToTake = Math.min(remainingNominals, order.nominales)
      totalCost += nominalsToTake * order.precio
      matchedOrders.push({ precio: order.precio, nominales: nominalsToTake })
      remainingNominals -= nominalsToTake
    }

    return { totalCost, matchedOrders, remainingNominals }
  }

  const calculateTotal = () => {
    let baseAmount = 0
    let requestedNominals = 0
    let estimatedNominals = 0

    // Determine the number of nominals requested
    if (inputMode === "nominales" && nominalesInput) {
      requestedNominals = Number.parseFloat(nominalesInput)
    } else if (inputMode === "money" && moneyInput) {
      // For money mode, calculate how many nominals can be bought/sold
      const moneyAmount = Number.parseFloat(moneyInput)
      const ordersToMatch = orderType === "buy" ? sellOrders : buyOrders

      // Calculate estimated nominals that can be bought/sold with this money
      let remainingMoney = moneyAmount
      let calculatedNominals = 0

      for (const order of ordersToMatch) {
        if (remainingMoney <= 0) break
        const nominalsFromThisOrder = Math.min(order.nominales, remainingMoney / order.precio)
        calculatedNominals += nominalsFromThisOrder
        remainingMoney -= nominalsFromThisOrder * order.precio
      }

      estimatedNominals = Math.floor(calculatedNominals)
      requestedNominals = estimatedNominals
    } else {
      return { baseAmount: 0, commission: 0, total: 0, estimatedNominals: 0 }
    }

    // Match orders from the order book
    const ordersToMatch = orderType === "buy" ? sellOrders : buyOrders
    const { totalCost } = matchOrdersFromBook(requestedNominals, ordersToMatch)

    baseAmount = totalCost

    // Calculate commission
    const commission = calculateCommissionAmount(baseAmount, userType)

    // For sell orders, subtract commission (user receives less)
    // For buy orders, add commission (user pays more)
    const total = orderType === "sell" ? baseAmount - commission : baseAmount + commission

    return { baseAmount, commission, total, estimatedNominals }
  }

  const isOrderValid = () => {
    const { total } = calculateTotal()

    if (orderType === "buy") {
      return total > 0 && total <= availableBalance
    } else {
      if (inputMode === "nominales" && nominalesInput) {
        return Number.parseFloat(nominalesInput) > 0 && Number.parseFloat(nominalesInput) <= availableShares
      } else if (inputMode === "money" && moneyInput) {
        const price =
          orderMode === "limit" && limitPrice ? Number.parseFloat(limitPrice) : bestOffer || getPrice(stock.priceUSD)
        const requiredShares = Number.parseFloat(moneyInput) / price
        return requiredShares > 0 && requiredShares <= availableShares
      }
    }
    return false
  }

  const handleUseAll = () => {
    if (orderType === "buy") {
      if (inputMode === "nominales") {
        const price =
          orderMode === "limit" && limitPrice ? Number.parseFloat(limitPrice) : bestOffer || getPrice(stock.priceUSD)
        const maxNominales = Math.floor(availableBalance / price)
        setNominalesInput(maxNominales.toString())
      } else {
        setMoneyInput(availableBalance.toString())
      }
    } else {
      if (inputMode === "nominales") {
        setNominalesInput(availableShares.toString())
      } else {
        const price =
          orderMode === "limit" && limitPrice ? Number.parseFloat(limitPrice) : bestOffer || getPrice(stock.priceUSD)
        setMoneyInput((availableShares * price).toString())
      }
    }
  }

  const openOrderModal = (type: "buy" | "sell") => {
    setOrderType(type)
    setIsOrderModalOpen(true)
    setNominalesInput("")
    setMoneyInput("")
    setLimitPrice("")
    setInputMode("nominales")
    setOrderMode("market")
  }

  const handleOrderSubmit = async () => {
    setIsOrderModalOpen(false)
    setOrderStatus("loading")
    setIsOrderStatusModalOpen(true)

    try {
      const { baseAmount } = calculateTotal()

      const orderData = {
        symbol: stock.symbol,
        type: orderType,
        orderMode: orderMode,
        inputMode: inputMode,
        nominales: inputMode === "nominales" ? Number.parseFloat(nominalesInput) : undefined,
        amount: baseAmount,
        limitPrice: orderMode === "limit" && limitPrice ? Number.parseFloat(limitPrice) : undefined,
        currency: currency,
      }

      console.log("[v0] Submitting order:", orderData)

      const response = await fetch(`${config.api.baseUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("kairos_token")}`,
        },
        body: JSON.stringify(orderData),
      })

      console.log("[v0] Order response status:", response.status)

      if (response.status === 201) {
        setOrderStatus("success")
      } else {
        const errorData = await response.json()
        setOrderErrorMessage(errorData.message || "Error al procesar la orden")
        setOrderStatus("error")
      }
    } catch (error) {
      console.error("[v0] Order submission error:", error)
      setOrderErrorMessage("Error de conexión. Por favor, intenta nuevamente.")
      setOrderStatus("error")
    }
  }

  const handleCloseStatusModal = () => {
    setIsOrderStatusModalOpen(false)
    setNominalesInput("")
    setMoneyInput("")
    setLimitPrice("")
    setInputMode("nominales")
    setOrderMode("market")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f2744] to-[#1a3a5c] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAl')] opacity-30 pointer-events-none" />

      <div className="relative z-10">
        <DashboardHeader user={user} />

        <div className="container mx-auto px-2 sm:px-4 py-4 md:py-8 pb-20 md:pb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6">
            <Button
              variant="outline"
              onClick={() => router.push("/mercado")}
              className="border-white/20 text-xs sm:text-sm h-9"
            >
              <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Volver al Mercado
            </Button>

            <div className="flex bg-card border border-border rounded-lg p-1">
              <Button
                variant={currency === "USD" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrency("USD")}
                className="text-xs sm:text-sm h-8"
              >
                USD
              </Button>
              <Button
                variant={currency === "VEF" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrency("VEF")}
                className="text-xs sm:text-sm h-8"
              >
                VEF
              </Button>
            </div>
          </div>

          <Card className="mb-4 md:mb-6 bg-card/80 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 min-w-0 flex-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-muted/50 border-2 border-white/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm sm:text-base md:text-lg font-bold text-foreground">
                      {stock.symbol.slice(0, 3)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground truncate">
                      {stock.symbol}
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground truncate">{stock.name}</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1 md:mb-2">
                    {formatCurrency(getPrice(stock.priceUSD))}
                  </p>
                  <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                    {stock.change > 0 ? (
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-700" />
                    ) : (
                      <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-red-700" />
                    )}
                    <Badge
                      variant={stock.change > 0 ? "default" : "destructive"}
                      className={`text-xs sm:text-sm md:text-base px-2 py-0.5 sm:px-3 sm:py-1 ${stock.change > 0 ? "bg-green-700 hover:bg-green-800" : "bg-red-700 hover:bg-red-800"}`}
                    >
                      {stock.change > 0 ? "+" : ""}
                      {stock.change}%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Left side: Chart and Data */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 sm:p-8 md:p-12">
                  <div className="flex flex-col items-center justify-center space-y-3 md:space-y-4 text-center">
                    <Construction className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-muted-foreground" />
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-1 md:mb-2">
                      Gráfico en Desarrollo
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-md px-2">
                      Estamos trabajando en traerte gráficos interactivos y análisis técnico avanzado. Pronto estará
                      disponible.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-white/20">
                <CardHeader className="p-3 sm:p-4 md:p-6">
                  <CardTitle className="text-base sm:text-lg md:text-xl text-foreground">Datos Generales</CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <Tabs defaultValue="general" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                      <TabsTrigger value="general" className="text-foreground text-xs sm:text-sm">
                        Datos Generales
                      </TabsTrigger>
                      <TabsTrigger value="hechos" className="text-foreground text-xs sm:text-sm">
                        Hechos Relevantes
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
                      {/* Categoría */}
                      <div>
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-2 md:mb-3">
                          Categoría
                        </h3>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          <Badge
                            variant="secondary"
                            className="bg-muted/50 text-foreground border border-white/20 text-xs sm:text-sm"
                          >
                            Industria: {stock.industry}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="bg-muted/50 text-foreground border border-white/20 text-xs sm:text-sm"
                          >
                            Sector: {stock.sector}
                          </Badge>
                        </div>
                      </div>

                      {/* Últimos Datos */}
                      <div>
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-2 md:mb-3">
                          Últimos datos
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between py-2 border-b border-white/10">
                              <span className="text-xs sm:text-sm text-muted-foreground">Fecha</span>
                              <span className="text-xs sm:text-sm text-foreground font-medium">
                                {new Date().toLocaleDateString("es-VE")} {new Date().toLocaleTimeString("es-VE")}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-white/10">
                              <span className="text-xs sm:text-sm text-muted-foreground">Precio mínimo</span>
                              <span className="text-xs sm:text-sm text-foreground font-medium">
                                {formatCurrency(getPrice(stock.precioMinimo))}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-white/10">
                              <span className="text-xs sm:text-sm text-muted-foreground">Precio máximo</span>
                              <span className="text-xs sm:text-sm text-foreground font-medium">
                                {formatCurrency(getPrice(stock.precioMaximo))}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between py-2 border-b border-white/10">
                              <span className="text-xs sm:text-sm text-muted-foreground">Volumen</span>
                              <span className="text-xs sm:text-sm text-foreground font-medium">
                                {stock.volume.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-white/10">
                              <span className="text-xs sm:text-sm text-muted-foreground">Apertura</span>
                              <span className="text-xs sm:text-sm text-foreground font-medium">
                                {formatCurrency(getPrice(stock.apertura))}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-white/10">
                              <span className="text-xs sm:text-sm text-muted-foreground">Cierre anterior</span>
                              <span className="text-xs sm:text-sm text-foreground font-medium">
                                {formatCurrency(getPrice(stock.cierreAnterior))}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 52 Semanas */}
                      <div>
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-2 md:mb-3">
                          52 semanas
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between py-2 border-b border-white/10">
                              <span className="text-xs sm:text-sm text-muted-foreground">Precio mínimo</span>
                              <span className="text-xs sm:text-sm text-foreground font-medium">
                                {formatCurrency(getPrice(stock.precioMinimo52))}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-white/10">
                              <span className="text-xs sm:text-sm text-muted-foreground">Precio máximo</span>
                              <span className="text-xs sm:text-sm text-foreground font-medium">
                                {formatCurrency(getPrice(stock.precioMaximo52))}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between py-2 border-b border-white/10">
                              <span className="text-xs sm:text-sm text-muted-foreground">Promedio volumen</span>
                              <span className="text-xs sm:text-sm text-foreground font-medium">
                                {stock.promedioVolumen.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-white/10">
                              <span className="text-xs sm:text-sm text-muted-foreground">Promedio cierre</span>
                              <span className="text-xs sm:text-sm text-foreground font-medium">
                                {formatCurrency(getPrice(stock.promedioCierre))}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="hechos" className="mt-4 sm:mt-6">
                      <div className="text-center py-8 sm:py-12">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          No hay hechos relevantes recientes para mostrar.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right side: Trading Panel */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
                <Card className="bg-card/80 backdrop-blur-sm border-white/20">
                  <CardHeader className="p-3 sm:p-4 md:p-6">
                    <CardTitle className="text-base sm:text-lg md:text-xl text-foreground">
                      Ofertas de mercado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-4 p-3 sm:p-4 md:p-6">
                    {/* Order Book */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                      {/* Sell Orders */}
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 text-center">Vendés a</h4>
                        <div className="space-y-1">
                          <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground mb-1">
                            <span>Nom.</span>
                            <span className="text-right">Precio</span>
                          </div>
                          {sellOrders.slice(0, 5).map((order, idx) => (
                            <div key={idx} className="grid grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm">
                              <span className="text-foreground">{order.nominales}</span>
                              <span className="text-red-700 text-right font-medium truncate">
                                {formatCurrency(order.precio)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Buy Orders */}
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 text-center">Comprás a</h4>
                        <div className="space-y-1">
                          <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground mb-1">
                            <span>Precio</span>
                            <span className="text-right">Nom.</span>
                          </div>
                          {buyOrders.slice(0, 5).map((order, idx) => (
                            <div key={idx} className="grid grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm">
                              <span className="text-green-700 font-medium truncate">
                                {formatCurrency(order.precio)}
                              </span>
                              <span className="text-foreground text-right">{order.nominales}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Spread */}
                    <div className="flex justify-between items-center py-2 border-t border-white/20">
                      <span className="text-xs sm:text-sm text-muted-foreground">Spread</span>
                      <span className="text-xs sm:text-sm font-semibold text-foreground">{spread}%</span>
                    </div>

                    {/* Buy/Sell Inputs */}
                    <div className="space-y-2 sm:space-y-3 pt-2">
                      <Button
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold h-10 sm:h-11 md:h-12 text-sm sm:text-base"
                        onClick={() => openOrderModal("buy")}
                      >
                        Comprar
                      </Button>

                      <Button
                        className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold h-10 sm:h-11 md:h-12 text-sm sm:text-base"
                        onClick={() => openOrderModal("sell")}
                      >
                        Vender
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="bg-card border-white/20 max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground text-lg sm:text-xl md:text-2xl">
              {orderType === "buy" ? "Comprar" : "Vender"} {stock.symbol}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2 sm:space-y-3 py-2 sm:py-4">
            {/* Input Mode Toggle */}
            <div>
              <Label className="text-foreground mb-1.5 sm:mb-2 block text-xs sm:text-sm">Modo de entrada</Label>
              <div className="flex bg-muted/30 border border-white/20 rounded-lg p-0.5 sm:p-1">
                <Button
                  variant={inputMode === "nominales" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setInputMode("nominales")}
                  className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
                >
                  Nominales
                </Button>
                <Button
                  variant={inputMode === "money" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setInputMode("money")}
                  className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
                >
                  Dinero
                </Button>
              </div>
            </div>

            {/* Order Type */}
            <div>
              <Label className="text-foreground mb-1.5 sm:mb-2 block text-xs sm:text-sm">Tipo de orden</Label>
              <div className="flex bg-muted/30 border border-white/20 rounded-lg p-0.5 sm:p-1">
                <Button
                  variant={orderMode === "limit" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setOrderMode("limit")}
                  className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
                >
                  Límite
                </Button>
                <Button
                  variant={orderMode === "market" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setOrderMode("market")}
                  className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
                >
                  Mercado
                </Button>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                <Label className="text-foreground text-xs sm:text-sm">
                  {inputMode === "nominales" ? "Cantidad de nominales" : "Cantidad de dinero"}
                </Label>
                <Button
                  variant="link"
                  size="sm"
                  onClick={handleUseAll}
                  className="text-primary h-auto p-0 text-[10px] sm:text-xs"
                >
                  Usar todo
                </Button>
              </div>
              <Input
                type="number"
                min="0"
                step={inputMode === "nominales" ? "1" : "0.01"}
                placeholder={inputMode === "nominales" ? "0" : "0,00"}
                value={inputMode === "nominales" ? nominalesInput : moneyInput}
                onChange={(e) =>
                  inputMode === "nominales" ? handleNominalesChange(e.target.value) : handleMoneyChange(e.target.value)
                }
                className="bg-background/50 border-white/20 text-foreground h-9 sm:h-10 text-sm sm:text-base"
              />
            </div>

            {/* Limit Price (only for limit orders) */}
            {orderMode === "limit" && (
              <div>
                <Label className="text-foreground mb-1.5 sm:mb-2 block text-xs sm:text-sm">Precio límite</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0,00"
                  value={limitPrice}
                  onChange={(e) => handleLimitPriceChange(e.target.value)}
                  className="bg-background/50 border-white/20 text-foreground h-9 sm:h-10 text-sm sm:text-base"
                />
              </div>
            )}

            {/* Available Balance/Shares */}
            <Card className="bg-muted/30 border-white/20">
              <CardContent className="p-2 sm:p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-muted-foreground">Disponible</span>
                  <span className="text-foreground font-semibold text-sm sm:text-base md:text-lg">
                    {orderType === "buy" ? formatCurrency(availableBalance) : `${availableShares} nominales`}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Best Offer */}
            <Card className="bg-muted/30 border-white/20">
              <CardContent className="p-2 sm:p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-foreground">Mejor oferta</span>
                  <span className="font-semibold text-xs sm:text-sm text-white">
                    {formatCurrency(bestOffer || getPrice(stock.priceUSD))}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Total Calculation Card */}
            <Card
              className={`border ${!isOrderValid() && calculateTotal().total > 0 ? "bg-red-900/20 border-red-700/50" : "bg-primary/10 border-primary/30"}`}
            >
              <CardContent className="p-2 sm:p-3">
                <div className="space-y-2">
                  {/* Estimated nominals for both buy and sell orders with money mode */}
                  {inputMode === "money" && calculateTotal().estimatedNominals > 0 && (
                    <>
                      <div className="flex justify-between items-center pb-3 mb-2 border-b border-white/20">
                        <span className="text-xs sm:text-sm text-foreground font-medium">
                          {orderType === "buy"
                            ? "Cantidad Estimada de Nominales a Comprar"
                            : "Cantidad Estimada de Nominales a Vender"}
                        </span>
                        <span className="font-semibold text-sm sm:text-base text-foreground">
                          {calculateTotal().estimatedNominals}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Price breakdown */}
                  <div className="space-y-1 pb-2 border-b border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] sm:text-xs text-muted-foreground/80">Subtotal</span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground/80">
                        {formatCurrency(calculateTotal().baseAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] sm:text-xs text-muted-foreground/80">
                        Comisión (0.5%) {orderType === "sell" ? "-" : "+"}
                      </span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground/80">
                        {formatCurrency(calculateTotal().commission)}
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Total estimado {orderType === "sell" ? "(recibirás)" : "(pagarás)"}
                    </span>
                    <span className="text-foreground font-bold text-sm sm:text-base md:text-lg">
                      {formatCurrency(calculateTotal().total)}
                    </span>
                  </div>

                  {!isOrderValid() && calculateTotal().total > 0 && (
                    <p className="text-[10px] sm:text-xs text-red-400">
                      *{" "}
                      {orderType === "buy" ? "El monto excede tu saldo disponible" : "No tienes suficientes nominales"}
                    </p>
                  )}
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    * Este es un valor aproximado. El precio final puede variar según las condiciones del mercado.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button - Always visible at bottom */}
            <Button
              className={`w-full h-10 sm:h-11 font-semibold text-sm sm:text-base text-white ${
                orderType === "buy" ? "bg-green-700 hover:bg-green-800" : "bg-red-700 hover:bg-red-800"
              }`}
              disabled={!isOrderValid()}
              onClick={handleOrderSubmit}
            >
              Confirmar {orderType === "buy" ? "Compra" : "Venta"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Status Modal */}
      <Dialog open={isOrderStatusModalOpen} onOpenChange={setIsOrderStatusModalOpen}>
        <DialogContent className="bg-card border-white/20 max-w-[95vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground text-lg sm:text-xl md:text-2xl text-center">
              {orderStatus === "loading" && "Procesando Orden"}
              {orderStatus === "success" && "Orden Exitosa"}
              {orderStatus === "error" && "Error en la Orden"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-6 sm:py-8">
            {orderStatus === "loading" && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-16 w-16 sm:h-20 sm:w-20 text-primary animate-spin" />
                <p className="text-sm sm:text-base text-muted-foreground text-center">Estamos procesando tu orden...</p>
                <p className="text-xs sm:text-sm text-muted-foreground text-center">Por favor espera un momento</p>
              </div>
            )}

            {orderStatus === "success" && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="rounded-full bg-green-700/20 p-4">
                  <CheckCircle2 className="h-16 w-16 sm:h-20 sm:w-20 text-green-700" />
                </div>
                <p className="text-base sm:text-lg font-semibold text-foreground text-center">
                  ¡Orden creada exitosamente!
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-sm">
                  Tu orden de {orderType === "buy" ? "compra" : "venta"} de {stock.symbol} ha sido procesada
                  correctamente.
                </p>
                <Button
                  onClick={handleCloseStatusModal}
                  className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white"
                >
                  Aceptar
                </Button>
              </div>
            )}

            {orderStatus === "error" && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="rounded-full bg-red-700/20 p-4">
                  <XCircle className="h-16 w-16 sm:h-20 sm:w-20 text-red-700" />
                </div>
                <p className="text-base sm:text-lg font-semibold text-foreground text-center">
                  Error al procesar la orden
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-sm">
                  {orderErrorMessage || "Hubo un problema al procesar tu orden. Por favor, intenta nuevamente."}
                </p>
                <Button onClick={handleCloseStatusModal} className="w-full mt-4 bg-red-700 hover:bg-red-800 text-white">
                  Cerrar
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Footer Navigation */}
      <MobileFooterNav />
    </div>
  )
}
