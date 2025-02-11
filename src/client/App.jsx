import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Badge } from "./components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { UserList } from "./components/UserList"
import { UserForm } from "./components/UserForm"
import { Toaster } from "./components/ui/toaster"
import { Header } from "./components/Header"
import { ArrowRight, Users, UserPlus, RefreshCcw, Shield, Database, Zap, Github } from "lucide-react"
import { Button } from "./components/ui/button"
import { Link } from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/users/:id" element={<UserForm />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div className="flex-1 space-y-12 py-8">
      {/* Hero Section */}
      <section className="container space-y-8 max-w-6xl px-4 pt-4 md:pt-8 lg:pt-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <Badge variant="secondary" className="h-8 items-center px-4">
            <span>Full-Stack Template</span>
          </Badge>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-muted-foreground">Simple</span>{" "}
            <span className="text-primary">vite</span> <span className="text-muted-foreground">/</span>{" "}
            <span className="text-primary">shadcn/ui</span> <span className="text-muted-foreground">/</span>{" "}
            <span className="text-primary">express</span>
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-xl/relaxed">
            A modern full-stack starter template with beautiful UI components and robust backend
          </p>
          <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/users">
                Try Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href="https://github.com/yourusername/simple-vite-shadcnui-express" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <CardTitle>User Management</CardTitle>
              </div>
              <CardDescription>Complete CRUD operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground">
                  Fully functional user management system with validation and error handling
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-foreground">Interactive data table</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-primary" />
                <CardTitle>Modern Security</CardTitle>
              </div>
              <CardDescription>Built-in protection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground">
                  Includes Helmet security, rate limiting, and CORS configuration
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-foreground">Production-ready setup</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4 text-primary" />
                <CardTitle>Prisma ORM</CardTitle>
              </div>
              <CardDescription>Type-safe database access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground">
                  Modern database toolkit with migrations and seeding support
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-foreground">PostgreSQL integration</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-primary" />
                <CardTitle>Fast Development</CardTitle>
              </div>
              <CardDescription>Lightning-fast HMR</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground">
                  Vite-powered development with instant hot module replacement
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-foreground">Optimized production build</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4 text-primary" />
                <CardTitle>shadcn/ui Components</CardTitle>
              </div>
              <CardDescription>Beautiful UI components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground">
                  Accessible and customizable components built with Radix UI and Tailwind
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-foreground">Dark mode support</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <RefreshCcw className="h-4 w-4 text-primary" />
                <CardTitle>API Integration</CardTitle>
              </div>
              <CardDescription>Seamless communication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground">
                  Pre-configured API client with automatic error handling
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-foreground">Development proxy setup</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default App