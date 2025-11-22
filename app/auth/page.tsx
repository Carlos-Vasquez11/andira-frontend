"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { config } from "@/lib/config"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  // Register form state
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // Demo login - bypass API for testing
    if (loginData.email === "demo@kairos.com" && loginData.password === "demo123") {
      // Store demo user data in localStorage
      const demoUser = {
        id: "1",
        firstName: "María",
        lastName: "González",
        email: "demo@kairos.com",
        avatar: "/professional-woman-avatar.png",
      }

      try {
        localStorage.setItem("kairos_user", JSON.stringify(demoUser))
        localStorage.setItem("kairos_token", "demo_token_123")

        // Verify data was stored
        const storedUser = localStorage.getItem("kairos_user")
        const storedToken = localStorage.getItem("kairos_token")

        if (!storedUser || !storedToken) {
          throw new Error("Failed to store authentication data")
        }

        setSuccess("Inicio de sesión exitoso. Redirigiendo...")

        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      } catch (error) {
        setError("Error al guardar los datos de sesión. Intenta nuevamente.")
      }

      setIsLoading(false)
      return
    }

    try {
      // TODO: Replace with actual API call
      const response = await fetch(`${config.apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })

      if (response.ok) {
        setSuccess("Inicio de sesión exitoso. Redirigiendo...")
        // TODO: Handle successful login (store token, redirect)
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Error al iniciar sesión")
      }
    } catch (error) {
      setError("Error de conexión. Para probar, usa: demo@kairos.com / demo123")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // Validate passwords match
    if (registerData.password !== registerData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (registerData.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres")
      setIsLoading(false)
      return
    }

    try {
      // TODO: Replace with actual API call
      const response = await fetch(`${config.apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: registerData.email,
          password: registerData.password,
        }),
      })

      if (response.ok) {
        setSuccess("Registro exitoso. Por favor, verifica tu email.")
        // Reset form
        setRegisterData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Error al registrarse")
      }
    } catch (error) {
      setError("Error de conexión. Por favor, intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    setError("Google SSO estará disponible próximamente")
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Bienvenido a Kairos</h1>
            <p className="text-muted-foreground">Accede a tu cuenta o crea una nueva para comenzar a invertir</p>
          </div>

          <Alert className="mb-4 border-blue-500/50 bg-blue-500/10">
            <AlertDescription className="text-center">
              <p className="font-semibold text-blue-400 mb-1">Demo de Prueba</p>
              <p className="text-sm text-blue-300">
                Email: <code className="bg-blue-950/50 px-2 py-0.5 rounded">demo@kairos.com</code>
              </p>
              <p className="text-sm text-blue-300">
                Password: <code className="bg-blue-950/50 px-2 py-0.5 rounded">demo123</code>
              </p>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Acceso a tu cuenta</CardTitle>
              <CardDescription className="text-center">Inicia sesión o regístrate para continuar</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert className="mb-4 border-destructive/50 text-destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 border-green-500/50 text-green-600">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                  <TabsTrigger value="register">Registrarse</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="tu@email.com"
                          className="pl-10"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Tu contraseña"
                          className="pl-10 pr-10"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
                    </div>
                  </div>

                  <Button type="button" variant="outline" className="w-full bg-transparent" onClick={handleGoogleLogin}>
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continuar con Google
                  </Button>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Juan"
                            className="pl-10"
                            value={registerData.firstName}
                            onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Pérez"
                          value={registerData.lastName}
                          onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="tu@email.com"
                          className="pl-10"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Mínimo 8 caracteres"
                          className="pl-10 pr-10"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Repite tu contraseña"
                          className="pl-10 pr-10"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Registrando..." : "Crear Cuenta"}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">O regístrate con</span>
                    </div>
                  </div>

                  <Button type="button" variant="outline" className="w-full bg-transparent" onClick={handleGoogleLogin}>
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continuar con Google
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>
                  Al registrarte, aceptas nuestros{" "}
                  <a href="/terminos" className="text-primary hover:underline">
                    Términos de Servicio
                  </a>{" "}
                  y{" "}
                  <a href="/privacidad" className="text-primary hover:underline">
                    Política de Privacidad
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <SharedFooter />
    </div>
  )
}
