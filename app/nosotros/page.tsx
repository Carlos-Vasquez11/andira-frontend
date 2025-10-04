"use client"

import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { motion } from "framer-motion"
import { Target, Eye, Shield, Users, Lightbulb, GraduationCap } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const valores = [
  {
    icon: Shield,
    title: "Transparencia",
    description: "Operamos con total claridad en cada transacción y proceso",
  },
  {
    icon: Users,
    title: "Accesibilidad",
    description: "Inversión al alcance de todos los venezolanos",
  },
  {
    icon: Lightbulb,
    title: "Innovación",
    description: "Tecnología de vanguardia para simplificar tus inversiones",
  },
  {
    icon: Shield,
    title: "Confianza",
    description: "Seguridad y respaldo en cada operación",
  },
  {
    icon: GraduationCap,
    title: "Educación",
    description: "Formamos inversionistas informados y responsables",
  },
]

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section - Misión */}
        <motion.section className="text-center mb-24" initial="initial" animate="animate" variants={fadeInUp}>
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-accent/10 rounded-full border border-accent/30"
            variants={fadeInUp}
          >
            <Target className="w-5 h-5 text-accent" />
            <span className="text-accent font-semibold">Nuestra Misión</span>
          </motion.div>

          <motion.h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance" variants={fadeInUp}>
            Democratizando la Inversión en Venezuela
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed text-pretty"
            variants={fadeInUp}
          >
            Proveer de herramientas de inversión a los venezolanos. Democratizar el acceso a la bolsa de valores,
            promoviendo el desarrollo del país.
          </motion.p>
        </motion.section>

        <motion.section className="mb-24" initial="initial" animate="animate" variants={staggerContainer}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Misión */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-3xl p-8 md:p-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-accent" />
                <h2 className="text-3xl md:text-4xl font-bold text-white">Misión</h2>
              </div>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed text-pretty">
                Proveer de herramientas de inversión a los venezolanos. Democratizar el acceso a la bolsa de valores,
                promoviendo el desarrollo del país.
              </p>
            </motion.div>

            {/* Visión */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-3xl p-8 md:p-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-8 h-8 text-accent" />
                <h2 className="text-3xl md:text-4xl font-bold text-white">Visión</h2>
              </div>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed text-pretty">
                Proveer acceso a todos los mercados y distintas opciones de inversión en toda latino américa.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Valores Section */}
        <motion.section
          className="mb-24"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Nuestros Valores</h2>
            <p className="text-xl text-white/70">Los principios que guían cada decisión</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map((valor, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="bg-[#002B5C]/50 border border-accent/20 rounded-2xl p-8 hover:border-accent/50 transition-all"
              >
                <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <valor.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{valor.title}</h3>
                <p className="text-white/70 leading-relaxed">{valor.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Nuestro Equipo</h2>
            <p className="text-xl text-white/70">Liderando la revolución financiera en Venezuela</p>
          </div>

          <div className="flex justify-center">
            <motion.div
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-[#002B5C]/80 to-[#001F3F]/80 border border-accent/30 rounded-3xl p-8 max-w-md w-full"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mb-6 text-5xl font-bold text-white">
                  CV
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Carlos Vásquez</h3>
                <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent/40 mb-4">
                  <span className="text-accent font-semibold">CEO & Fundador</span>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <SharedFooter />
    </div>
  )
}
