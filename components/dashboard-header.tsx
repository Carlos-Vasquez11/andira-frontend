"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { config } from "@/lib/config"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, User, Home, TrendingUp, Bell } from "lucide-react"
import Image from "next/image"

interface DashboardHeaderProps {
  user: {
    firstName: string
    lastName: string
    email: string
    avatar: string
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("andira_user")
    localStorage.removeItem("andira_token")
    sessionStorage.clear()
    router.push("/")
  }

  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <header className="border-b border-white/20 bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-3">
            <Image src="/andira-logo.png" alt="Andira" width={48} height={48} className="w-12 h-12" />
            <span className="font-bold text-xl text-white">{config.app.name}</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-white hover:text-accent transition-colors font-medium flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Inicio
            </Link>
            <Link
              href="/mercado"
              className="text-white/70 hover:text-accent transition-colors font-medium flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Mercado
            </Link>
            <Link
              href="/alertas"
              className="text-white/70 hover:text-accent transition-colors font-medium flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Alertas
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={fullName} />
                    <AvatarFallback className="bg-accent text-white">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#002B54] border-white/20" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-white">{fullName}</p>
                    <p className="w-[200px] truncate text-sm text-white/70">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-white/20" />
                <Link href="/perfil">
                  <DropdownMenuItem className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-white/10 focus:bg-white/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
