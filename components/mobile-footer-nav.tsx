"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, TrendingUp, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileFooterNav() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/dashboard",
      label: "Inicio",
      icon: Home,
      isActive: pathname === "/dashboard" || pathname === "/dashboard/balance-breakdown",
    },
    {
      href: "/mercado",
      label: "Mercado",
      icon: TrendingUp,
      isActive: pathname.startsWith("/mercado"),
    },
    {
      href: "/alertas",
      label: "Alertas",
      icon: Bell,
      isActive: pathname === "/alertas",
    },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-white/20">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                item.isActive ? "text-accent" : "text-white/70 hover:text-white",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
