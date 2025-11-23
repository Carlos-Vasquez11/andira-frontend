"use client"

import { motion } from "framer-motion"
import { TrendingUp, BarChart3, ArrowUpDown } from "lucide-react"

export function PlatformFeatures() {
  return (
    <section id="platform" className="py-24 px-4 relative overflow-hidden bg-[#001F3F]/50">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-3xl mix-blend-screen animate-pulse" />
        <div
          className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-3xl mix-blend-screen animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">Nuestra Plataforma</h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos una plataforma completa para tus inversiones en el mercado venezolano, diseñada para velocidad,
            seguridad y facilidad de uso.
          </p>
        </motion.div>

        <div className="space-y-24">
          {/* Feature 1: Operaciones en Tiempo Real */}
          <motion.div
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="order-2 lg:order-1 relative group">
              {/* Added animated pulsing gradient background */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-2xl blur opacity-20"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-card/50 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent" />

                {/* Added floating animation to the center icon container */}
                <motion.div
                  className="relative z-10 p-8 rounded-full bg-background/30 backdrop-blur-md border border-white/10 shadow-xl"
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowUpDown className="w-16 h-16 text-neon-blue" />
                </motion.div>
                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center justify-center p-3 bg-neon-blue/10 rounded-xl mb-2">
                <BarChart3 className="w-8 h-8 text-neon-blue" />
              </div>
              <h4 className="text-3xl font-bold text-foreground">Operaciones en Tiempo Real</h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ejecuta órdenes de compra y venta instantáneamente con nuestra plataforma avanzada. Visualiza el mercado
                en vivo y toma decisiones con la información más actualizada disponible.
              </p>
              <ul className="space-y-3 mt-4">
                {["Ejecución instantánea", "Datos de mercado en vivo", "Interfaz intuitiva"].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-blue mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 2: Análisis de Mercado */}
          <motion.div
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center p-3 bg-neon-purple/10 rounded-xl mb-2">
                <TrendingUp className="w-8 h-8 text-neon-purple" />
              </div>
              <h4 className="text-3xl font-bold text-foreground">Análisis de Mercado</h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Accede a reportes detallados y análisis técnico de las empresas en bolsa de valores de caracas. Potencia
                tus estrategias con herramientas profesionales al alcance de tu mano.
              </p>
              <ul className="space-y-3 mt-4">
                {["Gráficos avanzados", "Reportes financieros"].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-purple mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative group">
              {/* Added animated pulsing gradient background with different phase */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-pink-500 rounded-2xl blur opacity-20"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-card/50 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent" />

                {/* Added floating animation to the center icon container with different timing */}
                <motion.div
                  className="relative z-10 p-8 rounded-full bg-background/30 backdrop-blur-md border border-white/10 shadow-xl"
                  animate={{
                    y: [10, -10, 10],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <TrendingUp className="w-16 h-16 text-neon-purple" />
                </motion.div>
                {/* Decorative Graph Line */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 80 C 20 70, 40 90, 60 40 S 80 50, 100 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-neon-purple"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
