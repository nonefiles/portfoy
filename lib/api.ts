export const revalidate = 3600 // Verileri 1 saatte bir yenile

// Tipler
export interface GitHubData {
  totalCommits: number
  prsMerged: number
  topLanguages: string[]
  contributions: {
    date: string
    count: number
    level: 0 | 1 | 2 | 3 | 4
  }[]
}

export interface LeetCodeData {
  totalSolved: number
  easy: number
  medium: number
  hard: number
  ranking: string
}

export interface MediumArticle {
  title: string
  date: string
  time: string
  link: string
}

export interface YouTubeVideo {
  title: string
  videoId: string
  publishedAt: string
  thumbnail: string
}

// GitHub Verilerini Çeken Fonksiyon
// (Jogruber'in açık kaynak GitHub Contributions API'sini kullanıyoruz - Token gerektirmez)
export async function getGitHubData(username: string): Promise<GitHubData> {
  try {
    // Contributions API
    const contributionsRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 3600 },
    })

    // Public repos için GitHub REST API (token gerektirmez)
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      next: { revalidate: 3600 },
    })

    let totalCommits = 0
    let contributions: GitHubData["contributions"] = []
    let topLanguages: string[] = []
    let prsMerged = 0

    if (contributionsRes.ok) {
      const contributionsData = await contributionsRes.json()
      const currentYear = new Date().getFullYear()
      totalCommits = (contributionsData.total[currentYear] || 0) + (contributionsData.total[currentYear - 1] || 0)
      contributions = contributionsData.contributions || []
    }

    if (reposRes.ok) {
      const reposData = await reposRes.json()
      // Dil sayımı
      const langCount: Record<string, number> = {}
      for (const repo of reposData) {
        if (repo.language) {
          langCount[repo.language] = (langCount[repo.language] || 0) + 1
        }
      }
      topLanguages = Object.entries(langCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([lang]) => lang)

      // PR sayısı tahmini (repo sayısına göre)
      prsMerged = Math.min(reposData.length * 2, 100)
    }

    return {
      totalCommits,
      prsMerged,
      topLanguages: topLanguages.length > 0 ? topLanguages : ["JavaScript", "TypeScript", "Python"],
      contributions,
    }
  } catch (error) {
    console.error("GitHub fetch error:", error)
    return {
      totalCommits: 0,
      prsMerged: 0,
      topLanguages: ["JavaScript", "TypeScript", "Python"],
      contributions: [],
    }
  }
}

// LeetCode Verilerini Çeken Fonksiyon
export async function getLeetCodeData(username: string): Promise<LeetCodeData> {
  try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, { next: { revalidate: 3600 } })
    const data = await res.json()

    if (data.status === "error") return { totalSolved: 0, easy: 0, medium: 0, hard: 0, ranking: "N/A" }

    // Ranking'i yüzdeye çevir
    const rankingPercentage = data.ranking ? `Top ${Math.round((data.ranking / 3000000) * 100)}%` : "N/A"

    return {
      totalSolved: data.totalSolved || 0,
      easy: data.easySolved || 0,
      medium: data.mediumSolved || 0,
      hard: data.hardSolved || 0,
      ranking: rankingPercentage,
    }
  } catch (error) {
    console.error("LeetCode fetch error:", error)
    return { totalSolved: 0, easy: 0, medium: 0, hard: 0, ranking: "N/A" }
  }
}

export async function getMediumPosts(username: string): Promise<MediumArticle[]> {
  try {
    // RSS to JSON converter API kullanıyoruz
    const rssUrl = `https://medium.com/feed/@${username}`
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) throw new Error("Medium RSS fetch error")

    const data = await res.json()

    if (data.status !== "ok" || !data.items) {
      return []
    }

    return data.items.slice(0, 3).map((item: { title: string; pubDate: string; link: string }) => {
      const pubDate = new Date(item.pubDate)
      return {
        title: item.title,
        date: pubDate.toISOString().split("T")[0].replace(/-/g, "."),
        time: pubDate.toTimeString().split(" ")[0],
        link: item.link,
      }
    })
  } catch (error) {
    console.error("Medium fetch error:", error)
    return []
  }
}

export async function getYouTubeVideos(channelId: string): Promise<YouTubeVideo[]> {
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) throw new Error("YouTube RSS fetch error")

    const data = await res.json()

    if (data.status !== "ok" || !data.items) {
      return []
    }

    return data.items.slice(0, 3).map((item: { title: string; link: string; pubDate: string; thumbnail?: string }) => {
      const videoId = item.link.split("v=")[1] || ""
      return {
        title: item.title,
        videoId,
        publishedAt: new Date(item.pubDate).toISOString().split("T")[0].replace(/-/g, "."),
        thumbnail: item.thumbnail || `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      }
    })
  } catch (error) {
    console.error("YouTube fetch error:", error)
    return []
  }
}
