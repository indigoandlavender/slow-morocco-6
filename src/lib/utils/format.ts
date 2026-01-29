import { format, formatDistance, isToday, isTomorrow, isThisWeek } from 'date-fns'
import { fr, es, ar } from 'date-fns/locale'
import type { Locale } from '@/types'

const localeMap = {
  en: undefined,
  fr: fr,
  es: es,
  ar: ar,
}

export function formatDate(date: Date | string, locale: Locale = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'dd MMM yyyy', { locale: localeMap[locale] })
}

export function formatDateRange(start: Date | string, end: Date | string, locale: Locale = 'en'): string {
  const s = typeof start === 'string' ? new Date(start) : start
  const e = typeof end === 'string' ? new Date(end) : end

  if (s.getTime() === e.getTime()) {
    return formatDate(s, locale)
  }

  return `${format(s, 'dd MMM', { locale: localeMap[locale] })} - ${format(e, 'dd MMM yyyy', { locale: localeMap[locale] })}`
}

export function formatRelativeDate(date: Date | string, locale: Locale = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date

  if (isToday(d)) {
    return locale === 'fr' ? "Aujourd'hui" : locale === 'es' ? 'Hoy' : locale === 'ar' ? 'اليوم' : 'Today'
  }

  if (isTomorrow(d)) {
    return locale === 'fr' ? 'Demain' : locale === 'es' ? 'Manana' : locale === 'ar' ? 'غدا' : 'Tomorrow'
  }

  if (isThisWeek(d)) {
    return format(d, 'EEEE', { locale: localeMap[locale] })
  }

  return formatDate(d, locale)
}

export function formatPrice(amount: number, currency: 'MAD' | 'EUR' | 'USD' = 'MAD'): string {
  const symbols = { MAD: 'DH', EUR: '€', USD: '$' }
  return `${amount.toLocaleString()} ${symbols[currency]}`
}

export function formatPriceRange(min: number, max: number, currency: 'MAD' | 'EUR' | 'USD' = 'MAD'): string {
  if (min === max) {
    return formatPrice(min, currency)
  }
  const symbols = { MAD: 'DH', EUR: '€', USD: '$' }
  return `${min.toLocaleString()} - ${max.toLocaleString()} ${symbols[currency]}`
}
