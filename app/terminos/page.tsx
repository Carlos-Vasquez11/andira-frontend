import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { config } from "@/lib/config"

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Términos y Condiciones</h1>
          <p className="text-foreground/60">Última actualización: 2 de febrero de 2025</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Aceptación de los Términos</h2>
            <p className="text-foreground/80 leading-relaxed">
              Al acceder y utilizar los servicios de {config.app.name}, usted acepta estar sujeto a estos Términos y
              Condiciones, todas las leyes y regulaciones aplicables de la República Bolivariana de Venezuela, y acepta
              que es responsable del cumplimiento de todas las leyes locales aplicables. Si no está de acuerdo con
              alguno de estos términos, tiene prohibido usar o acceder a este sitio y sus servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Servicios de Inversión</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {config.app.name} es una casa de bolsa autorizada que proporciona servicios de intermediación en el
              mercado de valores venezolano. Nuestros servicios incluyen:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>Compra y venta de valores en la Bolsa de Valores de Caracas</li>
              <li>Custodia de valores</li>
              <li>Asesoría en inversiones</li>
              <li>Gestión de portafolios</li>
              <li>Operaciones con divisas (USDT)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Requisitos de Cuenta</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Para abrir una cuenta con {config.app.name}, usted debe:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>Ser mayor de 18 años</li>
              <li>Ser ciudadano venezolano o residente legal en Venezuela</li>
              <li>Proporcionar información de identificación válida y verificable</li>
              <li>Completar el proceso de verificación KYC (Conozca a su Cliente)</li>
              <li>Aceptar los términos de prevención de lavado de dinero y financiamiento al terrorismo</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Riesgos de Inversión</h2>
            <p className="text-foreground/80 leading-relaxed">
              Usted reconoce y acepta que todas las inversiones conllevan riesgos inherentes. El valor de las
              inversiones puede fluctuar y usted puede perder parte o la totalidad de su capital invertido.{" "}
              {config.app.name} no garantiza rendimientos específicos y el desempeño pasado no es indicativo de
              resultados futuros. Es su responsabilidad evaluar los riesgos asociados con cada inversión y tomar
              decisiones informadas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Comisiones y Tarifas</h2>
            <p className="text-foreground/80 leading-relaxed">
              {config.app.name} cobra comisiones y tarifas por sus servicios según lo establecido en nuestra página de
              Tarifas. Nos reservamos el derecho de modificar nuestras tarifas con previo aviso de 30 días. Las
              comisiones se deducirán automáticamente de su cuenta al ejecutar las transacciones correspondientes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Depósitos y Retiros</h2>
            <p className="text-foreground/80 leading-relaxed">
              Los depósitos y retiros están sujetos a verificación y pueden tardar hasta 48 horas hábiles en procesarse.
              {config.app.name} se reserva el derecho de solicitar documentación adicional para verificar la procedencia
              de los fondos en cumplimiento con las regulaciones de prevención de lavado de dinero. Los retiros solo
              pueden realizarse a cuentas bancarias o billeteras digitales registradas a nombre del titular de la
              cuenta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Seguridad de la Cuenta</h2>
            <p className="text-foreground/80 leading-relaxed">
              Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las
              actividades que ocurran bajo su cuenta. Debe notificar inmediatamente a {config.app.name} sobre cualquier
              uso no autorizado de su cuenta o cualquier otra violación de seguridad. No seremos responsables de ninguna
              pérdida que pueda incurrir como resultado del uso no autorizado de su cuenta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Suspensión y Terminación</h2>
            <p className="text-foreground/80 leading-relaxed">
              {config.app.name} se reserva el derecho de suspender o terminar su cuenta en cualquier momento si
              sospechamos actividad fraudulenta, violación de estos términos, o por requerimiento de autoridades
              regulatorias. En caso de terminación, usted tendrá derecho a retirar sus fondos y valores, sujeto a las
              regulaciones aplicables y después de liquidar cualquier obligación pendiente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitación de Responsabilidad</h2>
            <p className="text-foreground/80 leading-relaxed">
              {config.app.name} no será responsable por daños indirectos, incidentales, especiales, consecuentes o
              punitivos, incluyendo sin limitación, pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas
              intangibles, resultantes de su acceso o uso de nuestros servicios, incluso si hemos sido advertidos de la
              posibilidad de tales daños.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Regulación y Supervisión</h2>
            <p className="text-foreground/80 leading-relaxed">
              {config.app.name} está regulada y supervisada por la Superintendencia Nacional de Valores (SUNAVAL) y la
              Comisión Nacional de Valores (CNV) de Venezuela. Operamos bajo las leyes y regulaciones del mercado de
              valores venezolano, incluyendo la Ley de Mercado de Valores y sus reglamentos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Modificaciones</h2>
            <p className="text-foreground/80 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en
              vigor inmediatamente después de su publicación en nuestro sitio web. Su uso continuado de nuestros
              servicios después de cualquier modificación constituye su aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Ley Aplicable</h2>
            <p className="text-foreground/80 leading-relaxed">
              Estos términos se regirán e interpretarán de acuerdo con las leyes de la República Bolivariana de
              Venezuela. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de
              los tribunales competentes de Caracas, Venezuela.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contacto</h2>
            <p className="text-foreground/80 leading-relaxed">
              Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos a través de:
            </p>
            <ul className="list-none space-y-2 text-foreground/80 mt-4">
              <li>
                <strong>Email:</strong> legal@andira.com.ve
              </li>
              <li>
                <strong>Teléfono:</strong> +58 212 555-0100
              </li>
              <li>
                <strong>Dirección:</strong> Av. Francisco de Miranda, Torre Andira, Caracas 1060, Venezuela
              </li>
            </ul>
          </section>
        </div>
      </main>

      <SharedFooter />
    </div>
  )
}
