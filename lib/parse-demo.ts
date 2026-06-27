export type ParsedCitationDemo = {
  type?: string
  title?: string
  authors?: string
  year?: string
  doi?: string
  journal?: string
  url?: string
}

const DOI_RE = /\b(10\.\d{4,}\/[^\s,;)]+)/i
const URL_RE = /https?:\/\/[^\s,;)]+/i
const VANCOUVER_TAIL = /\b(19|20)\d{2}\b[^;\n]{0,80};\s*(\d+)/

export function parseCitationDemo(raw: string): ParsedCitationDemo | null {
  const text = raw.trim()
  if (text.length < 12) return null

  const result: ParsedCitationDemo = {}

  const doiMatch = text.match(DOI_RE)
  if (doiMatch) {
    result.doi = doiMatch[1].replace(/[.)]+$/, '')
  }

  const urlMatch = text.match(URL_RE)
  if (urlMatch) {
    result.url = urlMatch[0].replace(/[.)]+$/, '')
  }

  const years = [...text.matchAll(/\b(1[5-9]\d{2}|20[0-3]\d)\b/g)]
  if (years.length > 0) {
    const vancouver = text.match(VANCOUVER_TAIL)
    result.year = vancouver?.[1] ?? years[years.length - 1][1]
  }

  if (/\b(?:thesis|dissertation)\b/i.test(text)) {
    result.type = 'thesis'
  } else if (result.doi || VANCOUVER_TAIL.test(text) || /\bvol\.?\s*\d/i.test(text)) {
    result.type = 'article-journal'
  } else if (result.url && !result.doi) {
    result.type = 'webpage'
  } else if (/\b(?:press|publisher|verlag)\b/i.test(text)) {
    result.type = 'book'
  } else {
    result.type = 'article-journal'
  }

  const authorPart = text.split(/\.\s+(?=[A-Z\u0600-\u06FF])/).at(0) ?? text
  const authorCandidates = authorPart
    .replace(/^\s*\[?\d+[\].)]\s*/, '')
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1 && s.length < 80)
  if (authorCandidates.length > 0 && /^[A-Z\u0600-\u06FF]/.test(authorCandidates[0])) {
    result.authors = authorCandidates.slice(0, 4).join(', ')
  }

  const afterAuthors = text.replace(authorPart, '').trim()
  const titleMatch = afterAuthors.match(/^\.?\s*([^.]+(?:\.[^0-9]{3,})?)\./)
  if (titleMatch) {
    result.title = titleMatch[1].trim()
  } else {
    const words = afterAuthors.split(/\.\s+/)
    const candidate = words.find((w) => w.length > 8 && !DOI_RE.test(w) && !URL_RE.test(w))
    if (candidate) result.title = candidate.replace(/\.$/, '').trim()
  }

  const journalMatch = text.match(
    /\.\s+([A-Z][A-Za-z&\s]{2,40})\.\s+(?:19|20)\d{2}/,
  )
  if (journalMatch) {
    result.journal = journalMatch[1].trim()
  }

  const hasSignal =
    result.doi || result.title || result.authors || result.year || result.url
  return hasSignal ? result : null
}

export const DEMO_EXAMPLES = [
  'Smith J, Doe A. Climate adaptation in coastal cities. Nature. 2020;586(7829):123-128. doi:10.1038/s41586-020-1234-5',
  'WHO. Global tuberculosis report 2023. Geneva: World Health Organization; 2023.',
  'https://doi.org/10.1101/2024.01.15.24301234',
]
