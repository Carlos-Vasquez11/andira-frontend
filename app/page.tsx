"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { config } from "@/lib/config"
import { TrendingUp, BarChart3, ArrowRight, User } from "lucide-react"
import { CompaniesCarousel } from "@/components/companies-carousel"
import { motion } from "framer-motion"
import Image from "next/image"

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
              <Button size="lg" className="bg-accent text-white hover:bg-accent/90 transition-all hover:scale-105">
                Abrir Cuenta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Global Market Access Section */}
      <section className="py-16 px-4 overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} transition={{ duration: 0.8, ease: "easeOut" }}>
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
                  src="/glowing-blue-digital-globe-with-network-connection.jpg"
                  alt="Mundo interconectado representando el mercado global"
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-4">¿Cómo funciona?</h3>
            <p className="text-lg text-foreground">Comenzar a invertir es más fácil de lo que piensas</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="text-center" variants={fadeInUp} transition={{ duration: 0.5 }}>
              <motion.div
                className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <User className="h-8 w-8 text-white" />
              </motion.div>
              <h4 className="text-xl font-semibold text-foreground mb-2">1. Abre tu cuenta</h4>
              <p className="text-foreground">
                Regístrate en minutos con tu documento de identidad y completa la verificación
              </p>
            </motion.div>

            <motion.div className="text-center" variants={fadeInUp} transition={{ duration: 0.5 }}>
              <motion.div
                className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <TrendingUp className="h-8 w-8 text-white" />
              </motion.div>
              <h4 className="text-xl font-semibold text-foreground mb-2">2. Empieza a invertir</h4>
              <p className="text-foreground">Deposita fondos y selecciona las empresas en las que quieres invertir</p>
            </motion.div>

            <motion.div className="text-center" variants={fadeInUp} transition={{ duration: 0.5 }}>
              <motion.div
                className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <BarChart3 className="h-8 w-8 text-white" />
              </motion.div>
              <h4 className="text-xl font-semibold text-foreground mb-2">3. Monitorea tus inversiones</h4>
              <p className="text-foreground">
                Sigue el rendimiento de tu portafolio en tiempo real desde cualquier dispositivo
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-4">Nuestra Plataforma</h3>
            <p className="text-lg text-foreground">
              Ofrecemos una plataforma completa para tus inversiones en el mercado venezolano
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={scaleIn} transition={{ duration: 0.5 }} whileHover={{ y: -5 }}>
              <Card className="border-border bg-card h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-accent mb-2" />
                  <CardTitle>Trading en Tiempo Real</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">
                    Ejecuta órdenes de compra y venta instantáneamente con nuestra plataforma avanzada
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn} transition={{ duration: 0.5 }} whileHover={{ y: -5 }}>
              <Card className="border-border bg-card h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-accent mb-2" />
                  <CardTitle>Análisis de Mercado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">
                    Accede a reportes detallados y análisis técnico de las empresas en bolsa de valores de caracas
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Companies Section */}
      <section id="companies" className="py-16 px-4">
        <div className="container mx-auto">
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

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CompaniesCarousel />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h3
              className="text-4xl font-bold text-foreground mb-6"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              Comienza a invertir hoy
            </motion.h3>
            <motion.p className="text-xl text-foreground mb-8" variants={fadeInUp} transition={{ duration: 0.6 }}>
              Únete a miles de inversionistas que confían en {config.app.name} y haz crecer tus ahorros
            </motion.p>
            <motion.div variants={scaleIn} transition={{ duration: 0.5 }}>
              <Button size="lg" className="bg-accent text-white hover:bg-accent/90 transition-all hover:scale-105">
                Crear Cuenta Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SharedFooter />
    </div>
  )
}
