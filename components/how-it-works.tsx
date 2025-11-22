"use client"

import { motion } from "framer-motion"
import { User, TrendingUp, BarChart3, ShieldCheck, Wallet, PieChart } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: 1,
    title: "Abre tu cuenta",
    description:
      "Regístrate en minutos con tu documento de identidad y completa la verificación. Nuestro proceso es 100% digital y seguro.",
    icon: User,
    visualIcon: ShieldCheck,
    visualGradient: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Empieza a invertir",
    description:
      "Deposita fondos en tu cuenta a través de transferencias bancarias y selecciona las empresas venezolanas con mayor potencial.",
    icon: TrendingUp,
    visualIcon: Wallet,
    visualGradient: "from-emerald-500 to-teal-400",
  },
  {
    id: 3,
    title: "Monitorea tus inversiones",
    description:
      "Sigue el rendimiento de tu portafolio en tiempo real desde cualquier dispositivo y recibe alertas sobre tus activos.",
    icon: BarChart3,
    visualIcon: PieChart,
    visualGradient: "from-purple-500 to-pink-400",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 overflow-hidden relative">
      <div className="container mx-auto">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Cómo empezar a invertir</h3>
          <p className="text-lg text-muted-foreground">Un proceso simple y rápido para hacer crecer tu patrimonio</p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Central Line for Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-accent/50 to-transparent hidden md:block -translate-x-1/2" />

          {/* Left Line for Mobile */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-accent/50 to-transparent md:hidden" />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className={cn(
                  "relative flex flex-col md:flex-row gap-8 md:gap-16 items-center",
                  index % 2 === 1 ? "md:flex-row-reverse" : "",
                )}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-background border-4 border-accent z-10 -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  <step.icon className="w-4 h-4 md:w-6 md:h-6 text-accent" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-20 md:pl-0 md:pr-12 flex flex-col justify-center text-left md:text-right">
                  <div className={cn("flex flex-col gap-4", index % 2 === 1 ? "md:text-left md:pl-12 md:pr-0" : "")}>
                    <span className="text-6xl font-bold text-accent/20 leading-none">{step.id}</span>
                    <h4 className="text-2xl md:text-3xl font-bold text-foreground">{step.title}</h4>
                    <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Image Card */}
                <div className={cn("w-full md:w-1/2 pl-20 md:pl-12", index % 2 === 1 ? "md:pl-0 md:pr-12" : "")}>
                  <div className="relative group rounded-2xl overflow-hidden border border-border/50 shadow-2xl bg-card/50 aspect-video flex items-center justify-center">
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-500",
                        step.visualGradient,
                      )}
                    />

                    <div className="relative z-10 flex items-center justify-center w-24 h-24 rounded-2xl bg-background/10 backdrop-blur-sm border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <step.visualIcon className="w-12 h-12 text-foreground/80" />
                    </div>

                    {/* Decorative background elements */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
