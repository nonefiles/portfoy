"use client"

import { Github, Linkedin, BookOpen, Youtube } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

const socialLinksData = [
  {
    key: "linkedin",
    href: "https://linkedin.com/in/cumakaradash",
    icon: Linkedin,
    color: "hover:text-blue-400 hover:border-blue-400/50",
  },
  {
    key: "github",
    href: "https://github.com/CumaKaradash",
    icon: Github,
    color: "hover:text-[#39d353] hover:border-[#39d353]/50",
  },
  {
    key: "medium",
    href: "https://medium.com/@cumakaradash",
    icon: BookOpen,
    color: "hover:text-green-400 hover:border-green-400/50",
  },
  {
    key: "youtube",
    href: "https://youtube.com/@CumaKaradash",
    icon: Youtube,
    color: "hover:text-red-500 hover:border-red-500/50",
  },
]

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer id="footer" className="py-16 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="font-mono text-sm text-muted-foreground mb-4">{t.footer.socialLabel}</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialLinksData.map((link) => {
              const Icon = link.icon
              const linkTranslation = t.footer.links[link.key as keyof typeof t.footer.links]
              return (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-4 border border-border bg-card/30 backdrop-blur-sm transition-all duration-300 ${link.color}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-inherit transition-colors" />
                    <div>
                      <div className="font-mono text-sm text-foreground">{linkTranslation.name}</div>
                      <div className="font-mono text-xs text-muted-foreground">{linkTranslation.label}</div>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border/50">
          {/* Logo / Name */}
          <div className="font-mono text-sm text-muted-foreground">
            <span className="text-foreground">&gt;</span> cuma.karadas
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>{t.footer.status}</span>
          </div>

          {/* Copyright */}
          <div className="font-mono text-xs text-muted-foreground/60">© 2025 Cuma Karadaş</div>
        </div>
      </div>
    </footer>
  )
}
