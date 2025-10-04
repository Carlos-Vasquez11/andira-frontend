"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Order } from "./order-history-card"

interface OrderDetailsModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!order) return null

  const getStatusColor = (status: string) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-between">
            <span>Detalles de la Orden</span>
            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Order ID and Type */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">ID de Orden</p>
                  <p className="font-mono font-semibold text-foreground">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tipo de Operación</p>
                  <p className="font-semibold text-foreground">{order.type}</p>
                  {order.type === "Transferencia" && order.direction && (
                    <p className="text-sm text-accent font-medium mt-1">{order.direction}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Fecha de Emisión</p>
                <p className="font-semibold text-foreground">{order.emissionDate}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Fecha de Ejecución</p>
                <p className="font-semibold text-foreground">{order.date}</p>
              </CardContent>
            </Card>
          </div>

          {/* Amount and Currency */}
          <Card className="bg-accent/10 border-accent/30">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Monto Total</p>
                  <p className="text-2xl font-bold text-foreground">
                    {order.currency === "USDT" ? "$" : "Bs. "}
                    {order.amount.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Moneda</p>
                  <p className="text-xl font-semibold text-foreground">{order.currency}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stock Details (if applicable) */}
          {order.stockName && (
            <>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Acción</p>
                  <p className="font-semibold text-foreground text-lg">{order.stockName}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-3 gap-4">
                {order.orderType && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-2">Tipo de Orden</p>
                      <p className="font-semibold text-foreground">{order.orderType}</p>
                    </CardContent>
                  </Card>
                )}

                {order.quantity && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-2">Cantidad</p>
                      <p className="font-semibold text-foreground">{order.quantity}</p>
                    </CardContent>
                  </Card>
                )}

                {order.averagePrice && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-2">Precio Promedio</p>
                      <p className="font-semibold text-foreground">
                        {order.currency === "USDT" ? "$" : "Bs. "}
                        {order.averagePrice.toLocaleString("es-VE", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}

          {/* Market */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Mercado</p>
              <p className="font-semibold text-foreground">{order.market}</p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
