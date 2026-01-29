import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import {
  Calendar,
  MapPin,
  Ticket,
  User,
  ExternalLink,
  Share2,
  Navigation,
  Accessibility,
  ArrowLeft,
  Clock,
} from 'lucide-react'
import { getEventById, getEvents, categoryLabels, regionLabels } from '@/lib/events'
import { formatDateRange, formatPrice } from '@/lib/utils/format'
import type { Locale } from '@/types'

export const revalidate = 3600 // Revalidate every hour

type Props = {
  params: Promise<{ locale: string; id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale, id } = await params
  const event = await getEventById(id)

  if (!event) {
    return { title: 'Event Not Found' }
  }

  return {
    title: event.title[locale as Locale],
    description: event.description[locale as Locale],
    openGraph: {
      title: event.title[locale as Locale],
      description: event.description[locale as Locale],
      images: [event.image],
    },
  }
}

export async function generateStaticParams() {
  const events = await getEvents()
  const locales = ['en', 'fr', 'es', 'ar']

  return events.flatMap((event) =>
    locales.map((locale) => ({
      locale,
      id: event.id,
    }))
  )
}

export default async function EventPage({ params }: Props) {
  const { locale, id } = await params
  setRequestLocale(locale)

  const event = await getEventById(id)
  const t = await getTranslations('event')
  const tCategories = await getTranslations('categories')

  if (!event) {
    notFound()
  }

  const typedLocale = locale as Locale

  // Get similar events (same category, different event)
  const allEvents = await getEvents()
  const similarEvents = allEvents
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Back Link */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all festivals</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="aspect-[4/3] relative overflow-hidden bg-stone-100">
            <Image
              src={event.image}
              alt={event.title[typedLocale]}
              fill
              className="object-cover"
              priority
            />
            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-background/95 text-sm">
                {tCategories(event.category)}
              </span>
            </div>
            {/* Free Badge */}
            {event.price.isFree && (
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 bg-accent text-white text-sm">
                  {t('free')}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="py-4 lg:py-8">
            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              {event.title[typedLocale]}
            </h1>

            {/* Description */}
            <p className="text-muted leading-relaxed mb-10">
              {event.description[typedLocale]}
            </p>

            {/* Key Details */}
            <div className="space-y-5 mb-10">
              {/* Date */}
              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-muted mb-1">
                    {t('date')}
                  </p>
                  <p className="font-medium">
                    {formatDateRange(event.startDate, event.endDate, typedLocale)}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-muted mb-1">
                    {t('location')}
                  </p>
                  <p className="font-medium">{event.venue}</p>
                  <p className="text-sm text-muted">
                    {event.city}, {regionLabels[event.region][typedLocale]}
                  </p>
                </div>
              </div>

              {/* Price */}
              {!event.price.isFree && (
                <div className="flex items-start gap-4">
                  <Ticket className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-muted mb-1">
                      {t('price')}
                    </p>
                    <p className="font-medium">
                      {formatPrice(event.price.min, event.price.currency)}
                      {event.price.min !== event.price.max && (
                        <> – {formatPrice(event.price.max, event.price.currency)}</>
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* Organizer */}
              <div className="flex items-start gap-4">
                <User className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-muted mb-1">
                    {t('organizer')}
                  </p>
                  <p className="font-medium">{event.organizer}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {event.website && (
                <a
                  href={event.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm hover:bg-accent transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t('website')}
                </a>
              )}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${event.coordinates.lat},${event.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-border text-sm hover:border-foreground transition-colors"
              >
                <Navigation className="w-4 h-4" />
                {t('directions')}
              </a>
              <button className="flex items-center gap-2 px-6 py-3 border border-border text-sm hover:border-foreground transition-colors">
                <Share2 className="w-4 h-4" />
                {t('share')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Section */}
      {(event.accessibility.wheelchairAccess ||
        event.accessibility.signLanguage ||
        event.accessibility.audioDescription) && (
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 mt-8 border-t border-border">
          <div className="flex items-center gap-3 mb-5">
            <Accessibility className="w-5 h-5 text-accent" />
            <h2 className="text-xs tracking-[0.15em] uppercase">{t('accessibility')}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {event.accessibility.wheelchairAccess && (
              <span className="px-4 py-2 bg-sand text-sm">
                Wheelchair Access
              </span>
            )}
            {event.accessibility.signLanguage && (
              <span className="px-4 py-2 bg-sand text-sm">
                Sign Language
              </span>
            )}
            {event.accessibility.audioDescription && (
              <span className="px-4 py-2 bg-sand text-sm">
                Audio Description
              </span>
            )}
          </div>
        </div>
      )}

      {/* Similar Events */}
      {similarEvents.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 lg:px-8 py-16 mt-8 border-t border-border">
          <h2 className="font-display text-2xl mb-10">{t('similar')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarEvents.map((similarEvent) => (
              <Link 
                key={similarEvent.id} 
                href={`/event/${similarEvent.id}`}
                className="group block"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-sand mb-5">
                  <Image
                    src={similarEvent.image}
                    alt={similarEvent.title[typedLocale]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="font-display text-lg mb-2 group-hover:text-accent transition-colors">
                  {similarEvent.title[typedLocale]}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{similarEvent.city}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
