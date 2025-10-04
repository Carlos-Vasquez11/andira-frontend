"use client"

import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { BookOpen, CreditCard, Shield, TrendingUp, Mail, Phone, Lightbulb } from "lucide-react"

const helpCategories = [
  {
    icon: BookOpen,
    title: "Primeros Pasos",
    description: "Aprende cómo comenzar a invertir en Andira",
    articles: [
      {
        title: "Crear una cuenta",
        content:
          "Para crear una cuenta en Andira, dirígete a la página de registro y completa el formulario con tus datos personales. Necesitarás proporcionar tu nombre completo, correo electrónico, número de teléfono y crear una contraseña segura. Una vez completado el registro, recibirás un correo de confirmación para activar tu cuenta.",
      },
      {
        title: "Verificar identidad",
        content:
          "La verificación de identidad es un proceso obligatorio para cumplir con las regulaciones financieras. Deberás subir una foto de tu cédula de identidad o pasaporte, junto con una selfie para confirmar tu identidad. El proceso de verificación generalmente toma entre 24 a 48 horas hábiles.",
      },
      {
        title: "Navegar el dashboard",
        content:
          "El dashboard de Andira te proporciona una vista completa de tu portafolio. En la parte superior encontrarás tu balance total, seguido de tus inversiones activas, historial de órdenes y opciones para depositar o retirar fondos. Utiliza el menú lateral para acceder a diferentes secciones como Mercado, Alertas y Universidad.",
      },
      {
        title: "Realizar primera inversión",
        content:
          "Para realizar tu primera inversión, primero debes depositar fondos en tu cuenta. Luego, dirígete a la sección de Mercado, selecciona la acción que deseas comprar, ingresa la cantidad de acciones y confirma la orden. Asegúrate de revisar todos los detalles antes de confirmar la transacción.",
      },
    ],
  },
  {
    icon: TrendingUp,
    title: "Inversiones",
    description: "Todo sobre compra y venta de acciones",
    articles: [
      {
        title: "Cómo comprar acciones",
        content:
          "Para comprar acciones, navega a la sección de Mercado y selecciona la empresa en la que deseas invertir. Haz clic en 'Comprar', ingresa la cantidad de acciones que deseas adquirir y revisa el monto total. Una vez confirmada la orden, las acciones se agregarán a tu portafolio una vez que la transacción sea procesada.",
      },
      {
        title: "Tipos de órdenes",
        content:
          "Andira ofrece diferentes tipos de órdenes: Orden de Mercado (se ejecuta inmediatamente al precio actual), Orden Limitada (se ejecuta solo cuando el precio alcanza tu límite especificado) y Orden Stop (se activa cuando el precio alcanza un nivel determinado). Cada tipo tiene sus ventajas según tu estrategia de inversión.",
      },
      {
        title: "Análisis de mercado",
        content:
          "Utiliza nuestras herramientas de análisis para tomar decisiones informadas. Puedes ver gráficos históricos de precios, indicadores técnicos, noticias relevantes y análisis de expertos. También ofrecemos alertas de precio para que no pierdas oportunidades de inversión importantes.",
      },
      {
        title: "Gestión de portafolio",
        content:
          "Tu portafolio muestra todas tus inversiones actuales, incluyendo el valor nominal, precio actual, ganancia o pérdida, y el porcentaje de tu portafolio que representa cada inversión. Puedes diversificar tu portafolio invirtiendo en diferentes sectores y empresas para reducir el riesgo.",
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Depósitos y Retiros",
    description: "Gestiona tu dinero de forma segura",
    articles: [
      {
        title: "Depositar Bolívares",
        content:
          "Para depositar Bolívares, haz clic en 'Ingresar Dinero' en tu dashboard y selecciona la opción de Bolívares. Deberás realizar una transferencia bancaria a la cuenta de Andira que se te proporcionará. Asegúrate de incluir tu número de referencia único en la transferencia. Los depósitos se acreditan en un plazo de 24 horas hábiles.",
      },
      {
        title: "Depositar USDT",
        content:
          "Para depositar USDT, selecciona la opción de USDT en el modal de depósito. Se te proporcionará una dirección de wallet única para realizar la transferencia. Copia la dirección con cuidado y realiza la transferencia desde tu wallet de criptomonedas. Los depósitos de USDT generalmente se acreditan después de 3 confirmaciones en la blockchain.",
      },
      {
        title: "Retirar fondos",
        content:
          "Para retirar fondos, haz clic en 'Retirar Dinero' y selecciona la moneda que deseas retirar (Bolívares o USDT). Ingresa el monto y selecciona la cuenta de destino previamente configurada. Verifica todos los detalles antes de confirmar. Los retiros de Bolívares se procesan en 24-48 horas, mientras que los retiros de USDT pueden tomar hasta 24 horas.",
      },
      {
        title: "Tiempos de procesamiento",
        content:
          "Los tiempos de procesamiento varían según el tipo de transacción: Depósitos en Bolívares (24 horas hábiles), Depósitos en USDT (30 minutos - 2 horas), Retiros en Bolívares (24-48 horas hábiles), Retiros en USDT (hasta 24 horas). Ten en cuenta que estos tiempos pueden variar durante fines de semana y días festivos.",
      },
    ],
  },
  {
    icon: Shield,
    title: "Seguridad",
    description: "Protege tu cuenta e inversiones",
    articles: [
      {
        title: "Autenticación de dos factores",
        content:
          "La autenticación de dos factores (2FA) añade una capa adicional de seguridad a tu cuenta. Una vez activada, necesitarás ingresar un código de verificación además de tu contraseña al iniciar sesión. Puedes configurar 2FA usando aplicaciones como Google Authenticator o Authy. Te recomendamos activar esta función para proteger tu cuenta.",
      },
      {
        title: "Cambiar contraseña",
        content:
          "Para cambiar tu contraseña, ve a Configuración de Cuenta y selecciona 'Cambiar Contraseña'. Deberás ingresar tu contraseña actual y luego tu nueva contraseña dos veces para confirmar. Asegúrate de usar una contraseña fuerte que incluya letras mayúsculas, minúsculas, números y caracteres especiales.",
      },
      {
        title: "Actividad sospechosa",
        content:
          "Si detectas actividad sospechosa en tu cuenta, como inicios de sesión no autorizados o transacciones que no reconoces, cambia tu contraseña inmediatamente y contacta a nuestro equipo de soporte. Andira monitorea constantemente las cuentas en busca de actividad inusual y te notificará si detectamos algo sospechoso.",
      },
      {
        title: "Mejores prácticas",
        content:
          "Para mantener tu cuenta segura: nunca compartas tu contraseña, activa la autenticación de dos factores, verifica siempre que estés en el sitio oficial de Andira antes de iniciar sesión, no uses redes WiFi públicas para acceder a tu cuenta, mantén tu software y navegador actualizados, y desconfía de correos electrónicos o mensajes sospechosos que soliciten tu información.",
      },
    ],
  },
]

const faqData = [
  {
    question: "¿Cómo funciona la plataforma?",
    answer:
      "Andira es una plataforma de inversión que te permite acceder al mercado de valores venezolano de manera simple y segura. Primero, creas tu cuenta y verificas tu identidad. Luego, depositas fondos en Bolívares o USDT. Una vez que tengas saldo disponible, puedes explorar el mercado, analizar las empresas disponibles y realizar órdenes de compra o venta de acciones. La plataforma te proporciona herramientas de análisis, alertas de precio y un dashboard completo para gestionar tu portafolio de inversiones en tiempo real.",
  },
  {
    question: "¿Qué es la bolsa de valores?",
    answer:
      "La bolsa de valores es un mercado organizado donde se compran y venden acciones de empresas públicas. En Venezuela, la Bolsa de Valores de Caracas (BVC) es el principal mercado donde empresas como Banesco, Mercantil, Ron Santa Teresa y otras compañías líderes ofrecen sus acciones al público. Cuando compras una acción, te conviertes en propietario parcial de esa empresa y puedes beneficiarte de su crecimiento a través del aumento del precio de las acciones y el pago de dividendos. La bolsa está regulada por organismos como SUNAVAL y la CNV para garantizar transparencia y protección a los inversionistas.",
  },
  {
    question: "¿Cómo se gana dinero con la bolsa de valores?",
    answer:
      "Existen dos formas principales de ganar dinero en la bolsa de valores: 1) Apreciación del capital: Compras acciones a un precio y las vendes cuando su valor aumenta, obteniendo una ganancia por la diferencia. Por ejemplo, si compras acciones de una empresa a Bs. 10 y las vendes a Bs. 15, ganas Bs. 5 por acción. 2) Dividendos: Algunas empresas distribuyen parte de sus ganancias entre sus accionistas de forma periódica. Es importante recordar que invertir en bolsa conlleva riesgos y los precios pueden bajar, por lo que se recomienda diversificar tu portafolio, investigar las empresas antes de invertir y tener una visión a largo plazo.",
  },
  {
    question: "¿Cómo puedo abrir una cuenta?",
    answer:
      "Para abrir una cuenta, simplemente haz clic en 'Comenzar' y completa el formulario de registro con tu información personal. Necesitarás tu documento de identidad y completar el proceso de verificación.",
  },
  {
    question: "¿Cuál es el monto mínimo para invertir?",
    answer:
      "No hay monto mínimo para invertir. Puedes comenzar con cualquier cantidad que desees, lo que hace que nuestros servicios sean accesibles para todos los inversionistas.",
  },
  {
    question: "¿En qué moneda se realizan los pagos?",
    answer:
      "Todos los pagos se realizan en VEF (Bolívares venezolanos) según la tasa oficial del Banco Central de Venezuela. Los precios mostrados en USDT son solo para referencia en operaciones específicas.",
  },
  {
    question: "¿Puedo invertir desde el extranjero?",
    answer:
      "Sí, nuestra plataforma permite a inversionistas de cualquier parte del mundo acceder al mercado de valores venezolano de manera segura y regulada.",
  },
  {
    question: "¿Qué empresas puedo encontrar en la BVC?",
    answer:
      "En la Bolsa de Valores de Caracas puedes invertir en las principales empresas venezolanas como Ron Santa Teresa, Banesco, Mercantil, y muchas otras compañías líderes del país.",
  },
  {
    question: "¿Cómo están regulados sus servicios?",
    answer:
      "Estamos regulados y supervisados por la Superintendencia Nacional de Valores (SUNAVAL) y la Comisión Nacional de Valores (CNV), garantizando la seguridad y transparencia de todas las operaciones.",
  },
  {
    question: "¿Ofrecen soporte al cliente?",
    answer:
      "Sí, contamos con un equipo de soporte especializado que te ayudará con cualquier consulta sobre inversiones, operaciones en la plataforma o aspectos técnicos.",
  },
]

export default function CentroDeAyudaPage() {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Centro de Ayuda</h1>
          <p className="text-xl text-white/70">¿En qué podemos ayudarte hoy?</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-accent" />
                </div>
                <CardTitle className="text-2xl text-white">¿Por qué invertir en la bolsa de valores?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/80 leading-relaxed">
                Invertir en la bolsa de valores es una de las formas más efectivas de hacer crecer tu patrimonio a largo
                plazo. A diferencia de mantener tu dinero en una cuenta de ahorros tradicional, invertir en acciones te
                permite participar directamente en el crecimiento de empresas exitosas y beneficiarte de sus ganancias.
              </p>
              <p className="text-white/80 leading-relaxed">
                <span className="text-accent font-semibold">¿Cómo funciona?</span> Cuando compras una acción, te
                conviertes en copropietario de esa empresa. Si la empresa crece y genera más valor, el precio de tus
                acciones aumenta, permitiéndote vender con ganancia. Además, muchas empresas distribuyen parte de sus
                utilidades entre sus accionistas mediante dividendos, generando ingresos pasivos regulares.
              </p>
              <p className="text-white/80 leading-relaxed">
                La clave del éxito está en la diversificación (invertir en diferentes empresas y sectores), la
                investigación (conocer las empresas en las que inviertes) y la paciencia (mantener una visión a largo
                plazo). Con Andira, tienes acceso a herramientas profesionales, análisis de mercado y educación continua
                para tomar decisiones informadas y construir un portafolio sólido.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Help Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Categorías de Ayuda</h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {helpCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                      <category.icon className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-white">{category.title}</CardTitle>
                    <CardDescription className="text-white/60">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.articles.map((article, articleIndex) => (
                        <AccordionItem key={articleIndex} value={`item-${articleIndex}`} className="border-white/10">
                          <AccordionTrigger className="text-white/80 hover:text-white text-left text-sm py-3 hover:no-underline">
                            {article.title}
                          </AccordionTrigger>
                          <AccordionContent className="text-white/60 text-sm leading-relaxed">
                            {article.content}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Full FAQ Section with Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Preguntas Frecuentes</h2>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border-white/10">
                      <AccordionTrigger className="text-white hover:text-white/80 text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/70 leading-relaxed">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-accent/20 to-accent/10 border-accent/30">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white mb-2">¿Aún necesitas ayuda?</CardTitle>
              <CardDescription className="text-white/70 text-lg">
                Nuestro equipo de soporte está disponible para asistirte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Email</h3>
                    <p className="text-white/60 text-sm mb-4">Respuesta en 24 horas</p>
                    <a
                      href="mailto:soporte@andira.com"
                      className="text-accent hover:text-accent/80 transition-colors text-sm"
                    >
                      soporte@andira.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Teléfono</h3>
                    <p className="text-white/60 text-sm mb-4">Lun - Vie, 9am - 6pm</p>
                    <a href="tel:+582129999999" className="text-accent hover:text-accent/80 transition-colors text-sm">
                      +58 212 999 9999
                    </a>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <SharedFooter />
    </div>
  )
}
