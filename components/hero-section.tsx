"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Mail } from "lucide-react"

export function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const fullText = ">_ Hello, I am Cuma."

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <div className="text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold text-foreground mb-6 tracking-tight">
          {displayText}
          <span
            className={`inline-block w-[3px] h-[1em] bg-foreground ml-1 align-middle transition-opacity ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
          />
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-sans mb-12 max-w-2xl mx-auto leading-relaxed">
          Building Web Solutions & Analyzing Network Protocols.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="font-mono text-sm tracking-wide px-8" onClick={() => scrollToSection("archive")}>
            View Research
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="font-mono text-sm tracking-wide px-8 border-muted-foreground/30 hover:border-foreground hover:bg-foreground/5 bg-transparent"
            onClick={() => scrollToSection("footer")}
          >
            <Mail className="mr-2 h-4 w-4" />
            Contact Me
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
