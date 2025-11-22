"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket, ShieldCheck, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { config } from "@/lib/config"
import Link from "next/link"
import { useEffect, useState } from "react"

export function CallToAction() {
  const [returnValue, setReturnValue] = useState(12.4)

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random value between 8 and 22
      // Using a simple random distribution as normal distribution in JS requires more complex math functions (Box-Muller transform)
      // but this will provide the requested fluctuation
      const randomValue = 8 + Math.random() * (22 - 8)
      setReturnValue(Number(randomValue.toFixed(1)))
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-neon-blue/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/80 via-secondary/50 to-card/80 border border-white/10 backdrop-blur-xl p-8 md:p-16 shadow-2xl"
        >
          {/* Decorative glowing orb */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-purple/20 blur-[80px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-neon-cyan/20 blur-[80px] rounded-full" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-left space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight text-balance">
                  Comienza a invertir <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">
                    en tu futuro hoy
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mb-8 text-pretty">
                  Únete a miles de inversionistas que ya están haciendo crecer su patrimonio con {config.app.name}. Sin
                  comisiones ocultas y con la plataforma más avanzada del mercado.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Updated button to link to /auth */}
                  <Link href="/auth">
                    <Button
                      size="lg"
                      className="bg-neon-blue text-white hover:bg-neon-blue/90 h-14 px-8 text-lg rounded-full shadow-[0_0_20px_rgba(96,32,250,0.3)] hover:shadow-[0_0_30px_rgba(96,32,250,0.5)] transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                    >
                      Crear Cuenta Gratis
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-bold text-white">+50K</span>
                  <span className="text-xs text-muted-foreground">Usuarios Activos</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-bold text-white">$2M+</span>
                  <span className="text-xs text-muted-foreground">Transacciones</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-bold text-white">24/7</span>
                  <span className="text-xs text-muted-foreground">Soporte</span>
                </div>
              </div>
            </div>

            {/* Abstract Visual */}
            <div className="relative h-full min-h-[300px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/5 to-neon-purple/5 rounded-2xl backdrop-blur-sm border border-white/5" />

              <motion.div
                className="relative z-10 grid gap-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="bg-card/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl w-64 ml-auto transform translate-x-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Rendimiento Total</div>
                      <div className="text-sm font-bold text-white">+{returnValue}%</div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[70%] bg-green-500 rounded-full" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                  className="bg-card/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl w-64 mr-auto transform -translate-x-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-neon-blue/20 rounded-lg">
                      <ShieldCheck className="h-5 w-5 text-neon-blue" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Seguridad</div>
                      <div className="text-sm font-bold text-white">100% Encriptado</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-1.5 w-1.5 rounded-full bg-neon-blue" />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                  className="bg-card/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl w-64 ml-12"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-neon-purple/20 rounded-lg">
                      <Rocket className="h-5 w-5 text-neon-purple" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Velocidad</div>
                      <div className="text-sm font-bold text-white">Ejecución &lt; 1 segundo</div>
                    </div>
                  </div>
                  <div className="h-8 w-full bg-gradient-to-r from-neon-purple/20 to-transparent rounded-lg relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-neon-purple/40 blur-sm animate-pulse" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
