'use client'

import { useState } from 'react'
import { Link, usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface HeaderProps {
  locale: string
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('header')
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'es', label: 'ES' },
    { code: 'ar', label: 'AR' },
  ]

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'var(--color-background)',
        borderBottom: '1px solid var(--color-border)'
      }}
    >
      <div className="container-wide">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <Link 
            href="/" 
            className="font-display"
            style={{ fontSize: '1.25rem', color: 'var(--color-foreground)', textDecoration: 'none' }}
          >
            Festivals Morocco
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }} className="hidden md:flex">
            <Link 
              href="/" 
              style={{
                fontSize: '0.9rem',
                color: pathname === '/' ? 'var(--color-foreground)' : 'var(--color-muted)',
                textDecoration: 'none'
              }}
            >
              {t('discover')}
            </Link>
            <Link 
              href="/about" 
              style={{ fontSize: '0.9rem', color: 'var(--color-muted)', textDecoration: 'none' }}
            >
              {t('about')}
            </Link>
            
            {/* Language */}
            <div style={{ position: 'relative', marginLeft: '16px', paddingLeft: '24px', borderLeft: '1px solid var(--color-border)' }}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.9rem',
                  color: 'var(--color-muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>{locale.toUpperCase()}</span>
                <ChevronDown style={{ width: '14px', height: '14px', transform: langMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              
              {langMenuOpen && (
                <>
                  <div 
                    style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                    onClick={() => setLangMenuOpen(false)} 
                  />
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    marginTop: '8px',
                    backgroundColor: 'white',
                    border: '1px solid var(--color-border)',
                    padding: '8px 0',
                    minWidth: '100px',
                    zIndex: 50,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}>
                    {languages.map((lang) => (
                      <Link
                        key={lang.code}
                        href={pathname}
                        locale={lang.code}
                        onClick={() => setLangMenuOpen(false)}
                        style={{
                          display: 'block',
                          padding: '10px 20px',
                          fontSize: '0.875rem',
                          color: locale === lang.code ? 'var(--color-foreground)' : 'var(--color-muted)',
                          backgroundColor: locale === lang.code ? 'var(--color-sand)' : 'transparent',
                          textDecoration: 'none'
                        }}
                      >
                        {lang.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {mobileMenuOpen ? <X style={{ width: '24px', height: '24px' }} /> : <Menu style={{ width: '24px', height: '24px' }} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden" style={{ backgroundColor: 'var(--color-background)', borderTop: '1px solid var(--color-border)' }}>
          <nav className="container-wide" style={{ padding: '24px 0' }}>
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'block', padding: '12px 0', fontSize: '1rem', color: 'var(--color-foreground)', textDecoration: 'none' }}
            >
              {t('discover')}
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'block', padding: '12px 0', fontSize: '1rem', color: 'var(--color-muted)', textDecoration: 'none' }}
            >
              {t('about')}
            </Link>
            <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', marginTop: '16px', borderTop: '1px solid var(--color-border)' }}>
              {languages.map((lang) => (
                <Link
                  key={lang.code}
                  href={pathname}
                  locale={lang.code}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.875rem',
                    border: locale === lang.code ? '1px solid var(--color-foreground)' : '1px solid var(--color-border)',
                    color: locale === lang.code ? 'var(--color-foreground)' : 'var(--color-muted)',
                    textDecoration: 'none'
                  }}
                >
                  {lang.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
