import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { config } from "@/lib/config"

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Política de Privacidad</h1>
          <p className="text-foreground/60">Última actualización: 2 de febrero de 2025</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introducción</h2>
            <p className="text-foreground/80 leading-relaxed">
              En {config.app.name}, nos comprometemos a proteger su privacidad y la seguridad de su información
              personal. Esta Política de Privacidad describe cómo recopilamos, usamos, compartimos y protegemos su
              información cuando utiliza nuestros servicios de intermediación de valores y plataforma digital.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Información que Recopilamos</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Recopilamos diferentes tipos de información para proporcionar y mejorar nuestros servicios:
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.1 Información Personal</h3>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>Nombre completo, fecha de nacimiento y nacionalidad</li>
              <li>Número de cédula de identidad o documento de identificación</li>
              <li>Dirección de residencia y datos de contacto</li>
              <li>Información bancaria y de cuentas financieras</li>
              <li>Información fiscal (RIF)</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.2 Información Financiera</h3>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>Historial de transacciones y operaciones</li>
              <li>Saldos de cuenta y tenencias de valores</li>
              <li>Información sobre depósitos y retiros</li>
              <li>Perfil de riesgo e inversión</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.3 Información Técnica</h3>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>Dirección IP y datos de ubicación</li>
              <li>Tipo de navegador y dispositivo</li>
              <li>Cookies y tecnologías similares</li>
              <li>Registros de actividad en la plataforma</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cómo Usamos su Información</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Utilizamos la información recopilada para los siguientes propósitos:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>Proporcionar y mantener nuestros servicios de intermediación</li>
              <li>Procesar transacciones y órdenes de compra/venta</li>
              <li>Verificar su identidad y cumplir con regulaciones KYC/AML</li>
              <li>Prevenir fraude y actividades ilícitas</li>
              <li>Comunicarnos con usted sobre su cuenta y servicios</li>
              <li>Mejorar nuestros servicios y experiencia de usuario</li>
              <li>Cumplir con obligaciones legales y regulatorias</li>
              <li>Enviar notificaciones importantes sobre cambios en nuestros servicios</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Compartir Información</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Podemos compartir su información en las siguientes circunstancias:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>
                <strong>Autoridades Regulatorias:</strong> SUNAVAL, CNV, y otras entidades gubernamentales según lo
                requiera la ley
              </li>
              <li>
                <strong>Bolsa de Valores:</strong> Bolsa de Valores de Caracas para ejecutar operaciones
              </li>
              <li>
                <strong>Proveedores de Servicios:</strong> Terceros que nos ayudan a operar nuestra plataforma (hosting,
                análisis, soporte)
              </li>
              <li>
                <strong>Instituciones Financieras:</strong> Bancos y procesadores de pago para transacciones
              </li>
              <li>
                <strong>Requisitos Legales:</strong> Cuando sea necesario para cumplir con la ley o proteger nuestros
                derechos
              </li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              Nunca vendemos su información personal a terceros con fines de marketing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Seguridad de la Información</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Implementamos medidas de seguridad técnicas y organizativas para proteger su información:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>Encriptación SSL/TLS para todas las transmisiones de datos</li>
              <li>Autenticación de dos factores (2FA) para acceso a cuentas</li>
              <li>Almacenamiento seguro de datos con encriptación en reposo</li>
              <li>Monitoreo continuo de seguridad y detección de amenazas</li>
              <li>Acceso restringido a información personal solo para personal autorizado</li>
              <li>Auditorías de seguridad regulares</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Retención de Datos</h2>
            <p className="text-foreground/80 leading-relaxed">
              Retenemos su información personal durante el tiempo que mantenga una cuenta activa con nosotros y durante
              el período adicional requerido por las regulaciones venezolanas (generalmente 10 años después del cierre
              de la cuenta). Los datos de transacciones se mantienen según lo requiere la ley de valores y regulaciones
              fiscales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Sus Derechos</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Usted tiene los siguientes derechos respecto a su información personal:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>
                <strong>Acceso:</strong> Solicitar una copia de la información que tenemos sobre usted
              </li>
              <li>
                <strong>Corrección:</strong> Solicitar la corrección de información inexacta o incompleta
              </li>
              <li>
                <strong>Eliminación:</strong> Solicitar la eliminación de su información (sujeto a obligaciones legales)
              </li>
              <li>
                <strong>Restricción:</strong> Solicitar la limitación del procesamiento de su información
              </li>
              <li>
                <strong>Portabilidad:</strong> Recibir su información en un formato estructurado y legible
              </li>
              <li>
                <strong>Objeción:</strong> Oponerse al procesamiento de su información en ciertas circunstancias
              </li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              Para ejercer estos derechos, contáctenos a través de privacidad@andira.com.ve
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Cookies y Tecnologías de Seguimiento</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">Utilizamos cookies y tecnologías similares para:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>Mantener su sesión activa y preferencias</li>
              <li>Analizar el uso de nuestra plataforma</li>
              <li>Mejorar la seguridad y prevenir fraude</li>
              <li>Personalizar su experiencia</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              Puede configurar su navegador para rechazar cookies, pero esto puede afectar la funcionalidad de nuestros
              servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Transferencias Internacionales</h2>
            <p className="text-foreground/80 leading-relaxed">
              Sus datos se almacenan y procesan principalmente en Venezuela. En algunos casos, podemos transferir datos
              a proveedores de servicios ubicados en otros países. Cuando esto ocurra, nos aseguramos de que existan
              garantías adecuadas para proteger su información de acuerdo con esta política y las leyes aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Menores de Edad</h2>
            <p className="text-foreground/80 leading-relaxed">
              Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente información
              personal de menores. Si descubrimos que hemos recopilado información de un menor, tomaremos medidas para
              eliminarla de inmediato.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Cambios a esta Política</h2>
            <p className="text-foreground/80 leading-relaxed">
              Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas
              o por razones legales. Le notificaremos sobre cambios significativos publicando la nueva política en
              nuestro sitio web y, cuando sea apropiado, enviándole una notificación por correo electrónico. La fecha de
              "Última actualización" al inicio de esta política indica cuándo fue revisada por última vez.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contacto</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Si tiene preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad o el manejo de
              su información personal, puede contactarnos a través de:
            </p>
            <ul className="list-none space-y-2 text-foreground/80">
              <li>
                <strong>Email:</strong> privacidad@andira.com.ve
              </li>
              <li>
                <strong>Teléfono:</strong> +58 212 555-0100
              </li>
              <li>
                <strong>Dirección:</strong> Av. Francisco de Miranda, Torre Andira, Caracas 1060, Venezuela
              </li>
              <li>
                <strong>Oficial de Protección de Datos:</strong> dpo@andira.com.ve
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Cumplimiento Regulatorio</h2>
            <p className="text-foreground/80 leading-relaxed">
              Esta Política de Privacidad cumple con las regulaciones venezolanas aplicables, incluyendo la Ley de
              Protección de Datos Personales, las regulaciones de SUNAVAL y CNV, y las mejores prácticas internacionales
              en protección de datos financieros.
            </p>
          </section>
        </div>
      </main>

      <SharedFooter />
    </div>
  )
}
