import { Github, Linkedin, BookOpen } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    name: "Medium",
    href: "https://medium.com",
    icon: BookOpen,
  },
]

export function Footer() {
  return (
    <footer id="footer" className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Name */}
          <div className="font-mono text-sm text-muted-foreground">
            <span className="text-foreground">&gt;</span> cuma.karadas
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>

          {/* Copyright */}
          <div className="font-mono text-xs text-muted-foreground/60">© 2025 Cuma Karadaş</div>
        </div>
      </div>
    </footer>
  )
}
