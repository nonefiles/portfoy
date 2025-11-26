"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "tr" : "en")}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-3 py-2 
        border border-border bg-card/80 backdrop-blur-md
        hover:border-foreground/50 hover:bg-foreground/5
        transition-all duration-300 font-mono text-xs text-muted-foreground hover:text-foreground"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase">{language}</span>
    </button>
  )
}
