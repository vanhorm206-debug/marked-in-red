import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/map', label: 'Map' },
  { href: '/list', label: 'Cases' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/80 backdrop-blur-md border-b border-outline-variant/30">
      <div className="mx-auto max-w-[1440px] h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-extrabold text-xl text-primary"
        >
          Marked in Red
        </Link>

        {/* Center nav links — hidden on mobile, visible on md+ */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden w-24 md:block" aria-hidden="true" />
      </div>
    </header>
  )
}
