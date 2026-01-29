export type Locale = 'en' | 'fr' | 'es' | 'ar'

export type EventCategory =
  | 'music'
  | 'art'
  | 'film'
  | 'dance'
  | 'theatre'
  | 'heritage'
  | 'food'
  | 'literature'
  | 'craft'
  | 'spiritual'

export type MoroccoRegion =
  | 'marrakech-safi'
  | 'casablanca-settat'
  | 'fes-meknes'
  | 'tanger-tetouan-al-hoceima'
  | 'rabat-sale-kenitra'
  | 'souss-massa'
  | 'draa-tafilalet'
  | 'beni-mellal-khenifra'
  | 'oriental'
  | 'guelmim-oued-noun'
  | 'laayoune-sakia-el-hamra'
  | 'dakhla-oued-ed-dahab'

export interface Event {
  id: string
  title: Record<Locale, string>
  description: Record<Locale, string>
  category: EventCategory
  region: MoroccoRegion
  city: string
  venue: string
  startDate: string
  endDate: string
  price: {
    min: number
    max: number
    currency: 'MAD' | 'EUR' | 'USD'
    isFree: boolean
  }
  image: string
  tags: string[]
  coordinates: {
    lat: number
    lng: number
  }
  organizer: string
  website?: string
  accessibility: {
    wheelchairAccess: boolean
    signLanguage: boolean
    audioDescription: boolean
  }
}

export interface SearchFilters {
  query: string
  region?: MoroccoRegion
  categories: EventCategory[]
  dateRange?: {
    start: Date
    end: Date
  }
  priceRange?: {
    min: number
    max: number
  }
  isFree?: boolean
  accessibility?: {
    wheelchairAccess?: boolean
    signLanguage?: boolean
    audioDescription?: boolean
  }
}

export interface NexusLegalData {
  privacyPolicy: Record<Locale, string>
  termsOfService: Record<Locale, string>
  cookiePolicy: Record<Locale, string>
  legalNotice: Record<Locale, string>
  copyright: string
}
