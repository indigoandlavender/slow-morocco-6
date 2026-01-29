import type { Event, EventCategory, MoroccoRegion } from '@/types'
import { getFestivals } from './sheets'

// Transform sheet row to Event object
function transformSheetRow(row: Record<string, string>): Event {
  return {
    id: row.id,
    title: {
      en: row.title_en,
      fr: row.title_fr,
      es: row.title_es,
      ar: row.title_ar,
    },
    description: {
      en: row.description_en,
      fr: row.description_fr,
      es: row.description_es,
      ar: row.description_ar,
    },
    category: row.category as EventCategory,
    region: row.region as MoroccoRegion,
    city: row.city,
    venue: row.venue,
    startDate: row.startDate,
    endDate: row.endDate,
    price: {
      min: parseInt(row.price_min) || 0,
      max: parseInt(row.price_max) || 0,
      currency: 'MAD',
      isFree: row.price_isFree === 'TRUE' || row.price_isFree === 'true',
    },
    image: row.image,
    tags: row.tags ? row.tags.split(',').map(t => t.trim()) : [],
    coordinates: {
      lat: parseFloat(row.lat) || 0,
      lng: parseFloat(row.lng) || 0,
    },
    organizer: row.organizer,
    website: row.website || undefined,
    accessibility: {
      wheelchairAccess: row.wheelchairAccess === 'TRUE' || row.wheelchairAccess === 'true',
      signLanguage: row.signLanguage === 'TRUE' || row.signLanguage === 'true',
      audioDescription: row.audioDescription === 'TRUE' || row.audioDescription === 'true',
    },
  }
}

// Fetch events from Google Sheets
export async function getEvents(): Promise<Event[]> {
  try {
    const rows = await getFestivals()
    if (rows.length === 0) {
      console.warn('No events from sheet, using fallback')
      return mockEvents
    }
    // Filter for published events only
    const published = rows.filter(row => row.status === 'published')
    return published.map(transformSheetRow)
  } catch (error) {
    console.error('Error fetching events from sheet:', error)
    return mockEvents
  }
}

// Fetch single event by ID
export async function getEventById(id: string): Promise<Event | undefined> {
  const events = await getEvents()
  return events.find(event => event.id === id)
}

// Filter events (async version)
export async function filterEventsAsync(filters: {
  query?: string
  region?: MoroccoRegion
  categories?: EventCategory[]
  startDate?: Date
  endDate?: Date
}): Promise<Event[]> {
  let filtered = await getEvents()

  if (filters.query) {
    const q = filters.query.toLowerCase()
    filtered = filtered.filter(e =>
      e.title.en.toLowerCase().includes(q) ||
      e.description.en.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q) ||
      e.tags.some(t => t.toLowerCase().includes(q))
    )
  }

  if (filters.region) {
    filtered = filtered.filter(e => e.region === filters.region)
  }

  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(e => filters.categories!.includes(e.category))
  }

  if (filters.startDate) {
    filtered = filtered.filter(e => new Date(e.startDate) >= filters.startDate!)
  }

  if (filters.endDate) {
    filtered = filtered.filter(e => new Date(e.endDate) <= filters.endDate!)
  }

  return filtered
}

// Synchronous filter for client-side use (when events already loaded)
export function filterEvents(events: Event[], filters: {
  query?: string
  region?: MoroccoRegion
  categories?: EventCategory[]
  startDate?: Date
  endDate?: Date
}): Event[] {
  let filtered = [...events]

  if (filters.query) {
    const q = filters.query.toLowerCase()
    filtered = filtered.filter(e =>
      e.title.en.toLowerCase().includes(q) ||
      e.description.en.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q) ||
      e.tags.some(t => t.toLowerCase().includes(q))
    )
  }

  if (filters.region) {
    filtered = filtered.filter(e => e.region === filters.region)
  }

  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(e => filters.categories!.includes(e.category))
  }

  if (filters.startDate) {
    filtered = filtered.filter(e => new Date(e.startDate) >= filters.startDate!)
  }

  if (filters.endDate) {
    filtered = filtered.filter(e => new Date(e.endDate) <= filters.endDate!)
  }

  return filtered
}

