'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { Search, MapPin, Calendar, X, ChevronDown } from 'lucide-react'
import { filterEvents, regionLabels } from '@/lib/events'
import { formatDateRange } from '@/lib/utils/format'
import type { MoroccoRegion, EventCategory, Locale, Event } from '@/types'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiaW5kaWdvYW5kbGF2ZW5kZXIiLCJhIjoiY21kN3B0OTZvMGllNjJpcXY0MnZlZHVlciJ9.1-jV-Pze3d7HZseOAhmkCg'

interface HomeClientProps {
  initialEvents: Event[]
}

export default function HomeClient({ initialEvents }: HomeClientProps) {
  const tCat = useTranslations('categories')
  const params = useParams()
  const locale = (params.locale as Locale) || 'en'

  const [query, setQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<MoroccoRegion | undefined>()
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | undefined>()
  const [showMap, setShowMap] = useState(false)

  const filteredEvents = useMemo(() => {
    return filterEvents(initialEvents, {
      query,
      region: selectedRegion,
      categories: selectedCategory ? [selectedCategory] : undefined,
    })
  }, [initialEvents, query, selectedRegion, selectedCategory])

  const hasActiveFilters = query || selectedRegion || selectedCategory

  const clearFilters = () => {
    setQuery('')
    setSelectedRegion(undefined)
    setSelectedCategory(undefined)
  }

  const categories: { value: EventCategory; label: string }[] = [
    { value: 'music', label: 'Music' },
    { value: 'art', label: 'Art' },
    { value: 'film', label: 'Film' },
    { value: 'heritage', label: 'Heritage' },
    { value: 'food', label: 'Food' },
    { value: 'spiritual', label: 'Spiritual' },
  ]

  const regions: MoroccoRegion[] = [
    'marrakech-safi', 'casablanca-settat', 'fes-meknes', 
    'tanger-tetouan-al-hoceima', 'rabat-sale-kenitra', 'souss-massa',
    'draa-tafilalet'
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      {/* Search Hero */}
      <section style={{ paddingTop: '200px', paddingBottom: '120px' }}>
        <div className="container-narrow">
          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h1 
              className="font-display" 
              style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
                marginBottom: '24px',
                lineHeight: 1.1 
              }}
            >
              Find Events in Morocco
            </h1>
            <p style={{ color: 'var(--color-muted)', fontSize: '1.25rem' }}>
              Festivals, exhibitions, and cultural celebrations
            </p>
          </div>

          {/* Search Box */}
          <div style={{ marginBottom: '56px' }}>
            <div 
              style={{ 
                position: 'relative', 
                backgroundColor: 'white', 
                border: '1px solid var(--color-border)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}
            >
              <Search 
                style={{ 
                  position: 'absolute', 
                  left: '24px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: 'var(--color-muted)'
                }} 
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search festivals, cities, artists..."
                style={{
                  width: '100%',
                  padding: '24px 56px 24px 64px',
                  fontSize: '1.125rem',
                  border: 'none',
                  background: 'transparent',
                  outline: 'none'
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    padding: '8px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-muted)'
                  }}
                >
                  <X style={{ width: '20px', height: '20px' }} />
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(
                  selectedCategory === cat.value ? undefined : cat.value
                )}
                style={{
                  padding: '12px 24px',
                  fontSize: '0.875rem',
                  border: selectedCategory === cat.value ? 'none' : '1px solid var(--color-border)',
                  backgroundColor: selectedCategory === cat.value ? 'var(--color-foreground)' : 'white',
                  color: selectedCategory === cat.value ? 'white' : 'var(--color-foreground)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat.label}
              </button>
            ))}

            <div style={{ position: 'relative' }}>
              <select
                value={selectedRegion || ''}
                onChange={(e) => setSelectedRegion(e.target.value as MoroccoRegion || undefined)}
                style={{
                  appearance: 'none',
                  padding: '12px 48px 12px 24px',
                  fontSize: '0.875rem',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {regionLabels[region][locale]}
                  </option>
                ))}
              </select>
              <ChevronDown 
                style={{ 
                  position: 'absolute', 
                  right: '16px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: 'var(--color-muted)',
                  pointerEvents: 'none'
                }} 
              />
            </div>

            <button
              onClick={() => setShowMap(!showMap)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                fontSize: '0.875rem',
                border: showMap ? 'none' : '1px solid var(--color-border)',
                backgroundColor: showMap ? 'var(--color-foreground)' : 'white',
                color: showMap ? 'white' : 'var(--color-foreground)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <MapPin style={{ width: '16px', height: '16px' }} />
              Map
            </button>
          </div>

          {hasActiveFilters && (
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button
                onClick={clearFilters}
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section style={{ paddingBottom: '160px' }}>
        <div className="container-wide">
          {/* Results Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '64px',
            paddingBottom: '24px',
            borderBottom: '1px solid var(--color-border)'
          }}>
            <p style={{ color: 'var(--color-muted)' }}>
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Map View */}
          {showMap && (
            <div style={{ marginBottom: '64px' }}>
              <MapView events={filteredEvents} locale={locale} />
            </div>
          )}

          {/* Results Grid */}
          {filteredEvents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: 'var(--color-muted)', fontSize: '1.125rem', marginBottom: '16px' }}>
                No events match your search
              </p>
              <button
                onClick={clearFilters}
                style={{
                  color: 'var(--color-accent)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
                gap: '64px 48px'
              }}
            >
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function EventCard({ event, locale }: { event: Event; locale: Locale }) {
  const tCat = useTranslations('categories')
  
  return (
    <Link href={`/event/${event.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
      {/* Image */}
      <div 
        style={{ 
          position: 'relative', 
          aspectRatio: '3/2', 
          overflow: 'hidden',
          backgroundColor: 'var(--color-sand)',
          marginBottom: '24px'
        }}
      >
        <Image
          src={event.image}
          alt={event.title[locale]}
          fill
          style={{ objectFit: 'cover', transition: 'transform 0.6s' }}
          sizes="(max-width: 768px) 100vw, 50vw"
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        {/* Category */}
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <span 
            style={{ 
              padding: '8px 16px', 
              backgroundColor: 'rgba(255,255,255,0.9)', 
              backdropFilter: 'blur(4px)',
              fontSize: '0.75rem'
            }}
          >
            {tCat(event.category)}
          </span>
        </div>
        {/* Free badge */}
        {event.price.isFree && (
          <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
            <span 
              style={{ 
                padding: '8px 16px', 
                backgroundColor: 'var(--color-accent)', 
                color: 'white',
                fontSize: '0.75rem'
              }}
            >
              Free
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <h3 
        className="font-display"
        style={{ 
          fontSize: '1.5rem', 
          marginBottom: '12px',
          lineHeight: 1.3
        }}
      >
        {event.title[locale]}
      </h3>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', color: 'var(--color-muted)', fontSize: '0.9rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar style={{ width: '16px', height: '16px' }} />
          {formatDateRange(event.startDate, event.endDate, locale)}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin style={{ width: '16px', height: '16px' }} />
          {event.city}
        </span>
      </div>
    </Link>
  )
}

function MapView({ events, locale }: { events: Event[]; locale: Locale }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    const loadMapbox = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      mapboxgl.accessToken = MAPBOX_TOKEN

      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-7.0926, 31.7917],
        zoom: 5,
      })

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
      map.current.on('load', () => setMapLoaded(true))
    }

    loadMapbox()

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapLoaded || !map.current) return

    const addMarkers = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      document.querySelectorAll('.mapboxgl-marker').forEach(m => m.remove())

      events.forEach(event => {
        const el = document.createElement('div')
        el.style.cssText = 'width:16px;height:16px;background:var(--color-accent);border-radius:50%;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.2);cursor:pointer;transition:transform 0.2s'
        el.onmouseover = () => el.style.transform = 'scale(1.3)'
        el.onmouseout = () => el.style.transform = 'scale(1)'
        
        new mapboxgl.Marker(el)
          .setLngLat([event.coordinates.lng, event.coordinates.lat])
          .addTo(map.current!)

        el.addEventListener('click', () => {
          setSelectedEvent(event)
          map.current?.flyTo({ center: [event.coordinates.lng, event.coordinates.lat], zoom: 10 })
        })
      })
    }

    addMarkers()
  }, [mapLoaded, events])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
      <div 
        ref={mapContainer} 
        style={{ width: '100%', height: '500px', backgroundColor: 'var(--color-sand)' }}
      />
      
      {selectedEvent && (
        <div style={{ padding: '24px', border: '1px solid var(--color-border)', backgroundColor: 'white' }}>
          <button 
            onClick={() => setSelectedEvent(null)}
            style={{ 
              marginBottom: '16px', 
              fontSize: '0.875rem', 
              color: 'var(--color-muted)',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ← Back
          </button>
          <h3 className="font-display" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
            {selectedEvent.title[locale]}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', marginBottom: '8px' }}>
            {formatDateRange(selectedEvent.startDate, selectedEvent.endDate, locale)}
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin style={{ width: '14px', height: '14px' }} />
            {selectedEvent.city}
          </p>
          <Link
            href={`/event/${selectedEvent.id}`}
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '14px',
              backgroundColor: 'var(--color-foreground)',
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  )
}
