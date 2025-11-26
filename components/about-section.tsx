"use client"

import { useEffect, useRef, useState } from "react"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Glitch Photo Frame */}
          <div className="relative group">
            <div className="aspect-square bg-secondary/20 border border-border overflow-hidden relative">
              {/* Glitch effect layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-transparent" />
              <div className="absolute inset-4 border border-muted-foreground/20" />
              <div className="absolute inset-8 border border-muted-foreground/10" />

              {/* Placeholder avatar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-secondary/40 border-2 border-muted-foreground/20 flex items-center justify-center">
                  <span className="font-mono text-4xl text-muted-foreground">CK</span>
                </div>
              </div>

              {/* Glitch lines */}
              <div className="absolute top-1/4 left-0 right-0 h-px bg-foreground/10 group-hover:animate-pulse" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-foreground/5 group-hover:animate-pulse" />
              <div className="absolute top-3/4 left-0 right-0 h-px bg-foreground/10 group-hover:animate-pulse" />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-muted-foreground/40" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-muted-foreground/40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-muted-foreground/40" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-muted-foreground/40" />
            </div>

            {/* Status indicator */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background border border-border px-4 py-1">
              <span className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                AVAILABLE FOR HIRE
              </span>
            </div>
          </div>

          {/* About Text */}
          <div className="space-y-6">
            <div className="font-mono text-sm text-muted-foreground">
              <span className="text-foreground">&gt;</span> cat about.txt
            </div>
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-foreground">About Me</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm <span className="text-foreground font-medium">Cuma Karadaş</span>, a Freelance Front-End Developer
                and Network Specialist based in <span className="text-foreground">Ankara, Turkey</span>.
              </p>
              <p>
                My work sits at the intersection of web development and network engineering. I build modern, performant
                web applications while diving deep into protocol analysis and security research.
              </p>
              <p>
                As a Tech Writer, I translate complex technical concepts into accessible content. My expertise spans{" "}
                <span className="text-foreground">Research & Synthesis</span>, turning raw data into actionable
                insights.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-4">
              {["Freelancer", "Web Specialist", "Tech Writer", "Researcher"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-border font-mono text-xs text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
