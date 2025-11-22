"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface OrderStatusModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  status: "loading" | "success" | "error"
  orderType: "buy" | "sell"
  errorMessage?: string
  successDetails?: {
    symbol: string
    quantity: number
    price: number
    total: number
  }
}

export function OrderStatusModal({
  open,
  onOpenChange,
  status,
  orderType,
  errorMessage,
  successDetails,
}: OrderStatusModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-white/20 max-w-[95vw] sm:max-w-md">
        <div className="flex flex-col items-center justify-center py-6 px-4 space-y-4">
          {/* Loading State */}
          {status === "loading" && (
            <>
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <h3 className="text-xl font-semibold text-foreground text-center">
                Procesando {orderType === "buy" ? "compra" : "venta"}...
              </h3>
              <p className="text-sm text-muted-foreground text-center">Por favor espera mientras procesamos tu orden</p>
            </>
          )}

          {/* Success State */}
          {status === "success" && (
            <>
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-semibold text-foreground text-center">
                {orderType === "buy" ? "Compra" : "Venta"} exitosa
              </h3>
              {successDetails && (
                <div className="w-full space-y-2 bg-muted/30 border border-white/20 rounded-lg p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Símbolo:</span>
                    <span className="text-foreground font-semibold">{successDetails.symbol}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cantidad:</span>
                    <span className="text-foreground font-semibold">{successDetails.quantity} nominales</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Precio:</span>
                    <span className="text-foreground font-semibold">${successDetails.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-white/10">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="text-foreground font-bold text-base">${successDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              )}
              <p className="text-sm text-muted-foreground text-center">Tu orden se ha procesado correctamente</p>
              <Button onClick={() => onOpenChange(false)} className="w-full bg-green-700 hover:bg-green-800 text-white">
                Aceptar
              </Button>
            </>
          )}

          {/* Error State */}
          {status === "error" && (
            <>
              <XCircle className="h-16 w-16 text-red-500" />
              <h3 className="text-xl font-semibold text-foreground text-center">Error al procesar la orden</h3>
              <div className="w-full bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <p className="text-sm text-red-400 text-center">
                  {errorMessage || "Ha ocurrido un error inesperado. Por favor intenta de nuevo."}
                </p>
              </div>
              <Button onClick={() => onOpenChange(false)} className="w-full bg-red-700 hover:bg-red-800 text-white">
                Cerrar
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
