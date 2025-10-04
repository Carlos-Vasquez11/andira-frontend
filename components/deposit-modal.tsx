"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, Check, AlertCircle } from "lucide-react"
import Image from "next/image"
import { TransferVerificationModal } from "./transfer-verification-modal"

interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [currency, setCurrency] = useState<"Bolívares" | "USDT">("Bolívares")
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [showVerificationModal, setShowVerificationModal] = useState(false)

  const userBankAccount = {
    bank: "Bancaribe",
    accountNumber: "0114-9876-5432-1098-7654",
    accountHolder: "Juan Pérez",
    accountType: "Cuenta Corriente",
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const bankInfo = {
    bank: "Bancaribe",
    accountNumber: "0114-0123-4567-8901-2345",
    accountHolder: "Andira",
    accountType: "Cuenta Corriente",
    rif: "J-12345678-9",
  }

  const cryptoInfo = {
    platform: "CRIXTO",
    network: "TRC20 (Tron)",
    walletAddress: "TXYZabc123def456ghi789jkl012mno345pqr678",
    minimumDeposit: "10 USDT",
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Ingresar Dinero</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Currency Toggle */}
            <div className="flex justify-center">
              <div className="flex bg-muted border border-border rounded-lg p-1">
                <Button
                  variant={currency === "Bolívares" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrency("Bolívares")}
                  className="px-6"
                >
                  Bolívares
                </Button>
                <Button
                  variant={currency === "USDT" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrency("USDT")}
                  className="px-6"
                >
                  USDT
                </Button>
              </div>
            </div>

            {/* Instructions Message */}
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <p className="text-sm text-foreground">
                {currency === "Bolívares"
                  ? "Para depositar bolívares, realiza una transferencia bancaria a la siguiente cuenta. Una vez completada la transferencia, los fondos se acreditarán en tu cuenta de Andira en un plazo de 24 horas hábiles."
                  : "Para depositar USDT, envía tus fondos a la siguiente dirección de wallet en la red TRC20. Las transacciones suelen confirmarse en 5-10 minutos. Asegúrate de usar la red correcta para evitar pérdida de fondos."}
              </p>
            </div>

            {/* Bank Transfer Info */}
            {currency === "Bolívares" && (
              <div className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2 flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        La transferencia debe realizarse desde tu cuenta bancaria registrada:
                      </p>
                      <div className="bg-background/50 rounded p-3 space-y-1">
                        <p className="text-sm text-foreground">
                          <span className="text-muted-foreground">Banco:</span> {userBankAccount.bank}
                        </p>
                        <p className="text-sm text-foreground">
                          <span className="text-muted-foreground">Cuenta:</span> {userBankAccount.accountNumber}
                        </p>
                        <p className="text-sm text-foreground">
                          <span className="text-muted-foreground">Titular:</span> {userBankAccount.accountHolder}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Las transferencias desde otras cuentas no serán procesadas por seguridad.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bank Logo and Name */}
                <div className="flex items-center space-x-4 pb-4 border-b border-border">
                  <div className="w-16 h-16 relative">
                    <Image src="/companies/bancaribe.png" alt="Bancaribe" fill className="object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{bankInfo.bank}</h3>
                    <p className="text-sm text-muted-foreground">{bankInfo.accountType}</p>
                  </div>
                </div>

                {/* Account Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Número de Cuenta</p>
                      <p className="font-mono font-semibold text-foreground">{bankInfo.accountNumber}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(bankInfo.accountNumber, "account")}
                    >
                      {copiedField === "account" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Titular de la Cuenta</p>
                      <p className="font-semibold text-foreground">{bankInfo.accountHolder}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">RIF</p>
                      <p className="font-mono font-semibold text-foreground">{bankInfo.rif}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(bankInfo.rif, "rif")}>
                      {copiedField === "rif" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Important Note */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-sm text-foreground">
                    <strong>Importante:</strong> Asegúrate de incluir tu número de identificación en la descripción de
                    la transferencia para que podamos acreditar los fondos correctamente.
                  </p>
                </div>
              </div>
            )}

            {/* USDT Transfer Info */}
            {currency === "USDT" && (
              <div className="space-y-4">
                {/* Platform Name */}
                <div className="pb-4 border-b border-border">
                  <h3 className="text-xl font-semibold text-foreground">{cryptoInfo.platform}</h3>
                  <p className="text-sm text-muted-foreground">Plataforma de intercambio de criptomonedas</p>
                </div>

                {/* Crypto Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Red</p>
                      <p className="font-semibold text-foreground">{cryptoInfo.network}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1">Dirección de Wallet</p>
                      <p className="font-mono text-sm font-semibold text-foreground break-all">
                        {cryptoInfo.walletAddress}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2 flex-shrink-0"
                      onClick={() => copyToClipboard(cryptoInfo.walletAddress, "wallet")}
                    >
                      {copiedField === "wallet" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Depósito Mínimo</p>
                      <p className="font-semibold text-foreground">{cryptoInfo.minimumDeposit}</p>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="space-y-3">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-sm text-foreground">
                      <strong>¡Advertencia!</strong> Asegúrate de enviar USDT únicamente a través de la red{" "}
                      <strong>TRC20</strong>. Enviar fondos por otra red resultará en la pérdida permanente de tus
                      activos.
                    </p>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <p className="text-sm text-foreground">
                      <strong>Nota:</strong> Las transacciones requieren confirmaciones en la blockchain. El tiempo de
                      acreditación puede variar según la congestión de la red.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-border pt-4">
              <button
                onClick={() => setShowVerificationModal(true)}
                className="text-sm text-accent hover:text-accent/80 underline transition-colors"
              >
                ¿Realizaste una transferencia hace más de 4 horas y no has recibido el dinero?
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <TransferVerificationModal isOpen={showVerificationModal} onClose={() => setShowVerificationModal(false)} />
    </>
  )
}
