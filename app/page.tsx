import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { ArchiveSection } from "@/components/archive-section"
import { Footer } from "@/components/footer"
import { GridBackground } from "@/components/grid-background"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <GridBackground />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ArchiveSection />
        <Footer />
      </div>
    </main>
  )
}
