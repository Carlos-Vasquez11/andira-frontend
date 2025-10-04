"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, RefreshCw, DollarSign } from "lucide-react"

export type OrderType = "Transferencia" | "Venta" | "Compra" | "Compra USDT" | "Venta USDT"
export type OrderStatus = "Ejecutada" | "Cancelada" | "Pendiente" | "Pendiente de Liquidación"

export interface Order {
  id: string
  type: OrderType
  status: OrderStatus
  amount: number
  date: string
  stockName?: string
  currency: "Bolívares" | "USDT"
  orderType?: "Mercado" | "Límite"
  quantity?: number
  averagePrice?: number
  market: string
  emissionDate: string
  direction?: "Depósito" | "Retiro"
}

interface OrderHistoryCardProps {
  order: Order
  onClick: () => void
}

export function OrderHistoryCard({ order, onClick }: OrderHistoryCardProps) {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "Ejecutada":
        return "bg-green-700 hover:bg-green-800 text-white"
      case "Cancelada":
        return "bg-red-700 hover:bg-red-800 text-white"
      case "Pendiente":
        return "bg-yellow-600 hover:bg-yellow-700 text-white"
      case "Pendiente de Liquidación":
        return "bg-orange-600 hover:bg-orange-700 text-white"
      default:
        return "bg-muted"
    }
  }

  const getTypeIcon = (type: OrderType) => {
    switch (type) {
      case "Compra":
      case "Compra USDT":
        return <ArrowDownRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      case "Venta":
      case "Venta USDT":
        return <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      case "Transferencia":
        return <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      default:
        return <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
    }
  }

  const getTypeColor = (type: OrderType) => {
    if (type.includes("Compra")) return "text-green-700"
    if (type.includes("Venta")) return "text-red-700"
    return "text-accent"
  }

  return (
    <Card
      className="flex-shrink-0 w-72 sm:w-80 cursor-pointer hover:shadow-lg transition-all border-2 border-white/20 hover:border-accent/50 bg-card/80 backdrop-blur-sm"
      onClick={onClick}
    >
      <CardContent className="p-2 sm:p-3 min-h-[140px] sm:h-[160px] flex flex-col">
        <div className="flex items-start justify-between mb-1.5 sm:mb-2">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <div className={`${getTypeColor(order.type)}`}>{getTypeIcon(order.type)}</div>
            <div>
              <h3 className="font-semibold text-foreground text-xs sm:text-sm">{order.type}</h3>
              {order.type === "Transferencia" && order.direction && (
                <p className="text-[10px] sm:text-xs text-accent font-medium">{order.direction}</p>
              )}
              <p className="text-[10px] sm:text-xs text-muted-foreground h-3 sm:h-4">{order.stockName || "\u00A0"}</p>
            </div>
          </div>
          <Badge className={`${getStatusColor(order.status)} text-[10px] sm:text-xs px-1.5 sm:px-2`}>
            {order.status}
          </Badge>
        </div>

        <div className="space-y-1 sm:space-y-1.5 mt-auto">
          <div className="flex justify-between items-center">
            <span className="text-[10px] sm:text-xs text-muted-foreground">Monto:</span>
            <span className="font-semibold text-foreground text-xs sm:text-sm">
              {order.currency === "USDT" ? "$" : "Bs. "}
              {order.amount.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[10px] sm:text-xs text-muted-foreground">Fecha:</span>
            <span className="text-[10px] sm:text-xs text-foreground">{order.date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
