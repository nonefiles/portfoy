"use client"

import { useEffect, useRef, useState } from "react"
import { FileText, Lock, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function ArchiveSection() {
  const { t } = useLanguage()
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
    <section ref={sectionRef} id="archive" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="font-mono text-sm text-muted-foreground mb-4">
            <span className="text-foreground">&gt;</span> {t.archive.command.slice(2)}
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-foreground">{t.archive.title}</h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">{t.archive.subtitle}</p>
        </div>

        {/* Archive Grid */}
        <div
          className={`grid gap-4 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {t.archive.projects.map((project, index) => (
            <a key={project.title} href={project.href} target="_blank" rel="noopener noreferrer" className="block">
              <article
                className="group relative bg-card border border-border hover:border-foreground/50 transition-all duration-300 overflow-hidden cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Top bar - File header style */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-xs text-muted-foreground">{project.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.classification === "CLASSIFIED" || project.classification === "GİZLİ" ? (
                      <Lock className="w-3 h-3 text-muted-foreground" />
                    ) : null}
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 border ${
                        project.classification === "CLASSIFIED" || project.classification === "GİZLİ"
                          ? "border-foreground/30 text-foreground"
                          : project.classification === "RESEARCH" || project.classification === "ARAŞTIRMA"
                            ? "border-muted-foreground/30 text-muted-foreground"
                            : project.classification === "OPEN SOURCE" || project.classification === "AÇIK KAYNAK"
                              ? "border-emerald-500/30 text-emerald-500"
                              : "border-muted-foreground/20 text-muted-foreground/60"
                      }`}
                    >
                      {project.classification}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-mono text-lg font-semibold text-foreground mb-2 group-hover:underline underline-offset-4">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] px-2 py-1 bg-secondary/50 text-muted-foreground"
                          >
                            [{tag}]
                          </span>
                        ))}
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground/40 group-hover:text-foreground transition-colors flex-shrink-0" />
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-foreground/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
