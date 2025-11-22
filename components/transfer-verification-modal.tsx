"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle } from "lucide-react"

interface TransferVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  currency: "Bolívares" | "USDT"
}

const VENEZUELAN_BANKS = [
  "Bancaribe",
  "Banco de Venezuela",
  "Banco Mercantil",
  "Banco Provincial (BBVA)",
  "Banesco",
  "Banco Occidental de Descuento (BOD)",
  "Banco Nacional de Crédito (BNC)",
  "Banco Bicentenario",
  "Banco del Tesoro",
  "Banco Agrícola de Venezuela",
  "Banco Activo",
  "Banco Plaza",
  "Banco Sofitasa",
  "Banco Caroní",
  "Banco Exterior",
  "Banco Fondo Común",
  "Banco del Sur",
  "Mi Banco",
  "Bancrecer",
  "Banco de la Fuerza Armada Nacional Bolivariana (BANFANB)",
  "Banco Industrial de Venezuela",
  "Otros",
]

export function TransferVerificationModal({ isOpen, onClose, currency }: TransferVerificationModalProps) {
  const [formData, setFormData] = useState({
    transferNumber: "",
    transferDate: "",
    amount: "",
    bankOrigin: "",
    txHash: "",
    walletAddress: "",
    additionalNotes: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to backend
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] Transfer verification submitted:", { ...formData, currency })

    setIsSubmitting(false)
    setSubmitSuccess(true)

    // Reset form and close after showing success
    setTimeout(() => {
      setSubmitSuccess(false)
      setFormData({
        transferNumber: "",
        transferDate: "",
        amount: "",
        bankOrigin: "",
        txHash: "",
        walletAddress: "",
        additionalNotes: "",
      })
      onClose()
    }, 2000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Verificar Transferencia - {currency === "Bolívares" ? "Bolívares" : "USDT"}
          </DialogTitle>
        </DialogHeader>

        {submitSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Solicitud Enviada</h3>
            <p className="text-muted-foreground">
              Hemos recibido tu solicitud de verificación. Nuestro equipo revisará la transferencia y te contactaremos
              pronto.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Info Message */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">
                  {currency === "Bolívares"
                    ? "Por favor, proporciona los detalles de tu transferencia bancaria para que podamos verificarla y acreditar los fondos a tu cuenta."
                    : "Por favor, proporciona los detalles de tu transacción de USDT para que podamos verificarla y acreditar los fondos a tu cuenta."}
                </p>
              </div>
            </div>

            {currency === "Bolívares" ? (
              // Bolivares Form Fields
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="transferNumber">Número de Transferencia *</Label>
                  <Input
                    id="transferNumber"
                    placeholder="Ingrese el número de transferencia"
                    value={formData.transferNumber}
                    onChange={(e) => handleChange("transferNumber", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transferDate">Fecha de Transferencia *</Label>
                  <Input
                    id="transferDate"
                    type="date"
                    value={formData.transferDate}
                    onChange={(e) => handleChange("transferDate", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Monto Transferido (Bolívares) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankOrigin">Banco de Origen *</Label>
                  <select
                    id="bankOrigin"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={formData.bankOrigin}
                    onChange={(e) => handleChange("bankOrigin", e.target.value)}
                    required
                  >
                    <option value="">Seleccione un banco</option>
                    {VENEZUELAN_BANKS.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Notas Adicionales (Opcional)</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Cualquier información adicional que pueda ayudarnos a verificar tu transferencia..."
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={(e) => handleChange("additionalNotes", e.target.value)}
                  />
                </div>
              </div>
            ) : (
              // USDT Form Fields
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="txHash">Hash de Transacción (TxHash) *</Label>
                  <Input
                    id="txHash"
                    placeholder="Ingrese el hash de la transacción"
                    value={formData.txHash}
                    onChange={(e) => handleChange("txHash", e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Puedes encontrar el hash en tu wallet o en el explorador de blockchain
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="walletAddress">Dirección de Wallet de Origen *</Label>
                  <Input
                    id="walletAddress"
                    placeholder="Ingrese la dirección desde donde enviaste los USDT"
                    value={formData.walletAddress}
                    onChange={(e) => handleChange("walletAddress", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transferDate">Fecha de Transacción *</Label>
                  <Input
                    id="transferDate"
                    type="date"
                    value={formData.transferDate}
                    onChange={(e) => handleChange("transferDate", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Monto Enviado (USDT) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Notas Adicionales (Opcional)</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Cualquier información adicional que pueda ayudarnos a verificar tu transacción..."
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={(e) => handleChange("additionalNotes", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
