"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Wallet } from "lucide-react"
import Image from "next/image"

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
  balanceVEF: number
  balanceUSDT: number
}

export function WithdrawModal({ isOpen, onClose, balanceVEF, balanceUSDT }: WithdrawModalProps) {
  const [currency, setCurrency] = useState<"Bolívares" | "USDT">("Bolívares")
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")

  // Mock user configured accounts
  const userBankAccount = {
    bank: "Bancaribe",
    accountNumber: "0114-9876-5432-1098-7654",
    accountHolder: "Juan Pérez",
    accountType: "Cuenta Corriente",
  }

  const userCryptoWallet = {
    platform: "CRIXTO",
    network: "TRC20 (Tron)",
    walletAddress: "TXYZabc123def456ghi789jkl012mno345pqr678",
  }

  const availableBalance = currency === "Bolívares" ? balanceVEF : balanceUSDT

  const handleAmountChange = (value: string) => {
    // Remove any non-numeric characters except decimal point
    const sanitized = value.replace(/[^0-9.]/g, "")

    // Ensure only one decimal point
    const parts = sanitized.split(".")
    const formatted = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : sanitized

    // Prevent negative numbers (already handled by regex, but extra safety)
    if (formatted.startsWith("-")) {
      return
    }

    setAmount(formatted)
    setError("")

    // Validate amount
    const numericAmount = Number.parseFloat(formatted)
    if (formatted && numericAmount <= 0) {
      setError("El monto debe ser mayor a 0")
    } else if (formatted && numericAmount > availableBalance) {
      setError("Saldo insuficiente")
    }
  }

  const handleSubmit = () => {
    const numericAmount = Number.parseFloat(amount)

    // Validation
    if (!amount || amount.trim() === "") {
      setError("Por favor ingresa un monto")
      return
    }

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("El monto debe ser mayor a 0")
      return
    }

    if (numericAmount > availableBalance) {
      setError("Saldo insuficiente")
      return
    }

    // Submit withdrawal request
    console.log("[v0] Withdrawal request:", {
      currency,
      amount: numericAmount,
      account: currency === "Bolívares" ? userBankAccount : userCryptoWallet,
    })

    // Reset and close
    setAmount("")
    setError("")
    onClose()

    // Show success message (in real app, wait for backend response)
    alert(`Solicitud de retiro de ${numericAmount} ${currency === "Bolívares" ? "Bs." : "USDT"} enviada exitosamente`)
  }

  const handleMaxAmount = () => {
    setAmount(availableBalance.toString())
    setError("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Retirar Dinero</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Currency Toggle */}
          <div className="flex justify-center">
            <div className="flex bg-muted border border-border rounded-lg p-1">
              <Button
                variant={currency === "Bolívares" ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setCurrency("Bolívares")
                  setAmount("")
                  setError("")
                }}
                className="px-6"
              >
                Bolívares
              </Button>
              <Button
                variant={currency === "USDT" ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setCurrency("USDT")
                  setAmount("")
                  setError("")
                }}
                className="px-6"
              >
                USDT
              </Button>
            </div>
          </div>

          {/* Available Balance */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wallet className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-foreground">Saldo Disponible</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                {currency === "Bolívares"
                  ? `Bs. ${availableBalance.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : `$${availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </span>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-base font-semibold">
              Monto a Retirar
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="text"
                inputMode="decimal"
                placeholder={currency === "Bolívares" ? "0.00" : "0.00"}
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className={`text-lg pr-20 ${error ? "border-red-500" : ""}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleMaxAmount}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
              >
                Máximo
              </Button>
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Destination Account Info */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">Cuenta de Destino</h3>

            {currency === "Bolívares" ? (
              <div className="space-y-4">
                {/* Bank Logo and Name */}
                <div className="flex items-center space-x-4 pb-4 border-b border-border">
                  <div className="w-16 h-16 relative">
                    <Image src="/companies/bancaribe.png" alt="Bancaribe" fill className="object-contain" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{userBankAccount.bank}</h4>
                    <p className="text-sm text-muted-foreground">{userBankAccount.accountType}</p>
                  </div>
                </div>

                {/* Account Details */}
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Número de Cuenta</p>
                    <p className="font-mono font-semibold text-foreground">{userBankAccount.accountNumber}</p>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Titular de la Cuenta</p>
                    <p className="font-semibold text-foreground">{userBankAccount.accountHolder}</p>
                  </div>
                </div>

                {/* Important Note */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-sm text-foreground">
                    <strong>Nota:</strong> El retiro se procesará a tu cuenta bancaria registrada. El tiempo de
                    procesamiento es de 24-48 horas hábiles.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Platform Name */}
                <div className="pb-4 border-b border-border">
                  <h4 className="text-lg font-semibold text-foreground">{userCryptoWallet.platform}</h4>
                  <p className="text-sm text-muted-foreground">Plataforma de intercambio de criptomonedas</p>
                </div>

                {/* Crypto Details */}
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Red</p>
                    <p className="font-semibold text-foreground">{userCryptoWallet.network}</p>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Dirección de Wallet</p>
                    <p className="font-mono text-sm font-semibold text-foreground break-all">
                      {userCryptoWallet.walletAddress}
                    </p>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="space-y-3">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-sm text-foreground">
                      <strong>¡Advertencia!</strong> Verifica que la dirección de wallet sea correcta. Las transacciones
                      en blockchain son irreversibles.
                    </p>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-sm text-foreground">
                      <strong>Nota:</strong> Los retiros de USDT se procesan en 1-2 horas. Se aplicará una comisión de
                      red según las condiciones actuales de la blockchain.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!amount || !!error || Number.parseFloat(amount) <= 0}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            size="lg"
          >
            Confirmar Retiro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
