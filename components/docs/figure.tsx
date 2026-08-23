import Image from 'next/image'

type FigureProps = {
  src: string
  alt: string
  caption?: string
}

export function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className="mb-6 overflow-hidden rounded-lg border border-border bg-card">
      <Image
        src={src}
        alt={alt}
        width={1280}
        height={800}
        sizes="(max-width: 768px) 100vw, 768px"
        className="h-auto w-full"
      />
      {caption ? (
        <figcaption className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
