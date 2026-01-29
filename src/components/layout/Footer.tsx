'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

interface FooterProps {
  locale: string
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ marginTop: 'auto' }}>
      {/* Navigation */}
      <div style={{ backgroundColor: '#292524', padding: '64px 0' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px' }}>
            {/* Brand */}
            <div>
              <h4 className="font-display" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', marginBottom: '16px' }}>
                Festivals Morocco
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                Your guide to art, music, and cultural celebrations across the kingdom.
              </p>
            </div>

            {/* Explore */}
            <div>
              <h5 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
                Explore
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                    {t('allEvents')}
                  </Link>
                </li>
                <li>
                  <Link href="/about" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                    {t('about')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h5 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
                Categories
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/?category=music" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                    Music
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/?category=art" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                    Art & Film
                  </Link>
                </li>
                <li>
                  <Link href="/?category=heritage" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                    Heritage
                  </Link>
                </li>
              </ul>
            </div>

            {/* Network */}
            <div>
              <h5 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
                Network
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://slowmorocco.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                    Slow Morocco ↗
                  </a>
                </li>
                <li>
                  <a href="https://houseofweaves.love" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                    House of Weaves ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div style={{ backgroundColor: '#1C1917', padding: '20px 0' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
              <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>{t('privacy')}</Link>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>{t('terms')}</Link>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
              © {currentYear} Festivals Morocco
            </p>
          </div>
        </div>
      </div>

      {/* Powered by */}
      <div style={{ backgroundColor: '#0C0A09', padding: '16px 0' }}>
        <div className="container-wide">
          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            Powered by{' '}
            <a href="https://slowmorocco.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
              Slow Morocco
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
