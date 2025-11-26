import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { ArchiveSection } from "@/components/archive-section"
import { TelemetrySection } from "@/components/telemetry-section"
import { Footer } from "@/components/footer"
import { GridBackground } from "@/components/grid-background"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <GridBackground />
      <LanguageSwitcher />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <TelemetrySection />
        <ArchiveSection />
        <Footer />
      </div>
    </main>
  )
}
