"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { MobileFooterNav } from "@/components/mobile-footer-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, MapPin, FileText, CreditCard, Wallet, Edit2, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function PerfilPage() {
  const [user] = useState({
    firstName: "María",
    lastName: "González",
    email: "maria.gonzalez@email.com",
    avatar: "/generic-user-avatar.svg",
    country: "Venezuela",
    documentType: "V",
    documentNumber: "12345678",
    bankAccount: "0102-1234-56-7890123456",
    cryptoAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    cryptoNetwork: "TRC20 (Tron)",
  })

  const [isEditingBank, setIsEditingBank] = useState(false)
  const [isEditingCrypto, setIsEditingCrypto] = useState(false)
  const [bankAccount, setBankAccount] = useState(user.bankAccount)
  const [cryptoAddress, setCryptoAddress] = useState(user.cryptoAddress)
  const [cryptoNetwork, setCryptoNetwork] = useState(user.cryptoNetwork)

  const handleSaveBank = () => {
    // TODO: Save to backend
    setIsEditingBank(false)
  }

  const handleSaveCrypto = () => {
    // TODO: Save to backend
    setIsEditingCrypto(false)
  }

  const handleCancelBank = () => {
    setBankAccount(user.bankAccount)
    setIsEditingBank(false)
  }

  const handleCancelCrypto = () => {
    setCryptoAddress(user.cryptoAddress)
    setCryptoNetwork(user.cryptoNetwork)
    setIsEditingCrypto(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-4 py-6 pb-24 md:pb-8 max-w-4xl">
        {/* Profile Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-accent">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback className="bg-accent text-white text-2xl">
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-white/70 mb-2">{user.email}</p>
              <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                Cuenta Verificada
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Personal Information */}
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg sm:text-xl text-white">Información Personal</CardTitle>
              </div>
              <CardDescription className="text-white/60 text-sm">Datos básicos de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80 text-sm">Nombre</Label>
                  <div className="px-3 py-2 bg-white/5 rounded-md border border-white/10">
                    <p className="text-white">{user.firstName}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80 text-sm">Apellido</Label>
                  <div className="px-3 py-2 bg-white/5 rounded-md border border-white/10">
                    <p className="text-white">{user.lastName}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  País
                </Label>
                <div className="px-3 py-2 bg-white/5 rounded-md border border-white/10">
                  <p className="text-white">{user.country}</p>
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div className="space-y-2">
                <Label className="text-white/80 text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Documento de Identidad
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="px-3 py-2 bg-white/5 rounded-md border border-white/10">
                    <p className="text-white font-medium">{user.documentType}</p>
                  </div>
                  <div className="col-span-2 px-3 py-2 bg-white/5 rounded-md border border-white/10">
                    <p className="text-white">{user.documentNumber}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Account */}
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-accent" />
                  <CardTitle className="text-lg sm:text-xl text-white">Cuenta Bancaria</CardTitle>
                </div>
                {!isEditingBank && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingBank(true)}
                    className="text-accent hover:text-accent/80 hover:bg-accent/10 h-8 px-2 sm:px-3"
                  >
                    <Edit2 className="h-4 w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Editar</span>
                  </Button>
                )}
              </div>
              <CardDescription className="text-white/60 text-sm">Cuenta para retiros y depósitos</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditingBank ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankAccount" className="text-white/80 text-sm">
                      Número de Cuenta
                    </Label>
                    <Input
                      id="bankAccount"
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                      placeholder="0102-1234-56-7890123456"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveBank} className="flex-1 bg-accent hover:bg-accent/90 text-white">
                      <Check className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                    <Button
                      onClick={handleCancelBank}
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/5 bg-transparent"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="px-3 py-3 bg-white/5 rounded-md border border-white/10">
                  <p className="text-white font-mono text-sm sm:text-base">{bankAccount}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Crypto Address */}
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-accent" />
                  <CardTitle className="text-lg sm:text-xl text-white">Dirección Crypto</CardTitle>
                </div>
                {!isEditingCrypto && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingCrypto(true)}
                    className="text-accent hover:text-accent/80 hover:bg-accent/10 h-8 px-2 sm:px-3"
                  >
                    <Edit2 className="h-4 w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Editar</span>
                  </Button>
                )}
              </div>
              <CardDescription className="text-white/60 text-sm">
                Dirección USDT para transacciones crypto
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditingCrypto ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cryptoNetwork" className="text-white/80 text-sm">
                      Red Blockchain
                    </Label>
                    <Input
                      id="cryptoNetwork"
                      value={cryptoNetwork}
                      onChange={(e) => setCryptoNetwork(e.target.value)}
                      placeholder="TRC20 (Tron)"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    />
                    <p className="text-xs text-white/50">Ejemplo: TRC20 (Tron), ERC20 (Ethereum), BEP20 (BSC)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cryptoAddress" className="text-white/80 text-sm">
                      Dirección de Wallet USDT
                    </Label>
                    <Input
                      id="cryptoAddress"
                      value={cryptoAddress}
                      onChange={(e) => setCryptoAddress(e.target.value)}
                      placeholder="Ingresa tu dirección de wallet"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 font-mono text-xs sm:text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveCrypto} className="flex-1 bg-accent hover:bg-accent/90 text-white">
                      <Check className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                    <Button
                      onClick={handleCancelCrypto}
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/5 bg-transparent"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-white/60 text-xs">Red</Label>
                    <div className="px-3 py-2 bg-white/5 rounded-md border border-white/10">
                      <p className="text-white text-sm">{cryptoNetwork}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-white/60 text-xs">Dirección</Label>
                    <div className="px-3 py-3 bg-white/5 rounded-md border border-white/10 overflow-hidden">
                      <p className="text-white font-mono text-xs sm:text-sm break-all">{cryptoAddress}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <MobileFooterNav />
    </div>
  )
}
