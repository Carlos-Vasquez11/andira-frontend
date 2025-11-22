"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { MobileFooterNav } from "@/components/mobile-footer-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const allStocks = [
  {
    symbol: "BANESCO",
    name: "Banesco Banco Universal",
    priceUSD: 12.45,
    change: 2.3,
    logo: "/banesco-logo.jpg",
  },
  {
    symbol: "POLAR",
    name: "Empresas Polar",
    priceUSD: 28.9,
    change: -1.2,
    logo: "/polar-logo.jpg",
  },
  {
    symbol: "CANTV",
    name: "CANTV",
    priceUSD: 8.75,
    change: 0.8,
    logo: "/cantv-logo.jpg",
  },
  {
    symbol: "DIGITEL",
    name: "Digitel",
    priceUSD: 15.6,
    change: 3.1,
    logo: "/digitel-logo.jpg",
  },
  {
    symbol: "MOVILNET",
    name: "Movilnet",
    priceUSD: 5.25,
    change: -0.5,
    logo: "/movilnet-logo.jpg",
  },
  {
    symbol: "MERCANTIL",
    name: "Banco Mercantil",
    priceUSD: 18.3,
    change: 1.7,
    logo: "/mercantil-logo.jpg",
  },
  {
    symbol: "PROVINCIAL",
    name: "Banco Provincial",
    priceUSD: 14.8,
    change: -2.1,
    logo: "/provincial-logo.jpg",
  },
  {
    symbol: "VENEZOLANO",
    name: "Banco Venezolano de Crédito",
    priceUSD: 9.6,
    change: 0.3,
    logo: "/venezolano-logo.jpg",
  },
  {
    symbol: "ELECTRICIDAD",
    name: "Electricidad de Caracas",
    priceUSD: 22.4,
    change: 4.2,
    logo: "/electricidad-logo.jpg",
  },
  {
    symbol: "SIDERURGICA",
    name: "Siderúrgica del Orinoco",
    priceUSD: 11.2,
    change: -3.5,
    logo: "/siderurgica-logo.jpg",
  },
  {
    symbol: "MAVESA",
    name: "Mavesa",
    priceUSD: 7.8,
    change: 1.2,
    logo: "/mavesa-logo.jpg",
  },
  {
    symbol: "CORIMON",
    name: "Corimon",
    priceUSD: 16.5,
    change: 2.8,
    logo: "/corimon-logo.jpg",
  },
]

type SortOption = "alphabetical" | "variation-high" | "variation-low" | "none"

const ITEMS_PER_PAGE = 15

export default function MercadoPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("none")
  const [currency, setCurrency] = useState<"USD" | "VEF">("USD")
  const [exchangeRate] = useState(36.5)
  const [currentPage, setCurrentPage] = useState(1)

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

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, sortBy])

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

  const allFilteredStocks = filteredAndSortedStocks()
  const totalPages = Math.ceil(allFilteredStocks.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const displayedStocks = allFilteredStocks.slice(startIndex, endIndex)

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | string)[] = []

    if (currentPage <= 3) {
      // Near the start: show 1, 2, 3, 4, 5, ..., last
      pages.push(1, 2, 3, 4, 5)
      if (totalPages > 5) {
        pages.push("ellipsis-end")
      }
    } else if (currentPage >= totalPages - 2) {
      // Near the end: show 1, ..., last-4, last-3, last-2, last-1, last
      pages.push(1)
      if (totalPages > 5) {
        pages.push("ellipsis-start")
      }
      pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      // In the middle: show 1, ..., current-1, current, current+1, ..., last
      pages.push(1, "ellipsis-start", currentPage - 1, currentPage, currentPage + 1, "ellipsis-end")
    }

    return pages
  }

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

          {totalPages > 0 && (
            <div className="mt-6 md:mt-8 flex items-center justify-center">
              <div className="flex items-center gap-1 md:gap-2 bg-card/50 backdrop-blur-sm border border-white/20 rounded-lg p-1.5 md:p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 md:h-9 md:w-9 p-0 hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => {
                    if (typeof page === "string") {
                      return (
                        <div
                          key={`${page}-${index}`}
                          className="flex items-center justify-center h-8 w-8 md:h-9 md:w-9 text-muted-foreground"
                        >
                          •••
                        </div>
                      )
                    }

                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={`h-8 w-8 md:h-9 md:w-9 p-0 font-semibold transition-all ${
                          currentPage === page
                            ? "bg-primary text-primary-foreground shadow-md scale-105"
                            : "hover:bg-primary/10 text-foreground"
                        }`}
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 md:h-9 md:w-9 p-0 hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <MobileFooterNav />
    </div>
  )
}
