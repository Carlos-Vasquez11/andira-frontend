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
    visualGradientSecondary: "from-cyan-400 to-blue-600",
  },
  {
    id: 2,
    title: "Empieza a invertir",
    description:
      "Deposita fondos en tu cuenta a través de transferencias bancarias y selecciona las empresas venezolanas con mayor potencial.",
    icon: TrendingUp,
    visualIcon: Wallet,
    visualGradient: "from-emerald-500 to-teal-400",
    visualGradientSecondary: "from-teal-400 to-emerald-600",
  },
  {
    id: 3,
    title: "Monitorea tus inversiones",
    description:
      "Sigue el rendimiento de tu portafolio en tiempo real desde cualquier dispositivo y recibe alertas sobre tus activos.",
    icon: BarChart3,
    visualIcon: PieChart,
    visualGradient: "from-purple-500 to-pink-400",
    visualGradientSecondary: "from-pink-400 to-purple-600",
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
                  <motion.div
                    className="relative group rounded-2xl overflow-hidden border border-border/50 shadow-2xl bg-card/50 aspect-video flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated Gradient Background */}
                    <motion.div
                      className={cn("absolute inset-0 bg-gradient-to-br opacity-20 blur-xl", step.visualGradient)}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Floating Icon Container with Gradient Border */}
                    <motion.div
                      className="relative z-10 flex items-center justify-center w-24 h-24 rounded-2xl bg-background/10 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.2)]"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Inner Gradient Glow */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-2xl opacity-30 blur-md",
                          "bg-gradient-to-r",
                          step.visualGradient,
                        )}
                      />
                      <step.visualIcon className="w-12 h-12 text-white relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    </motion.div>

                    {/* Decorative background elements */}
                    <div className="absolute inset-0 pointer-events-none">
                      <motion.div
                        className={cn(
                          "absolute top-[-20%] left-[-20%] w-1/2 h-1/2 rounded-full blur-[60px] opacity-40",
                          "bg-gradient-to-br",
                          step.visualGradient,
                        )}
                        animate={{
                          x: [0, 30, 0],
                          y: [0, 20, 0],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className={cn(
                          "absolute bottom-[-20%] right-[-20%] w-1/2 h-1/2 rounded-full blur-[60px] opacity-40",
                          "bg-gradient-to-tl",
                          step.visualGradientSecondary,
                        )}
                        animate={{
                          x: [0, -30, 0],
                          y: [0, -20, 0],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
