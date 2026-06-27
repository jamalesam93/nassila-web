'use client'

import Image from 'next/image'
import { useEffect, useState, useSyncExternalStore } from 'react'

const SHOWREEL_VIDEO = '/media/showreel.mp4'
const SHOWREEL_POSTER = '/media/banner.png'

const FRAMES = [
  { src: '/media/ui-bibliography.png', alt: 'Nassila bibliography workspace with verify status' },
  { src: '/media/ui-loop.png', alt: 'Manuscript Ouroboros loop audit view' },
  { src: '/media/banner.png', alt: 'Nassila desktop app' },
]

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function AppShowreel() {
  const [index, setIndex] = useState(0)
  const [videoFailed, setVideoFailed] = useState(false)
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)

  useEffect(() => {
    if (reduceMotion || !videoFailed) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % FRAMES.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [reduceMotion, videoFailed])

  const useVideo = !reduceMotion && !videoFailed

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
        <span className="ms-2 text-xs text-muted-foreground">Nassila</span>
      </div>
      <div className="relative aspect-[16/10] bg-background">
        {useVideo ? (
          <video
            className="h-full w-full object-cover object-top"
            autoPlay
            loop
            muted
            playsInline
            poster={SHOWREEL_POSTER}
            onError={() => setVideoFailed(true)}
          >
            <source src={SHOWREEL_VIDEO} type="video/mp4" />
          </video>
        ) : (
          FRAMES.map((f, i) => (
            <Image
              key={f.src}
              src={f.src}
              alt={f.alt}
              fill
              className={`object-cover object-top transition-opacity duration-700 ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 720px"
            />
          ))
        )}
      </div>
    </div>
  )
}
