import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Progress } from "./components/ui/progress"
import { Separator } from "./components/ui/separator"
import { Github } from "lucide-react"

function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container max-w-6xl">
        <div className="flex flex-col gap-8">
          {/* Hero Card */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-4xl">
                Vite + React + shadcn/ui + Express
              </CardTitle>
              <CardDescription>
                A modern full-stack starter template with shadcn-ui components
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <p className="text-muted-foreground">
                Edit <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">src/client/App.jsx</code> to customize this template
              </p>
              <div className="flex flex-col gap-2 md:flex-row">
                <Button>Get Started</Button>
                <Button variant="outline" className="gap-2">
                  <Github size={16} />
                  View on GitHub
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tech Stack Section */}
          <Card>
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
              <CardDescription>Our powerful technology foundation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">React + Vite</span>
                  <span className="text-sm text-muted-foreground">95%</span>
                </div>
                <Progress value={95} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Shadcn UI</span>
                  <span className="text-sm text-muted-foreground">90%</span>
                </div>
                <Progress value={90} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Express.js</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} />
              </div>
            </CardContent>
          </Card>

          <Separator className="my-4" />

          {/* Features Tabs */}
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
            </TabsList>
            <TabsContent value="frontend" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Frontend Features</CardTitle>
                  <CardDescription>Modern React development with Vite</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Lightning-fast Hot Module Replacement</li>
                    <li>Optimized production builds</li>
                    <li>TypeScript support out of the box</li>
                    <li>Modern development environment</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="components" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>UI Components</CardTitle>
                  <CardDescription>Beautiful and accessible components</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Built with Radix UI primitives</li>
                    <li>Styled with Tailwind CSS</li>
                    <li>Fully customizable and themeable</li>
                    <li>Dark mode support</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="backend" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Backend Features</CardTitle>
                  <CardDescription>Robust Express.js server setup</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>RESTful API routing</li>
                    <li>Static file serving</li>
                    <li>Production-ready configuration</li>
                    <li>Easy to extend and customize</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Feature Cards Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Frontend</CardTitle>
                <CardDescription>Modern React with Vite</CardDescription>
              </CardHeader>
              <CardContent>
                Lightning-fast HMR, optimized builds, and TypeScript support out of the box.
              </CardContent>
              <CardFooter>
                <Button variant="ghost">Learn more</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>UI Components</CardTitle>
                <CardDescription>shadcn/ui Integration</CardDescription>
              </CardHeader>
              <CardContent>
                Beautiful, accessible components built with Radix UI and Tailwind CSS.
              </CardContent>
              <CardFooter>
                <Button variant="ghost">View components</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backend</CardTitle>
                <CardDescription>Express.js Server</CardDescription>
              </CardHeader>
              <CardContent>
                Production-ready Express.js setup with API routing and static file serving.
              </CardContent>
              <CardFooter>
                <Button variant="ghost">API docs</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App