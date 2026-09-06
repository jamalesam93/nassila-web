/** Public release train — user-facing only. App semver ≠ Sanad SNN checkpoints. */

export const CURRENT_RELEASE = {
  version: '2.0.0',
  codenameEn: 'MaktabOCR + Shahid',
  codenameAr: 'مكتب OCR + شاهد',
  date: '2026-09-06',
  workers: {
    maktabOcr: 'live',
    shahid: 'live',
  },
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
    version: '2.1.0',
    codenameEn: 'Sanad Arabic',
    codenameAr: 'سند عربي',
    status: 'planned',
    summaryEn: 'FT-7 Arabic train slice + holdout; Arabic-aware mapping; separate AR metrics.',
    summaryAr: 'شريحة تدريب عربية FT-7 + holdout؛ ربط عربي؛ مقاييس AR منفصلة.',
  },
]

export const SHIPPED_CODENAMES: ReleaseTrainEntry[] = [
  {
    version: '2.0.0',
    codenameEn: 'MaktabOCR + Shahid',
    codenameAr: 'مكتب OCR + شاهد',
    status: 'shipped',
    summaryEn:
      'Maktab OCR with native PDF inspection and selective scan fallback; Shahid multimodal table and figure evidence extraction; verified end-to-end grounding with offline stability.',
    summaryAr:
      'OCR مكتب مع الفحص الأصلي لملفات PDF والرجوع التلقائي للمسح الضوئي؛ استخراج أدلة الجداول والأشكال عبر شاهد متعدد الوسائط؛ تحقق التوثيق المتكامل مع استقرار تام دون اتصال.',
  },
  {
    version: '1.10.1',
    codenameEn: 'Packaged network parity',
    codenameAr: 'تماسك النسخة المعبأة',
    status: 'shipped',
    summaryEn:
      'Keep-my-title / DOI lookup / autocorrect online step / input-bar Resolve now work in installed builds (registry calls moved to main process); predatory list update reports failure.',
    summaryAr:
      'أبقِ عنواني / البحث عن DOI / خطوة التحسين أونلاين / زر Resolve في شريط الإدخال تعمل الآن في النسخة المثبّتة (نُقلت استدعاءات السجلات إلى العملية الرئيسية)؛ وتحديث قائمة المجلات المفترسة يبلّغ عن الفشل.',
  },
  {
    version: '1.10.0',
    codenameEn: 'Masdar Papers',
    codenameAr: 'أوراق مصدر',
    status: 'shipped',
    summaryEn:
      'Wayback availability-gated archive links; bibliography dedupe; folder-scan PDF attach with review list + targeted re-audit; Raqim Resolve works again for titles and URLs.',
    summaryAr:
      'روابط أرشيف Wayback عند توفر لقطة؛ دمج المراجع المكررة؛ إرفاق PDF من مجلد بقائمة مراجعة + إعادة تدقيق موجّه؛ حل رقيم يعمل من جديد للعناوين والروابط.',
  },
  {
    version: '1.8.0',
    codenameEn: 'Sanad 9B',
    codenameAr: 'سند 9B',
    status: 'shipped',
    summaryEn:
      'Sole-tier Sanad registry (9B FT-5 default); Qwen3.5 thinking handling (no-thinking template on the web, token budget, in-app repair).',
    summaryAr:
      'سجل سند بمستوى واحد (الافتراضي 9B FT-5)؛ معالجة تفكير Qwen3.5 (قالب بلا تفكير على الويب، ميزانية رموز، إصلاح داخل التطبيق).',
  },
  {
    version: '1.7.0',
    codenameEn: 'Integrity Bundle',
    codenameAr: 'حزمة النزاهة',
    status: 'shipped',
    summaryEn:
      'Structured DOCX manuscript import; dirty-close warning; preflight mapping breakdown; audit rate limiting and mid-LLM cancel.',
    summaryAr:
      'استيراد مخطوطة DOCX منظم؛ تحذير عند الإغلاق مع عمل غير محفوظ؛ تفصيل ربط الاقتباسات في مرحلة ما قبل الإرسال؛ تحديد معدل التدقيق وإلغاء LLM في منتصف التنفيذ.',
  },
  {
    version: '1.6.0',
    codenameEn: 'Maktab Loop',
    codenameAr: 'حلقة مكتب',
    status: 'shipped',
    summaryEn:
      'OCR golden fixtures; one-upload loop; source chunking; cache controls; deterministic Sharh summaries; source-PDF attach.',
    summaryAr:
      'نماذج OCR ذهبية؛ حلقة برفع واحد؛ تقطيع المصادر؛ ضوابط التخزين المؤقت؛ ملخصات شرح حتمية؛ إرفاق PDF المصدر.',
  },
  {
    version: '1.5.0',
    codenameEn: 'Raqim Web',
    codenameAr: 'رقيم ويب',
    status: 'shipped',
    summaryEn:
      'Webpage metadata resolver (OG, DC, Schema.org); host extractors (GitHub, Kaggle, HF, YouTube, Substack); Wayback Machine archive; Tier A Rust WASM engine.',
    summaryAr:
      'محلّل البيانات الوصفية لصفحات الويب (OG, DC, Schema.org)؛ مستخرجات المضيفين (GitHub, Kaggle, HF, YouTube, Substack)؛ أرشيف وFormat Wayback Machine؛ محرك Rust WASM Tier A.',
  },
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

/** S/FT = Sanad checkpoint labels. Independent of app semver (e.g. app 1.8.0 ≠ FT-6). */
export const SANAD_CHECKPOINTS: SanadCheckpoint[] = [
  {
    id: 'FT-6',
    tierEn: 'Sole tier · 9B (Qwen 3.5)',
    tierAr: 'المستوى الوحيد · 9B (Qwen 3.5)',
    modelId: 'nassila-sanad-9b',
    hfUrl: 'https://huggingface.co/QinEmPeRoR93/nassila-sanad-9b',
    vram: '~6.9 GB (Q6_K)',
    roleEn: 'Single Sanad model — FT-6 / v119; pick your quant (6 default + 6 MTP GGUFs)',
    roleAr: 'نموذج سند الوحيد — FT-6 / v119؛ اختر الكم بنفسك (6 افتراضي + 6 MTP)',
  },
  {
    id: 'S15',
    tierEn: '4B (Retired)',
    tierAr: '4B (متقاعد)',
    modelId: 'nassila-sanad-4b',
    hfUrl: 'https://huggingface.co/QinEmPeRoR93/nassila-sanad-4b',
    vram: '~3.3 GB',
    roleEn: 'Retired — abstract-era default tier',
    roleAr: 'متقاعد — المستوى الافتراضي من عصر الملخصات',
  },
  {
    id: 'S14',
    tierEn: '12B (Retired)',
    tierAr: '12B (متقاعد)',
    modelId: 'nassila-sanad-12b',
    hfUrl: 'https://huggingface.co/QinEmPeRoR93/nassila-sanad-12b',
    vram: '~9.1 GB',
    roleEn: 'Retired — abstract-era quality tier',
    roleAr: 'متقاعد — مستوى الجودة من عصر الملخصات',
  },
  {
    id: 'S12',
    tierEn: 'E4B (Retired)',
    tierAr: 'E4B (متقاعد)',
    modelId: 'nassila-sanad-e4b',
    hfUrl: 'https://huggingface.co/QinEmPeRoR93/nassila-sanad-e4b',
    vram: '~5.8 GB',
    roleEn: 'Retired — legacy default-tier model',
    roleAr: 'متقاعد — نموذج المستوى الافتراضي القديم',
  },
]
