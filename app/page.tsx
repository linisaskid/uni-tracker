import { UniversityTable } from "@/components/university-table"
import { universities } from "@/lib/data"
import { ThemeToggle } from "@/components/theme-toggle"
import { GraduationCap } from "lucide-react"

interface HomePageProps {
  searchParams: {
    sort?: string
    order?: "asc" | "desc"
  }
}

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <h1 className="text-xl font-medium">University Rankings</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-4xl font-medium tracking-tight mb-12 text-center">Find the best universities worldwide</h2>
        <UniversityTable universities={universities} searchParams={searchParams} />
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} University Rankings</p>
        </div>
      </footer>
    </div>
  )
}
