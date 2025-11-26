import { NextResponse } from "next/server"
import { getGitHubData, getLeetCodeData, getMediumPosts, getYouTubeVideos } from "@/lib/api"

// 1 saatte bir yenilenir
export const revalidate = 3600

// YouTube channel ID'nizi bulmak için: https://www.youtube.com/account_advanced
const YOUTUBE_CHANNEL_ID = "" // Örn: "UC_x5XG1OV2P6uZZ5FSM9Ttw"

export async function GET() {
  try {
    const githubPromise = getGitHubData("CumaKaradash").catch((e) => {
      console.error("GitHub API error:", e)
      return null
    })

    const leetcodePromise = getLeetCodeData("vOiwSJATNl").catch((e) => {
      console.error("LeetCode API error:", e)
      return null
    })

    const mediumPromise = getMediumPosts("cumakaradash").catch((e) => {
      console.error("Medium API error:", e)
      return []
    })

    const youtubePromise = YOUTUBE_CHANNEL_ID
      ? getYouTubeVideos(YOUTUBE_CHANNEL_ID).catch((e) => {
          console.error("YouTube API error:", e)
          return []
        })
      : Promise.resolve([])

    const [github, leetcode, medium, youtube] = await Promise.all([
      githubPromise,
      leetcodePromise,
      mediumPromise,
      youtubePromise,
    ])

    return NextResponse.json({
      github,
      leetcode,
      medium,
      youtube: youtube[0] || null,
    })
  } catch (error) {
    console.error("Telemetry API error:", error)
    return NextResponse.json({ error: "Failed to fetch telemetry data" }, { status: 500 })
  }
}
