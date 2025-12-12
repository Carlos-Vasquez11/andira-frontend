"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { MobileFooterNav } from "@/components/mobile-footer-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, TrendingDown, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

type SortOption = "alphabetical" | "variation-high" | "variation-low" | "none"

export default function MercadoPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("none")
  const [currency, setCurrency] = useState<"USD" | "VEF">("USD")
  const [exchangeRate] = useState(36.5)
  const [allStocks, setAllStocks] = useState<any[]>([])

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

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("https://api.example.com/stocks") // Replace with actual API endpoint
        const data = await response.json()
        setAllStocks(data)
      } catch (error) {
        console.error("Error fetching stocks:", error)
      }
    }

    fetchStocks()
  }, [])

  const filteredAndSortedStocks = () => {
    let stocks = [...allStocks]

    // Filter by search query
    if (searchQuery) {
      stocks = stocks.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort stocks
    switch (sortBy) {
      case "alphabetical":
        stocks.sort((a, b) => a.symbol.localeCompare(b.symbol))
        break
      case "variation-high":
        stocks.sort((a, b) => b.change - a.change)
        break
      case "variation-low":
        stocks.sort((a, b) => a.change - b.change)
        break
      default:
        break
    }

    return stocks
  }

  const formatCurrency = (amount: number) => {
    if (currency === "USD") {
      return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    } else {
      return `Bs. ${(amount * exchangeRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  }

  const getPrice = (priceUSD: number) => {
    return currency === "USD" ? priceUSD : priceUSD * exchangeRate
  }

  const handleStockClick = (stock: any) => {
    router.push(`/mercado/${stock.symbol}`)
  }

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

  const displayedStocks = filteredAndSortedStocks()

  return (
    <div className="min-h-screen bg-background relative">
      <div className="relative z-10">
        <DashboardHeader user={user} />

        <div className="container mx-auto px-4 py-4 md:py-8 pb-20 md:pb-8">
          {/* Currency Toggle */}
          <div className="flex justify-end mb-4 md:mb-6">
            <div className="flex bg-card border border-border rounded-lg p-1">
              <Button
                variant={currency === "USD" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrency("USD")}
                className="text-xs md:text-sm h-7 md:h-9"
              >
                USD
              </Button>
              <Button
                variant={currency === "VEF" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrency("VEF")}
                className="text-xs md:text-sm h-7 md:h-9"
              >
                VEF
              </Button>
            </div>
          </div>

          <Card className="mb-4 md:mb-6 bg-card/80 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 md:p-6">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre o símbolo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 md:pl-10 h-9 md:h-10 text-sm bg-background/50 border-white/20 text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Sort Buttons */}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={sortBy === "alphabetical" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy(sortBy === "alphabetical" ? "none" : "alphabetical")}
                    className="border-white/20 h-9 text-xs md:text-sm px-2 md:px-3"
                  >
                    <ArrowUpDown className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                    A-Z
                  </Button>
                  <Button
                    variant={sortBy === "variation-high" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy(sortBy === "variation-high" ? "none" : "variation-high")}
                    className="border-white/20 h-9 text-xs md:text-sm px-2 md:px-3"
                  >
                    <ArrowUp className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Mayor Variación</span>
                    <span className="sm:hidden">Mayor</span>
                  </Button>
                  <Button
                    variant={sortBy === "variation-low" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy(sortBy === "variation-low" ? "none" : "variation-low")}
                    className="border-white/20 h-9 text-xs md:text-sm px-2 md:px-3"
                  >
                    <ArrowDown className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Menor Variación</span>
                    <span className="sm:hidden">Menor</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2 md:space-y-3">
            {displayedStocks.map((stock) => (
              <Card
                key={stock.symbol}
                className="cursor-pointer hover:shadow-lg transition-all border-2 border-white/20 hover:border-primary/50 bg-card/80 backdrop-blur-sm"
                onClick={() => handleStockClick(stock)}
              >
                <CardContent className="p-2 md:p-3">
                  <div className="flex items-center justify-between gap-2">
                    {/* Left side: Logo, Symbol, and Name */}
                    <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-muted/50 border-2 border-white/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-xs md:text-sm font-bold text-foreground">{stock.symbol.slice(0, 3)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground text-sm md:text-base truncate">{stock.symbol}</h3>
                        <p className="text-xs text-muted-foreground truncate">{stock.name}</p>
                      </div>
                    </div>

                    {/* Right side: Price and Variation */}
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-base md:text-lg font-bold text-foreground whitespace-nowrap">
                          {formatCurrency(getPrice(stock.priceUSD))}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        {stock.change > 0 ? (
                          <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-green-700" />
                        ) : (
                          <TrendingDown className="h-3 w-3 md:h-4 md:w-4 text-red-700" />
                        )}
                        <Badge
                          variant={stock.change > 0 ? "default" : "destructive"}
                          className={`text-xs px-1.5 py-0.5 md:px-2 md:py-1 ${stock.change > 0 ? "bg-green-700 hover:bg-green-800" : "bg-red-700 hover:bg-red-800"}`}
                        >
                          {stock.change > 0 ? "+" : ""}
                          {stock.change}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {displayedStocks.length === 0 && (
              <Card className="bg-card/80 backdrop-blur-sm border-white/20">
                <CardContent className="p-8 md:p-12 text-center">
                  <p className="text-muted-foreground text-sm md:text-lg">
                    No se encontraron acciones que coincidan con tu búsqueda
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <MobileFooterNav />
    </div>
  )
}
