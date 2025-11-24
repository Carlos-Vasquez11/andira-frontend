"use client"

import { Button } from "@/components/ui/button"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { ArrowRight, Coins, DollarSign } from "lucide-react"
import { CompaniesCarousel } from "@/components/companies-carousel"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link" // Added Link import
import { HowItWorks } from "@/components/how-it-works" // Import the new component
import { PlatformFeatures } from "@/components/platform-features" // Import the new component
import { CallToAction } from "@/components/call-to-action" // Import the new component

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      {/* Hero Section */}
      <motion.section
        className="py-20 px-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Invierte en las mejores empresas de <span className="text-accent">Venezuela</span>
            </motion.h2>
            <motion.p
              className="text-xl text-foreground mb-4 text-pretty max-w-2xl mx-auto"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Accede al mercado de valores venezolano desde cualquier parte del mundo.
            </motion.p>
            <motion.p
              className="text-lg text-accent font-semibold mb-8"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              El broker de inversión más intuitivo del mercado
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="/auth">
                <Button size="lg" className="bg-accent text-white hover:bg-accent/90 transition-all hover:scale-105">
                  Abrir Cuenta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Global Market Access Section */}
      <section className="py-16 px-4 overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-neon-blue/20 to-neon-cyan/20 rounded-full blur-[120px]"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-tr from-neon-purple/20 to-accent/20 rounded-full blur-[120px]"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} transition={{ duration: 0.8, ease: "easeOut" }}>
              <motion.div
                className="flex flex-wrap gap-3 mb-6"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 backdrop-blur-sm">
                  <Coins className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-300">Bolívares (Bs)</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 backdrop-blur-sm">
                  <DollarSign className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-cyan-300">USDT</span>
                </div>
              </motion.div>

              <motion.h3
                className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Accede a un mercado en crecimiento y haz rendir tus ahorros
              </motion.h3>

              <motion.div
                className="mb-6 p-4 rounded-xl bg-gradient-to-r from-accent/10 to-neon-blue/10 border border-accent/20"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-lg text-foreground font-semibold text-pretty">
                  💰 Invierte con <span className="text-emerald-400">Bolívares</span> o{" "}
                  <span className="text-cyan-400">USDT</span> y diversifica tu portafolio con flexibilidad total
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-lg text-foreground mb-4 text-pretty">
                  <strong>Multiplica tu patrimonio</strong> invirtiendo en empresas venezolanas con alto potencial de
                  crecimiento, obteniendo rendimientos superiores a los instrumentos tradicionales de ahorro.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="text-base text-foreground/80 text-pretty mb-4">
                  <strong>Aprovecha el potencial de Venezuela:</strong> un país con vastas reservas de recursos
                  naturales, posición estratégica y un mercado en recuperación que ofrece oportunidades únicas de
                  inversión.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p className="text-base text-foreground/80 text-pretty">
                  <strong>Invierte desde cualquier lugar</strong> con tecnología de última generación. Opera en tiempo
                  real, monitorea tus inversiones 24/7 y toma decisiones informadas con nuestras herramientas de
                  análisis.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.3 },
              }}
              className="relative aspect-square w-full max-w-md mx-auto"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full"
              >
                <Image
                  src="/world-to-venezuela-globe.png"
                  alt="Mundo interconectado con Venezuela destacada representando el acceso global al mercado venezolano"
                  fill
                  className="object-contain drop-shadow-2xl"
                  style={{ mixBlendMode: "lighten" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Services Section */}
      <PlatformFeatures />

      {/* Companies Section */}
      <section id="companies" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-4">Empresas Destacadas</h3>
            <p className="text-lg text-foreground">Invierte en las compañías líderes del mercado venezolano</p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <CompaniesCarousel />
        </motion.div>
      </section>

      {/* CTA Section */}
      <CallToAction />

      <SharedFooter />
    </div>
  )
}
