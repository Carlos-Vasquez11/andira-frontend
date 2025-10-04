import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"

export default function UniversidadPage() {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      <div className="flex-1 flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <img
              src="/funny-robot-building-website-construction.jpg"
              alt="Robot building website"
              className="mx-auto rounded-lg max-w-full h-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Universidad Kairos</h1>
          <p className="text-lg text-foreground/80 mb-6">¡Estamos construyendo algo increíble para ti! 🚧</p>
          <p className="text-foreground/60">
            Pronto tendrás acceso a cursos, webinars y recursos educativos para convertirte en un experto inversionista.
          </p>
        </div>
      </div>

      <SharedFooter />
    </div>
  )
}
