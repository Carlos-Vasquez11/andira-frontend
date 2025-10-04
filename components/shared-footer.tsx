import { config } from "@/lib/config"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

export function SharedFooter() {
  return (
    <footer className="border-t border-border/40 bg-card/50 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-accent-foreground" />
              </div>
              <span className="font-bold text-foreground">{config.app.name}</span>
            </div>
            <p className="text-sm text-foreground/60">{config.app.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <Link href="/centro-de-ayuda" className="hover:text-foreground transition-colors">
                  Centro de Ayuda
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <Link href="/terminos" className="hover:text-foreground transition-colors">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-foreground transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>Regulaciones</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center">
          <p className="text-sm text-foreground/60">© 2025 {config.app.name}. Todos los derechos reservados.</p>
        </div>
      </div>

      <div className="border-t border-border/40 mt-8 pt-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-foreground/60 mb-6">Regulado y supervisado por:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <a
              href="https://www.bolsadecaracas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity"
            >
              <img
                src="/bvc-bolsa-de-valores-de-caracas-logo.jpg"
                alt="BVC - Bolsa de Valores de Caracas"
                className="h-12"
              />
            </a>
            <a
              href="https://www.sunaval.gob.ve"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity"
            >
              <img
                src="/sunaval-venezuela-financial-regulator-logo.jpg"
                alt="SUNAVAL - Superintendencia Nacional de Valores"
                className="h-12"
              />
            </a>
            <a
              href="https://www.cnv.gob.ve"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity"
            >
              <img
                src="/cnv-venezuela-securities-commission-logo.jpg"
                alt="CNV - Comisión Nacional de Valores"
                className="h-12"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
