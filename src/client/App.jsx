import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Progress } from "./components/ui/progress"
import { Separator } from "./components/ui/separator"
import { Github } from "lucide-react"
import { UserList } from "./components/UserList"
import { UserForm } from "./components/UserForm"
import { Toaster } from "./components/ui/toaster"
import { ThemeToggle } from "./components/ThemeToggle"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <nav className="border-b">
          <div className="container flex h-16 items-center px-4 max-w-6xl">
            <Link to="/" className="font-bold">Simple Vite Express</Link>
            <div className="ml-auto flex items-center space-x-4">
              <Button asChild variant="ghost">
                <Link to="/users">Users</Link>
              </Button>
              <ThemeToggle />
              <Button variant="outline" size="icon">
                <a href="https://github.com/yourusername/simple-vite-shadcn-ui-express" target="_blank" rel="noopener">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </nav>
        
        <main className="container max-w-6xl p-8">
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
    <div className="flex flex-col gap-8">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-4xl">
            User Management Demo
          </CardTitle>
          <CardDescription>
            A demonstration of full-stack features with Express.js backend and shadcn/ui components
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-muted-foreground">
            This demo showcases a complete user management system with CRUD operations
          </p>
          <div className="flex flex-col gap-2 md:flex-row">
            <Button asChild>
              <Link to="/users">View Users</Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/users/new">Create User</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="User List"
          description="View and manage users"
          content="Interactive table with sort and filter capabilities"
          action={<Link to="/users">View Users</Link>}
        />
        <FeatureCard
          title="Create Users"
          description="Add new users"
          content="Form with validation and error handling"
          action={<Link to="/users/new">Add User</Link>}
        />
        <FeatureCard
          title="Edit & Delete"
          description="Modify user data"
          content="Full CRUD operations with immediate updates"
          action={<Link to="/users">Manage Users</Link>}
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, description, content, action }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <div className="p-6 pt-0">
        <Button variant="ghost" asChild>{action}</Button>
      </div>
    </Card>
  )
}

export default App