// Fallback mock data
export const mockEvents: Event[] = [
  {
    id: 'gnaoua-2026',
    title: {
      en: 'Gnaoua World Music Festival',
      fr: 'Festival Gnaoua Musiques du Monde',
      es: 'Festival de Musica Gnaoua del Mundo',
      ar: 'مهرجان كناوة وموسيقى العالم',
    },
    description: {
      en: 'The iconic Gnaoua festival in Essaouira featuring traditional Gnaoua music and world artists.',
      fr: 'Le festival iconique de Gnaoua a Essaouira avec de la musique traditionnelle Gnaoua et des artistes du monde entier.',
      es: 'El iconico festival Gnaoua en Essaouira con musica tradicional Gnaoua y artistas del mundo.',
      ar: 'مهرجان كناوة الشهير في الصويرة يضم موسيقى كناوة التقليدية وفنانين من جميع أنحاء العالم.',
    },
    category: 'music',
    region: 'marrakech-safi',
    city: 'Essaouira',
    venue: 'Place Moulay Hassan',
    startDate: '2026-06-25',
    endDate: '2026-06-28',
    price: { min: 0, max: 0, currency: 'MAD', isFree: true },
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    tags: ['gnaoua', 'world music', 'essaouira', 'free'],
    coordinates: { lat: 31.5085, lng: -9.7595 },
    organizer: 'Association Yerma Gnaoua',
    website: 'https://www.festival-gnaoua.net',
    accessibility: { wheelchairAccess: true, signLanguage: false, audioDescription: false },
  },
  {
    id: 'mawazine-2026',
    title: {
      en: 'Mawazine Rhythms of the World',
      fr: 'Mawazine Rythmes du Monde',
      es: 'Mawazine Ritmos del Mundo',
      ar: 'موازين إيقاعات العالم',
    },
    description: {
      en: 'One of the largest music festivals in the world, featuring international and Moroccan artists.',
      fr: "L'un des plus grands festivals de musique au monde, avec des artistes internationaux et marocains.",
      es: 'Uno de los festivales de musica mas grandes del mundo, con artistas internacionales y marroquies.',
      ar: 'أحد أكبر المهرجانات الموسيقية في العالم، يضم فنانين دوليين ومغاربة.',
    },
    category: 'music',
    region: 'rabat-sale-kenitra',
    city: 'Rabat',
    venue: 'OLM Souissi',
    startDate: '2026-06-20',
    endDate: '2026-06-28',
    price: { min: 0, max: 500, currency: 'MAD', isFree: false },
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
    tags: ['international', 'pop', 'arabic music', 'rabat'],
    coordinates: { lat: 33.9716, lng: -6.8498 },
    organizer: 'Maroc Cultures',
    website: 'https://www.festivalmawazine.ma',
    accessibility: { wheelchairAccess: true, signLanguage: false, audioDescription: false },
  },
]

export const categoryLabels: Record<EventCategory, Record<string, string>> = {
  music: { en: 'Music', fr: 'Musique', es: 'Musica', ar: 'موسيقى' },
  art: { en: 'Art', fr: 'Art', es: 'Arte', ar: 'فن' },
  film: { en: 'Film', fr: 'Cinema', es: 'Cine', ar: 'سينما' },
  dance: { en: 'Dance', fr: 'Danse', es: 'Danza', ar: 'رقص' },
  theatre: { en: 'Theatre', fr: 'Theatre', es: 'Teatro', ar: 'مسرح' },
  heritage: { en: 'Heritage', fr: 'Patrimoine', es: 'Patrimonio', ar: 'تراث' },
  food: { en: 'Food', fr: 'Gastronomie', es: 'Gastronomia', ar: 'طعام' },
  literature: { en: 'Literature', fr: 'Litterature', es: 'Literatura', ar: 'أدب' },
  craft: { en: 'Craft', fr: 'Artisanat', es: 'Artesania', ar: 'حرف' },
  spiritual: { en: 'Spiritual', fr: 'Spirituel', es: 'Espiritual', ar: 'روحاني' },
}

export const regionLabels: Record<MoroccoRegion, Record<string, string>> = {
  'marrakech-safi': { en: 'Marrakech-Safi', fr: 'Marrakech-Safi', es: 'Marrakech-Safi', ar: 'مراكش-آسفي' },
  'casablanca-settat': { en: 'Casablanca-Settat', fr: 'Casablanca-Settat', es: 'Casablanca-Settat', ar: 'الدار البيضاء-سطات' },
  'fes-meknes': { en: 'Fes-Meknes', fr: 'Fes-Meknes', es: 'Fez-Mequinez', ar: 'فاس-مكناس' },
  'tanger-tetouan-al-hoceima': { en: 'Tanger-Tetouan-Al Hoceima', fr: 'Tanger-Tetouan-Al Hoceima', es: 'Tanger-Tetuan-Alhucemas', ar: 'طنجة-تطوان-الحسيمة' },
  'rabat-sale-kenitra': { en: 'Rabat-Sale-Kenitra', fr: 'Rabat-Sale-Kenitra', es: 'Rabat-Sale-Kenitra', ar: 'الرباط-سلا-القنيطرة' },
  'souss-massa': { en: 'Souss-Massa', fr: 'Souss-Massa', es: 'Sus-Masa', ar: 'سوس-ماسة' },
  'draa-tafilalet': { en: 'Draa-Tafilalet', fr: 'Draa-Tafilalet', es: 'Draa-Tafilalet', ar: 'درعة-تافيلالت' },
  'beni-mellal-khenifra': { en: 'Beni Mellal-Khenifra', fr: 'Beni Mellal-Khenifra', es: 'Beni Mellal-Jenifra', ar: 'بني ملال-خنيفرة' },
  'oriental': { en: 'Oriental', fr: 'Oriental', es: 'Oriental', ar: 'الشرق' },
  'guelmim-oued-noun': { en: 'Guelmim-Oued Noun', fr: 'Guelmim-Oued Noun', es: 'Guelmim-Oued Noun', ar: 'كلميم-واد نون' },
  'laayoune-sakia-el-hamra': { en: 'Laayoune-Sakia El Hamra', fr: 'Laayoune-Sakia El Hamra', es: 'El Aaiun-Saguia el Hamra', ar: 'العيون-الساقية الحمراء' },
  'dakhla-oued-ed-dahab': { en: 'Dakhla-Oued Ed-Dahab', fr: 'Dakhla-Oued Ed-Dahab', es: 'Dajla-Rio de Oro', ar: 'الداخلة-وادي الذهب' },
}
