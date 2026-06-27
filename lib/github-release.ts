const GITHUB_REPO = 'jamalesam93/Nassila'
const RELEASES_LATEST = `https://github.com/${GITHUB_REPO}/releases/latest`
const API_LATEST = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`

export type LatestRelease = {
  tagName: string
  name: string
  publishedAt: string
  downloadUrl: string | null
  htmlUrl: string
}

export async function fetchLatestRelease(): Promise<LatestRelease | null> {
  try {
    const res = await fetch(API_LATEST, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return null
    const data = (await res.json()) as {
      tag_name: string
      name: string
      published_at: string
      html_url: string
      assets: { name: string; browser_download_url: string }[]
    }
    const exe = data.assets.find((a) => /\.exe$/i.test(a.name))
    return {
      tagName: data.tag_name,
      name: data.name,
      publishedAt: data.published_at,
      downloadUrl: exe?.browser_download_url ?? null,
      htmlUrl: data.html_url,
    }
  } catch {
    return null
  }
}

export { RELEASES_LATEST, GITHUB_REPO }
