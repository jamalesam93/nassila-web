'use client'

import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { DEMO_EXAMPLES, parseCitationDemo } from '@/lib/parse-demo'

export function TryCitationDemo() {
  const t = useTranslations('home')
  const pt = useTranslations('parse')
  const [input, setInput] = useState(DEMO_EXAMPLES[0])
  const parsed = useMemo(() => parseCitationDemo(input), [input])

  const fields: { key: keyof NonNullable<ReturnType<typeof parseCitationDemo>>; label: string }[] = [
    { key: 'type', label: pt('type') },
    { key: 'title', label: pt('title') },
    { key: 'authors', label: pt('authors') },
    { key: 'year', label: pt('year') },
    { key: 'journal', label: pt('journal') },
    { key: 'doi', label: pt('doi') },
    { key: 'url', label: pt('url') },
  ]

  return (
    <section className="border-y border-border bg-muted/40 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-xl font-semibold">{t('tryIt')}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t('tryItHint')}</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={5}
              className="font-citation w-full rounded-md border border-input bg-card px-3 py-2 text-sm leading-relaxed"
              placeholder={t('tryPlaceholder')}
              spellCheck={false}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {DEMO_EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInput(ex)}
                  className="rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  Example {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-border bg-card p-4">
            <p className="text-sm font-medium">{t('parsedFields')}</p>
            {!parsed ? (
              <p className="mt-3 text-sm text-muted-foreground">{t('noParse')}</p>
            ) : (
              <dl className="mt-3 space-y-2 text-sm">
                {fields.map(({ key, label }) =>
                  parsed[key] ? (
                    <div key={key} className="grid grid-cols-[7rem_1fr] gap-2">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className={`font-citation break-words ${key === 'doi' || key === 'url' ? 'ltr-isolate' : ''}`}>
                        {parsed[key]}
                      </dd>
                    </div>
                  ) : null,
                )}
              </dl>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
