import { fetchLatestRelease, RELEASES_LATEST } from '@/lib/github-release'

type Props = {
  unavailableLabel: string
}

export async function LiveReleaseBadge({ unavailableLabel }: Props) {
  const release = await fetchLatestRelease()

  if (!release) {
    return (
      <span className="text-sm text-muted-foreground">{unavailableLabel}</span>
    )
  }

  const href = release.downloadUrl ?? RELEASES_LATEST

  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:border-primary"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="font-medium text-primary">{release.tagName}</span>
      <span className="text-muted-foreground">{release.name}</span>
    </a>
  )
}

export function LiveReleaseBadgeSkeleton({ label }: { label: string }) {
  return <span className="text-sm text-muted-foreground">{label}</span>
}