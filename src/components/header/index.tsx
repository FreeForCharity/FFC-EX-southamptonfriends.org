'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface MenuItem {
  label: string
  href: string
  external?: boolean
}

const menuItems: MenuItem[] = [
  { label: 'Welcome', href: '#welcome' },
  { label: 'Sunday Worship', href: '#meeting' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setIsOpen(false)

  return (
    <header
      className={[
        'sticky top-0 z-40 w-full transition-colors duration-300',
        scrolled
          ? 'bg-paper/95 backdrop-blur border-b border-rule'
          : 'bg-paper border-b border-transparent',
      ].join(' ')}
    >
      <div className="sf-container flex items-center justify-between py-4 md:py-5">
        <Link
          href="/"
          onClick={close}
          className="group flex flex-col leading-tight"
          aria-label="Southampton Friends Meeting — home"
        >
          <span className="font-(family-name:--font-cantata-one) text-[1.05rem] md:text-[1.2rem] text-ink tracking-[0.01em]">
            Southampton Friends Meeting
          </span>
          <span className="font-(family-name:--font-lato) text-[0.72rem] md:text-[0.78rem] text-stone tracking-[0.18em] uppercase mt-1">
            Religious Society of Friends
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 font-(family-name:--font-lato) text-[0.9rem] tracking-wide">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-ink/80 hover:text-sky-deep transition-colors border-b border-transparent hover:border-sky-deep pb-0.5"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded border border-rule px-3 py-2 text-sm text-ink/80 hover:bg-paper-deep"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-controls="mobile-nav"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span className="font-(family-name:--font-lato)">{isOpen ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="md:hidden border-t border-rule bg-paper"
        >
          <ul className="sf-container py-3 space-y-1 font-(family-name:--font-lato)">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className="block px-2 py-3 text-ink/85 hover:bg-paper-deep rounded"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
