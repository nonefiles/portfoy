"use client"

import { useEffect, useRef, useState } from "react"
import { Lock, ExternalLink, Folder, Terminal, GitBranch, BookOpen, Globe } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

export function ArchiveSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
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

  // Projeleri sınıflandırmalarına göre filtrele
  const publicProjects = t.archive.projects.filter(
    (p) => p.classification === "PUBLIC" || p.classification === "HERKESE AÇIK",
  )
  const researchProjects = t.archive.projects.filter(
    (p) => p.classification === "RESEARCH" || p.classification === "ARAŞTIRMA",
  )
  const ossProjects = t.archive.projects.filter(
    (p) => p.classification === "OPEN SOURCE" || p.classification === "AÇIK KAYNAK",
  )

  const sections = [
    {
      id: "public",
      path: "/var/www/deployments",
      titleKey: "Deployments", // UI'da gösterilecek başlık
      data: publicProjects,
      icon: Globe,
      color: "text-blue-500",
      borderColor: "border-blue-500/50",
      bgColor: "bg-blue-500/5",
      hoverColor: "group-hover:text-blue-500",
      hoverBg: "hover:bg-blue-500/10",
      badgeBorder: "border-blue-500/30 text-blue-500 bg-blue-500/5",
    },
    {
      id: "research",
      path: "/var/www/research",
      titleKey: "Research Papers",
      data: researchProjects,
      icon: BookOpen,
      color: "text-purple-500",
      borderColor: "border-purple-500/50",
      bgColor: "bg-purple-500/5",
      hoverColor: "group-hover:text-purple-500",
      hoverBg: "hover:bg-purple-500/10",
      badgeBorder: "border-purple-500/30 text-purple-500 bg-purple-500/5",
    },
    {
      id: "oss",
      path: "/var/www/contributions",
      titleKey: "Open Source",
      data: ossProjects,
      icon: GitBranch,
      color: "text-green-500",
      borderColor: "border-green-500/50",
      bgColor: "bg-green-500/5",
      hoverColor: "group-hover:text-green-500",
      hoverBg: "hover:bg-green-500/10",
      badgeBorder: "border-green-500/30 text-green-500 bg-green-500/5",
    },
  ]

  return (
    <section ref={sectionRef} id="archive" className="py-24 md:py-32 px-6 bg-background relative overflow-hidden">
      {/* Background pattern specific to archive */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={cn(
            "mb-16 transition-all duration-700 text-center",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="flex items-center justify-center gap-2 font-mono text-sm text-muted-foreground mb-4">
            <Terminal className="w-4 h-4" />
            <span className="text-foreground">&gt;</span> {t.archive.command.slice(2)}
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-foreground uppercase tracking-tight">
            {t.archive.title} <span className="animate-pulse">_</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">{t.archive.subtitle}</p>
        </div>

        <div className="space-y-16">
          {sections.map((section, sectionIndex) => (
            <div
              key={section.id}
              className={cn(
                "relative transition-all duration-1000",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: `${sectionIndex * 200}ms` }}
            >
              {/* Section Label - Mobile Friendly */}
              <div className="flex items-center gap-3 mb-4 ml-1">
                <div className={cn("p-2 rounded-md bg-card border border-border", section.color)}>
                  <section.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-mono font-bold text-foreground">{section.titleKey}</h3>
                <div className="h-px flex-1 bg-border ml-4 opacity-50" />
              </div>

              {/* Terminal Window */}
              <div className="border border-border bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl">
                {/* Terminal Header Bar */}
                <div className="bg-secondary/50 border-b border-border px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <div className="flex-1 text-center font-mono text-xs text-muted-foreground opacity-70 flex items-center justify-center gap-2 select-none">
                    <section.icon className={cn("w-3 h-3", section.color)} />
                    {section.path}
                  </div>
                </div>

                {/* Table Header (Desktop) */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-border/50 bg-muted/20 font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-4">Project</div>
                  <div className="col-span-3">Classification</div>
                  <div className="col-span-2 text-right">Action</div>
                </div>

                {/* List Items */}
                <div className="divide-y divide-border/50">
                  {section.data.map((project, index) => (
                    <a
                      key={project.title}
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group block relative overflow-hidden transition-colors",
                        section.hoverBg,
                      )}
                      onMouseEnter={() => setHoveredProject(project.title)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      <div className="px-6 py-4 md:py-3 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center relative z-10">
                        {/* Mobile: Top Row with Date & Badge */}
                        <div className="md:hidden flex justify-between items-center text-xs text-muted-foreground font-mono mb-1">
                          <span>{project.date}</span>
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] border",
                              section.badgeBorder
                            )}
                          >
                            {project.classification}
                          </span>
                        </div>

                        {/* ID Column */}
                        <div className={cn("hidden md:block col-span-1 font-mono text-xs text-muted-foreground/50 transition-colors", section.hoverColor)}>
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* Date Column */}
                        <div className="hidden md:block col-span-2 font-mono text-xs text-muted-foreground">
                          {project.date}
                        </div>

                        {/* Project Title Column */}
                        <div className="col-span-12 md:col-span-4">
                          <div className="flex items-center gap-2">
                            <Folder className={cn("w-4 h-4 text-muted-foreground transition-colors flex-shrink-0", section.hoverColor)} />
                            <span className={cn("font-medium text-foreground transition-colors truncate", section.hoverColor)}>
                              {project.title}
                            </span>
                          </div>
                          {/* Description - Visible on mobile */}
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 md:hidden">
                            {project.description}
                          </p>
                        </div>

                        {/* Classification Badge Column */}
                        <div className="hidden md:flex col-span-3 items-center gap-2">
                          <span
                            className={cn(
                              "px-2 py-0.5 text-[10px] font-mono border transition-all duration-300",
                              section.badgeBorder
                            )}
                          >
                            {project.classification}
                          </span>
                          {project.classification === "CLASSIFIED" ||
                            (project.classification === "GİZLİ" && <Lock className="w-3 h-3 text-muted-foreground" />)}
                        </div>

                        {/* Action Column */}
                        <div className="hidden md:flex col-span-2 justify-end">
                          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                      </div>

                      {/* Expanded Detail View (Desktop Hover) */}
                      <div
                        className={cn(
                          "hidden md:block overflow-hidden transition-all duration-300 ease-in-out px-6 ml-[25%]",
                          hoveredProject === project.title ? "max-h-24 opacity-100 pb-4" : "max-h-0 opacity-0",
                        )}
                      >
                        <div className={cn("border-l-2 pl-4", section.borderColor)}>
                          <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                          <div className="flex gap-2">
                            {project.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-mono px-1.5 py-0.5 bg-secondary/80 text-secondary-foreground border border-border/50 rounded-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Hover Highlight Line */}
                      <div className={cn("absolute left-0 top-0 bottom-0 w-1 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top", section.bgColor.replace("/5", ""))} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
