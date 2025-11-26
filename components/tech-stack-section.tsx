"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Database, Network, Terminal, Layers } from "lucide-react"

const techStack = [
  {
    name: "React",
    icon: Code2,
    description: "Component Architecture",
    category: "Frontend",
  },
  {
    name: "Next.js",
    icon: Layers,
    description: "Full-Stack Framework",
    category: "Framework",
  },
  {
    name: "TypeScript",
    icon: Code2,
    description: "Type-Safe Development",
    category: "Language",
  },
  {
    name: "Linux",
    icon: Terminal,
    description: "System Administration",
    category: "OS",
  },
  {
    name: "SQL",
    icon: Database,
    description: "Database Management",
    category: "Database",
  },
  {
    name: "Network Engineering",
    icon: Network,
    description: "Protocol Analysis",
    category: "Infrastructure",
  },
]

export function TechStackSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="stack" className="py-24 md:py-32 px-6 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="font-mono text-sm text-muted-foreground mb-4">
            <span className="text-foreground">&gt;</span> ls ./skills
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-foreground">Tech Stack</h2>
        </div>

        {/* Bento Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {techStack.map((tech, index) => {
            const Icon = tech.icon
            return (
              <div
                key={tech.name}
                className="group relative bg-card border border-border p-6 hover:border-foreground/50 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 border border-border group-hover:border-foreground/30 transition-colors">
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                      {tech.category}
                    </span>
                  </div>
                  <h3 className="font-mono text-lg font-semibold text-foreground mb-1">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-muted-foreground/20 group-hover:border-foreground/40 transition-colors" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
