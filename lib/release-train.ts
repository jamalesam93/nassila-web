/** Public release train — user-facing only. App semver ≠ Sanad SNN checkpoints. */

export const CURRENT_RELEASE = {
  version: '1.4.0',
  codenameEn: 'Raqim Statute',
  codenameAr: 'رقيم تشريع',
  date: '2026-07-21',
} as const

export type ReleaseTrainEntry = {
  version: string
  codenameEn: string
  codenameAr: string
  status: 'shipped' | 'planned'
  summaryEn: string
  summaryAr: string
}

/** Upcoming / not yet shipped — user-visible focus only. */
export const RELEASE_TRAIN: ReleaseTrainEntry[] = [
  {
    version: '1.5.0',
    codenameEn: 'Raqim Web',
    codenameAr: 'رقيم ويب',
    status: 'planned',
    summaryEn: 'Webpage and grey-web citations; dead links; host parsers.',
    summaryAr: 'استشهادات صفحات الويب والويب الرمادي؛ روابط ميتة؛ محلّلات مضيف.',
  },
  {
    version: '1.6.0',
    codenameEn: 'Maktab Loop',
    codenameAr: 'حلقة مكتب',
    status: 'planned',
    summaryEn: 'OCR fixtures; one-upload loop; source chunking; vision/LLM path for hard Arabic PDFs.',
    summaryAr: 'fixtures OCR؛ حلقة برفع واحد؛ تقطيع المصادر؛ مسار رؤية/نموذج لـ PDF العربي الصعب.',
  },
  {
    version: '1.7.0',
    codenameEn: 'Integrity Bundle',
    codenameAr: 'حزمة النزاهة',
    status: 'planned',
    summaryEn: 'Preflight+; submission export; trust and packaged parity.',
    summaryAr: 'ما قبل الإرسال+؛ تصدير حزمة التقديم؛ ثقة وتكافؤ الإنتاج.',
  },
  {
    version: '1.8.0',
    codenameEn: 'Shahid',
    codenameAr: 'شاهد',
    status: 'planned',
    summaryEn: 'Tier 3+ gate; tables/figures; confirm-before-apply grey lit.',
    summaryAr: 'بوابة Tier 3+؛ جداول/أشكال؛ أدب رمادي بموافقة المستخدم.',
  },
]

export const SHIPPED_CODENAMES: ReleaseTrainEntry[] = [
  {
    version: '1.4.0',
    codenameEn: 'Raqim Statute',
    codenameAr: 'رقيم تشريع',
    status: 'shipped',
    summaryEn:
      'Legislation Resolve (US/UK/.gov); statute line-merge; Masdar page hints; preflight mapping coverage; submission integrity bundle export.',
    summaryAr:
      'حل تشريعات (أمريكا/بريطانيا/.gov)؛ دمج أرقام التشريع؛ تلميحات صفحة مصدر؛ تغطية ربط الاقتباسات؛ تصدير حزمة نزاهة التقديم.',
  },
  {
    version: '1.3.1',
    codenameEn: 'Maktab OCR hardening',
    codenameAr: 'تقوية OCR مكتب',
    status: 'shipped',
    summaryEn:
      'OCR packaging; Arabic Tesseract deferred (prefer DOCX); eng/fra packs only; smaller installer.',
    summaryAr:
      'تغليف OCR؛ تأجيل Tesseract العربي (يُفضَّل DOCX)؛ حزم eng/fra فقط؛ مثبّت أصغر.',
  },
  {
    version: '1.3.0',
    codenameEn: 'Sharh-lite',
    codenameAr: 'موجز شرح',
    status: 'shipped',
    summaryEn:
      'Ouroboros train through Sharh-lite: audit scheduler, quote chips, Raqim Repair/Resolve, Masdar attach, projects, evidence summary.',
    summaryAr:
      'قطار أوروبوروس حتى موجز شرح: جدولة التدقيق، رقائق الاقتباس، إصلاح/حل رقيم، إرفاق مصدر، المشاريع، ملخص الأدلة.',
  },
  {
    version: '1.2.1',
    codenameEn: 'Masdar UX',
    codenameAr: 'تفاعل مصدر',
    status: 'shipped',
    summaryEn:
      'Audit in-progress panel; DOI↔title conflict manual-only; Copy evidence and Jump to Bibliography; icon polish (I2).',
    summaryAr:
      'لوحة تدقيق أثناء التشغيل؛ تعارض DOI↔العنوان يدوياً فقط؛ نسخ الأدلة والانتقال إلى المراجع؛ تحسين الأيقونات.',
  },
  {
    version: '1.2.0',
    codenameEn: 'Masdar-lite',
    codenameAr: 'موجز مصدر',
    status: 'shipped',
    summaryEn: 'Open-access PDF text in grounding; live N/M audit progress during long runs.',
    summaryAr: 'نص PDF مفتوح الوصول في التثبيت؛ تقدم تدقيق N/M مباشر أثناء التشغيلات الطويلة.',
  },
  {
    version: '1.1.3',
    codenameEn: 'Polish',
    codenameAr: 'تهذيب',
    status: 'shipped',
    summaryEn: 'Audit/export notifications; lighter in-app Sanad setup (full guide on this website).',
    summaryAr: 'إشعارات التدقيق/التصدير؛ إعداد سند أخف داخل التطبيق (الدليل الكامل على الموقع).',
  },
  {
    version: '1.1.2',
    codenameEn: 'Raqim Bridge',
    codenameAr: 'مِعبر رقيم',
    status: 'shipped',
    summaryEn: 'Send manuscript references to Bibliography; audit from curated library.',
    summaryAr: 'نقل مراجع المخطوطة إلى رقيم؛ التدقيق من مكتبة منسّقة.',
  },
  {
    version: '1.1.1',
    codenameEn: 'Bibliography-first',
    codenameAr: 'المَراجع أولاً',
    status: 'shipped',
    summaryEn: 'Loop hints to curate references before audit; DOCX import parity.',
    summaryAr: 'تلميحات لتنظيم المراجع قبل التدقيق؛ استيراد DOCX.',
  },
  {
    version: '1.1.0',
    codenameEn: 'Sanad',
    codenameAr: 'سَنَد',
    status: 'shipped',
    summaryEn: 'Manuscript loop with L3 passage grounding and Sanad setup.',
    summaryAr: 'حلقة مخطوطة مع توثيق سند L3 وإعداد سند.',
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
