"use client"

import { useEffect, useRef, useState } from "react"
import { Lock, ExternalLink, Terminal, GitBranch, BookOpen, Globe, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

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

  // Projeleri filtreleme
  const publicProjects = t.archive.projects.filter(
    (p) => p.classification === "PUBLIC" || p.classification === "HERKESE AÇIK",
  )
  const researchProjects = t.archive.projects.filter(
    (p) => p.classification === "RESEARCH" || p.classification === "ARAŞTIRMA",
  )
  const ossProjects = t.archive.projects.filter(
    (p) => p.classification === "OPEN SOURCE" || p.classification === "AÇIK KAYNAK",
  )

  const streams = [
    {
      id: "public",
      titleKey: "DEPLOYMENTS",
      subtitle: "/var/www/deployments",
      data: publicProjects,
      icon: Globe,
      color: "text-blue-500",
      borderColor: "border-blue-500/20",
      hoverBorder: "hover:border-blue-500/50",
      bgColor: "bg-blue-500/5",
    },
    {
      id: "research",
      titleKey: "RESEARCH_LOGS",
      subtitle: "/var/www/research",
      data: researchProjects,
      icon: BookOpen,
      color: "text-purple-500",
      borderColor: "border-purple-500/20",
      hoverBorder: "hover:border-purple-500/50",
      bgColor: "bg-purple-500/5",
    },
    {
      id: "oss",
      titleKey: "CONTRIBUTIONS",
      subtitle: "/var/www/contributions",
      data: ossProjects,
      icon: GitBranch,
      color: "text-green-500",
      borderColor: "border-green-500/20",
      hoverBorder: "hover:border-green-500/50",
      bgColor: "bg-green-500/5",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="archive"
      className="py-24 md:py-32 px-0 bg-background relative overflow-hidden w-full"
    >
      {/* Scrollbar gizleme stili */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      {/* Arka plan deseni */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="w-full relative z-10">
        {/* Ana Başlık */}
        <div
          className={cn(
            "px-6 md:px-12 mb-16 transition-all duration-700 max-w-6xl mx-auto",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground mb-4">
            <Terminal className="w-4 h-4" />
            <span className="text-foreground">&gt;</span> {t.archive.command.slice(2)}
          </div>
          <h2 className="text-3xl md:text-5xl font-mono font-bold text-foreground uppercase tracking-tight">
            {t.archive.title} <span className="animate-pulse">_</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md">{t.archive.subtitle}</p>
        </div>

        {/* Akışlar */}
        <div className="space-y-20">
          {streams.map((stream, streamIndex) => (
            <div
              key={stream.id}
              className={cn(
                "transition-all duration-1000 delay-200",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
              )}
              style={{ transitionDelay: `${streamIndex * 200}ms` }}
            >
              {/* Akış Başlığı */}
              <div className="px-6 md:px-12 mb-6 flex items-end justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-md bg-card border", stream.borderColor)}>
                    <stream.icon className={cn("w-5 h-5", stream.color)} />
                  </div>
                  <div>
                    <h3 className="text-xl font-mono font-bold text-foreground tracking-wide">{stream.titleKey}</h3>
                    <div className="font-mono text-xs text-muted-foreground opacity-60">{stream.subtitle}</div>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  SCROLL <ArrowRight className="w-3 h-3 animate-pulse" />
                </div>
              </div>

              {/* Yatay Kaydırma Alanı */}
              <div className="flex overflow-x-auto pb-12 px-6 md:px-12 gap-6 snap-x snap-mandatory scrollbar-hide -mx-0">
                {stream.data.map((project, index) => (
                  <a
                    key={project.title}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group flex-none w-[300px] md:w-[350px] snap-center h-full",
                      "bg-card/40 backdrop-blur-sm border rounded-lg overflow-hidden",
                      "transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50",
                      stream.borderColor,
                      stream.hoverBorder,
                    )}
                  >
                    {/* Kart Başlığı / Üst Bar */}
                    <div
                      className={cn(
                        "px-4 py-3 border-b flex justify-between items-center bg-background/50",
                        stream.borderColor,
                      )}
                    >
                      <span className={cn("font-mono text-xs font-medium", stream.color)}>
                        {String(index + 1).padStart(2, "0")} // {project.date}
                      </span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Kart İçeriği */}
                    <div className="p-5 flex flex-col h-[220px] relative">
                      <div className="flex-1">
                        <h4 className="font-mono font-bold text-lg text-foreground mb-3 group-hover:underline underline-offset-4 decoration-1 truncate">
                          {project.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Etiketler */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-1.5 py-0.5 bg-secondary text-muted-foreground border border-border/50 rounded-sm"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 text-muted-foreground/60">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Alt Bilgi Şeridi */}
                    <div
                      className={cn(
                        "px-4 py-2 border-t flex justify-between items-center",
                        stream.borderColor,
                        stream.bgColor,
                      )}
                    >
                      <span
                        className={cn("text-[10px] font-mono uppercase tracking-wider font-bold", stream.color)}
                      >
                        {project.classification}
                      </span>
                      {(project.classification === "CLASSIFIED" || project.classification === "GİZLİ") && (
                        <Lock className="w-3 h-3 text-muted-foreground" />
                      )}
                    </div>
                  </a>
                ))}

                {/* Sağ tarafta boşluk bırakmak için dummy element (telefondan rahat kaydırma için) */}
                <div className="flex-none w-6 md:w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
