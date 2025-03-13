import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Github, Users, Home, LineChart, UserPlus } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 items-center px-4 max-w-6xl">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6" />
          <span className="font-bold hidden sm:inline-block">
            <span className="text-muted-foreground">Simple</span>{" "}
            <span className="text-primary">vite</span>{" "}
            <span className="text-muted-foreground">/</span>{" "}
            <span className="text-primary">shadcn/ui</span>{" "}
            <span className="text-muted-foreground">/</span>{" "}
            <span className="text-primary">express</span>
          </span>
        </Link>

        <nav className="flex items-center ml-6 space-x-2 lg:space-x-4">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link to="/users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link to="/users/new" className="flex items-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>New User</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hidden md:flex"
          >
            <Link
              to="/users?tab=analytics"
              className="flex items-center space-x-2"
            >
              <LineChart className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
          </Button>
        </nav>

        <div className="ml-auto flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://github.com/Avinava/simple-vite-shadcn-ui-express"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub Repository</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
