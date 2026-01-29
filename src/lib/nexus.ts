import type { NexusLegalData, Locale } from '@/types'

// Mock Nexus database for legal data
export const nexusLegalData: NexusLegalData = {
  privacyPolicy: {
    en: 'Privacy Policy',
    fr: 'Politique de confidentialite',
    es: 'Politica de privacidad',
    ar: 'سياسة الخصوصية',
  },
  termsOfService: {
    en: 'Terms of Service',
    fr: 'Conditions d\'utilisation',
    es: 'Terminos de servicio',
    ar: 'شروط الخدمة',
  },
  cookiePolicy: {
    en: 'Cookie Policy',
    fr: 'Politique des cookies',
    es: 'Politica de cookies',
    ar: 'سياسة ملفات تعريف الارتباط',
  },
  legalNotice: {
    en: 'Legal Notice',
    fr: 'Mentions legales',
    es: 'Aviso legal',
    ar: 'إشعار قانوني',
  },
  copyright: '2026 Festivals Morocco. All rights reserved.',
}

export function getLegalLinks(locale: Locale) {
  return [
    { href: '/privacy', label: nexusLegalData.privacyPolicy[locale] },
    { href: '/terms', label: nexusLegalData.termsOfService[locale] },
    { href: '/cookies', label: nexusLegalData.cookiePolicy[locale] },
    { href: '/legal', label: nexusLegalData.legalNotice[locale] },
  ]
}
