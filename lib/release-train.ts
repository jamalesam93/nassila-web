/** Public release train — user-facing only. App semver ≠ Sanad SNN checkpoints. */

export const CURRENT_RELEASE = {
  version: '1.1.2',
  codenameEn: 'Raqim Bridge',
  codenameAr: 'جسر Raqim',
  date: '2026-06-27',
} as const

export type ReleaseTrainEntry = {
  version: string
  codenameEn: string
  codenameAr: string
  status: 'shipped' | 'planned'
  summaryEn: string
  summaryAr: string
}

export const RELEASE_TRAIN: ReleaseTrainEntry[] = [
  {
    version: '1.1.3',
    codenameEn: 'Polish',
    codenameAr: 'Polish',
    status: 'planned',
    summaryEn: 'Audit/export notifications; lighter in-app Sanad setup (full guide on this website).',
    summaryAr: 'إشعارات التدقيق/التصدير؛ إعداد سند أخف داخل التطبيق (الدليل الكامل على الموقع).',
  },
  {
    version: '1.2.0',
    codenameEn: 'Masdar-lite',
    codenameAr: 'Masdar-lite',
    status: 'planned',
    summaryEn: 'Open-access PDF text in grounding; live N/M audit progress during long runs.',
    summaryAr: 'نص PDF مفتوح الوصول في التثبيت؛ تقدم تدقيق N/M مباشر أثناء التشغيلات الطويلة.',
  },
  {
    version: '1.2.1',
    codenameEn: 'Masdar UX',
    codenameAr: 'Masdar UX',
    status: 'planned',
    summaryEn: 'Attach your own PDF per reference; quote-verification chips; more audit shortcuts.',
    summaryAr: 'إرفاق PDF خاص بك لكل مرجع؛ رقائق التحقق من الاقتباس؛ اختصارات تدقيق إضافية.',
  },
  {
    version: '1.2.2',
    codenameEn: 'Throughput',
    codenameAr: 'Throughput',
    status: 'planned',
    summaryEn: 'Faster manuscript audits with sensible limits for registry vs local LLM work.',
    summaryAr: 'تدقيق مخطوطة أسرع مع حدود معقولة لعمل السجل مقابل LLM المحلي.',
  },
  {
    version: '1.3.0',
    codenameEn: 'Sharh-lite',
    codenameAr: 'Sharh-lite',
    status: 'planned',
    summaryEn: 'Clearer deterministic explanations; Help menu deep links to documentation.',
    summaryAr: 'شروح حتمية أوضح؛ روابط Help إلى التوثيق.',
  },
]

export const SHIPPED_CODENAMES: ReleaseTrainEntry[] = [
  {
    version: '1.1.2',
    codenameEn: 'Raqim Bridge',
    codenameAr: 'جسر Raqim',
    status: 'shipped',
    summaryEn: 'Send manuscript references to Bibliography; audit from curated library.',
    summaryAr: 'إرسال مراجع المخطوطة إلى Bibliography؛ التدقيق من مكتبة منسّقة.',
  },
  {
    version: '1.1.1',
    codenameEn: 'Bibliography-first',
    codenameAr: 'Bibliography-first',
    status: 'shipped',
    summaryEn: 'Loop hints to curate references before audit; DOCX import parity.',
    summaryAr: 'تلميحات لتنظيم المراجع قبل التدقيق؛ استيراد DOCX.',
  },
  {
    version: '1.1.0',
    codenameEn: 'Sanad',
    codenameAr: 'Sanad',
    status: 'shipped',
    summaryEn: 'Manuscript loop with L3 passage grounding and Sanad setup.',
    summaryAr: 'حلقة مخطوطة مع تثبيت المقتطفات L3 وإعداد Sanad.',
  },
]

export type SanadCheckpoint = {
  id: string
  tierEn: string
  tierAr: string
  modelId: string
  hfUrl: string
  vram: string
  roleEn: string
  roleAr: string
}

/** S = Sanad checkpoint generation. Independent of app semver (e.g. app 1.1.2 ≠ S12). */
export const SANAD_CHECKPOINTS: SanadCheckpoint[] = [
  {
    id: 'S12',
    tierEn: 'E4B default',
    tierAr: 'E4B افتراضي',
    modelId: 'nassila-sanad-e4b',
    hfUrl: 'https://huggingface.co/QinEmPeRoR93/nassila-sanad-e4b',
    vram: '~8 GB',
    roleEn: 'Default tier in Settings; laptop-friendly',
    roleAr: 'المستوى الافتراضي في الإعدادات؛ مناسب للحاسوب المحمول',
  },
  {
    id: 'S14',
    tierEn: '12B quality',
    tierAr: '12B جودة',
    modelId: 'nassila-sanad-12b',
    hfUrl: 'https://huggingface.co/QinEmPeRoR93/nassila-sanad-12b',
    vram: '~12 GB+',
    roleEn: 'Quality tier chip when you have sufficient VRAM',
    roleAr: 'رقاقة مستوى الجودة عند توفر VRAM كافٍ',
  },
]
