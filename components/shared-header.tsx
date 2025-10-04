"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { config } from "@/lib/config"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { useState } from "react"

export function SharedHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-white/20 bg-background backdrop-blur">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/andira-logo.png" alt="Andira" width={48} height={48} className="w-12 h-12" />
          <h1 className="text-2xl font-bold text-white">{config.app.name}</h1>
        </Link>
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white/80 hover:text-accent transition-colors">
              Inicio
            </Link>
            <Link href="/nosotros" className="text-white/80 hover:text-accent transition-colors">
              Nosotros
            </Link>
            <Link href="/tarifas" className="text-white/80 hover:text-accent transition-colors">
              Tarifas
            </Link>
            <Link href="/universidad" className="text-white/80 hover:text-accent transition-colors">
              Universidad
            </Link>
            <Link href="/centro-de-ayuda" className="text-white/80 hover:text-accent transition-colors">
              Ayuda
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <Link href="/auth" className="hidden md:block">
            <Button className="bg-accent text-white hover:bg-accent/90">Comenzar</Button>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l border-white/20 w-[280px] px-6">
              <nav className="flex flex-col space-y-6 mt-8">
                <Link
                  href="/"
                  className="text-white/80 hover:text-accent transition-colors text-lg"
                  onClick={() => setOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  href="/nosotros"
                  className="text-white/80 hover:text-accent transition-colors text-lg"
                  onClick={() => setOpen(false)}
                >
                  Nosotros
                </Link>
                <Link
                  href="/tarifas"
                  className="text-white/80 hover:text-accent transition-colors text-lg"
                  onClick={() => setOpen(false)}
                >
                  Tarifas
                </Link>
                <Link
                  href="/universidad"
                  className="text-white/80 hover:text-accent transition-colors text-lg"
                  onClick={() => setOpen(false)}
                >
                  Universidad
                </Link>
                <Link
                  href="/centro-de-ayuda"
                  className="text-white/80 hover:text-accent transition-colors text-lg"
                  onClick={() => setOpen(false)}
                >
                  Ayuda
                </Link>
                <Link href="/auth" onClick={() => setOpen(false)}>
                  <Button className="bg-accent text-white hover:bg-accent/90 w-full">Comenzar</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
