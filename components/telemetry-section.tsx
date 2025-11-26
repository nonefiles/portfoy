"use client"

import type React from "react"

import { useState } from "react"
import { Github, Youtube, BookOpen, Code2, ExternalLink, FileText } from "lucide-react"

function TerminalHeader({
  icon: Icon,
  label,
  color,
  isLoading = false,
}: {
  icon: React.ElementType
  label: string
  color: string
  isLoading?: boolean
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="font-mono text-sm text-muted-foreground">
          {isLoading ? `> FETCHING ${label}...` : `> ${label}`}
        </span>
      </div>
      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}

// GitHub Contribution Graph Widget
function GitHubWidget() {
  const [isHovered, setIsHovered] = useState(false)

  // Mock contribution data (52 weeks x 7 days)
  const generateContributions = () => {
    const contributions = []
    for (let week = 0; week < 52; week++) {
      const weekData = []
      for (let day = 0; day < 7; day++) {
        weekData.push(Math.floor(Math.random() * 5))
      }
      contributions.push(weekData)
    }
    return contributions
  }

  const contributions = generateContributions()

  const getIntensityClass = (level: number) => {
    const classes = ["bg-[#161b22]", "bg-[#0e4429]", "bg-[#006d32]", "bg-[#26a641]", "bg-[#39d353]"]
    return classes[level]
  }

  return (
    <a
      href="https://github.com/CumaKaradash"
      target="_blank"
      rel="noopener noreferrer"
      className="group col-span-2 row-span-2 p-6 border border-border bg-card/30 backdrop-blur-md 
        hover:border-[#39d353]/70 hover:shadow-[0_0_20px_rgba(57,211,83,0.3),inset_0_0_20px_rgba(57,211,83,0.05)] 
        transition-all duration-300 block relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(57,211,83,0.03)_2px,rgba(57,211,83,0.03)_4px)] 
        pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
      />

      <TerminalHeader icon={Github} label="GITHUB_DATA" color="text-[#39d353]" isLoading={isHovered} />

      <div className="relative z-10 mb-4">
        <div className="font-mono text-xs text-muted-foreground mb-2">// Combined: CumaKaradash + nonefiles</div>
        <div
          className="flex gap-[2px] overflow-hidden transition-all duration-300"
          style={{ filter: isHovered ? "brightness(1.3) drop-shadow(0 0 8px #39d353)" : "brightness(1)" }}
        >
          {contributions.slice(-26).map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px]">
              {week.map((day, dayIndex) => (
                <div key={dayIndex} className={`w-[10px] h-[10px] ${getIntensityClass(day)}`} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-4 font-mono text-sm">
        <div>
          <div className="text-[#39d353] text-lg font-bold">1,240</div>
          <div className="text-muted-foreground text-xs">Total Commits</div>
        </div>
        <div>
          <div className="text-[#39d353] text-lg font-bold">45</div>
          <div className="text-muted-foreground text-xs">PRs Merged</div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#39d353] rounded-full animate-pulse" />
            <span className="text-[#39d353] text-xs">ACTIVE</span>
          </div>
          <div className="text-muted-foreground text-xs">Status</div>
        </div>
      </div>

      <div className="relative z-10 mt-4 pt-4 border-t border-border/50">
        <div className="font-mono text-xs text-muted-foreground mb-2">Top Languages</div>
        <div className="flex gap-3 font-mono text-xs">
          <span className="text-yellow-400">JavaScript</span>
          <span className="text-blue-400">TypeScript</span>
          <span className="text-green-400">Python</span>
        </div>
      </div>
    </a>
  )
}

// LeetCode Donut Chart Widget
function LeetCodeWidget() {
  const [isHovered, setIsHovered] = useState(false)

  const data = {
    easy: 156,
    medium: 89,
    hard: 23,
    total: 268,
  }

  const circumference = 2 * Math.PI * 45
  const easyOffset = 0
  const mediumOffset = (data.easy / data.total) * circumference
  const hardOffset = ((data.easy + data.medium) / data.total) * circumference

  return (
    <a
      href="https://leetcode.com/u/vOiwSJATNl/"
      target="_blank"
      rel="noopener noreferrer"
      className="group col-span-1 row-span-2 p-6 border border-border bg-card/30 backdrop-blur-md 
        hover:border-cyan-500/70 hover:shadow-[0_0_20px_rgba(34,211,238,0.3),inset_0_0_20px_rgba(34,211,238,0.05)] 
        transition-all duration-300 block relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(34,211,238,0.03)_2px,rgba(34,211,238,0.03)_4px)] 
        pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
      />

      <TerminalHeader icon={Code2} label="LEETCODE_STATS" color="text-cyan-400" isLoading={isHovered} />

      <div className="relative z-10 flex justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#1a1a1a" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="8"
              strokeDasharray={`${(data.easy / data.total) * circumference} ${circumference}`}
              strokeDashoffset={-easyOffset}
              className="transition-all duration-500"
              style={{ filter: isHovered ? "drop-shadow(0 0 4px #22d3ee)" : "none" }}
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#facc15"
              strokeWidth="8"
              strokeDasharray={`${(data.medium / data.total) * circumference} ${circumference}`}
              strokeDashoffset={-mediumOffset}
              className="transition-all duration-500"
              style={{ filter: isHovered ? "drop-shadow(0 0 4px #facc15)" : "none" }}
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ef4444"
              strokeWidth="8"
              strokeDasharray={`${(data.hard / data.total) * circumference} ${circumference}`}
              strokeDashoffset={-hardOffset}
              className="transition-all duration-500"
              style={{ filter: isHovered ? "drop-shadow(0 0 4px #ef4444)" : "none" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-2xl font-bold text-foreground">{data.total}</span>
            <span className="font-mono text-xs text-muted-foreground">solved</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400" />
            Easy
          </span>
          <span className="text-cyan-400">{data.easy}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-400" />
            Medium
          </span>
          <span className="text-yellow-400">{data.medium}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500" />
            Hard
          </span>
          <span className="text-red-500">{data.hard}</span>
        </div>
      </div>

      <div className="relative z-10 mt-4 pt-4 border-t border-border/50">
        <div className="font-mono text-xs text-muted-foreground">Global Ranking</div>
        <div className="font-mono text-sm text-cyan-400 font-bold">Top 15%</div>
      </div>
    </a>
  )
}

function MediumWidget() {
  const [isHovered, setIsHovered] = useState(false)

  const articles = [
    { title: "SS7 Protocol Vulnerabilities", date: "2024.12.15", time: "14:32:08" },
    { title: "Next.js Performance Patterns", date: "2024.11.28", time: "09:15:42" },
    { title: "Zero-Trust Architecture Deep Dive", date: "2024.10.19", time: "18:47:23" },
  ]

  return (
    <a
      href="https://medium.com/@cumakaradash"
      target="_blank"
      rel="noopener noreferrer"
      className="group col-span-1 row-span-1 p-6 border border-border bg-card/30 backdrop-blur-md 
        hover:border-green-500/70 hover:shadow-[0_0_20px_rgba(34,197,94,0.3),inset_0_0_20px_rgba(34,197,94,0.05)] 
        transition-all duration-300 block relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(34,197,94,0.03)_2px,rgba(34,197,94,0.03)_4px)] 
        pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
      />

      <TerminalHeader icon={BookOpen} label="MEDIUM_LOGS" color="text-green-400" isLoading={isHovered} />

      <div className="relative z-10 space-y-2 font-mono text-xs">
        {articles.map((article, index) => (
          <div
            key={index}
            className="flex items-start gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <FileText className="w-3 h-3 text-green-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="truncate">{article.title}</div>
              <div className="text-green-400/60 text-[10px]">
                [{article.date} {article.time}]
              </div>
            </div>
          </div>
        ))}
      </div>
    </a>
  )
}

function YouTubeWidget() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href="https://youtube.com/@CumaKaradash"
      target="_blank"
      rel="noopener noreferrer"
      className="group col-span-1 row-span-1 p-6 border border-border bg-card/30 backdrop-blur-md 
        hover:border-red-500/70 hover:shadow-[0_0_20px_rgba(239,68,68,0.3),inset_0_0_20px_rgba(239,68,68,0.05)] 
        transition-all duration-300 block overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(239,68,68,0.03)_2px,rgba(239,68,68,0.03)_4px)] 
        pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
      />

      <TerminalHeader icon={Youtube} label="YOUTUBE_FEED" color="text-red-500" isLoading={isHovered} />

      <div className="relative z-10 aspect-video bg-[#0a0a0a] border border-border overflow-hidden">
        {/* Persistent scanlines for CRT effect */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)] pointer-events-none z-10" />

        <div className="absolute top-2 left-2 flex items-center gap-1 z-20">
          <span
            className={`w-2 h-2 bg-red-500 rounded-full transition-opacity ${isHovered ? "animate-pulse" : "opacity-50"}`}
          />
          <span
            className={`font-mono text-[10px] text-red-500 transition-opacity ${isHovered ? "opacity-100" : "opacity-50"}`}
          >
            REC
          </span>
        </div>

        {/* Timestamp */}
        <div className="absolute bottom-2 right-2 font-mono text-[10px] text-green-400/70 z-20">
          CAM_01 // 2024.12.26
        </div>

        {/* Mock thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-muted-foreground/30 flex items-center justify-center mx-auto mb-2">
              <div className="w-0 h-0 border-l-[8px] border-l-muted-foreground/50 border-y-[6px] border-y-transparent ml-1" />
            </div>
            <div className="font-mono text-[10px] text-muted-foreground">Tech Tutorials</div>
          </div>
        </div>
      </div>
    </a>
  )
}

function CodePenWidget() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href="https://codepen.io/cumakaradash"
      target="_blank"
      rel="noopener noreferrer"
      className="group col-span-1 row-span-1 p-6 border border-border bg-card/30 backdrop-blur-md 
        hover:border-purple-500/70 hover:shadow-[0_0_20px_rgba(168,85,247,0.3),inset_0_0_20px_rgba(168,85,247,0.05)] 
        transition-all duration-300 block relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(168,85,247,0.03)_2px,rgba(168,85,247,0.03)_4px)] 
        pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
      />

      <TerminalHeader icon={Code2} label="CODEPEN_SANDBOX" color="text-purple-400" isLoading={isHovered} />

      {/* CSS Animation Preview */}
      <div className="relative z-10 h-20 bg-[#0a0a0a] border border-border overflow-hidden flex items-center justify-center">
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-8 bg-purple-500"
              style={{
                animationName: isHovered ? "pulse" : "none",
                animationDuration: "1s",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDelay: `${i * 0.1}s`,
                opacity: isHovered ? 1 : 0.5,
                transform: isHovered ? "scaleY(1)" : "scaleY(0.4)",
                transition: "opacity 0.3s, transform 0.3s",
                boxShadow: isHovered ? "0 0 8px rgba(168,85,247,0.5)" : "none",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-3 font-mono text-xs text-muted-foreground">Frontend Experiments</div>
    </a>
  )
}

export function TelemetrySection() {
  return (
    <section id="mission-control" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="font-mono text-sm text-muted-foreground mb-2">{"// SECTION_04"}</div>
          <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight mb-4">MISSION_CONTROL</h2>
          <p className="text-muted-foreground max-w-xl">
            Live dashboard proving technical competence. Real-time metrics from connected platforms.
          </p>
        </div>

        {/* Bento Grid - responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min">
          <GitHubWidget />
          <LeetCodeWidget />
          <MediumWidget />
          <YouTubeWidget />
          <CodePenWidget />
        </div>
      </div>
    </section>
  )
}
