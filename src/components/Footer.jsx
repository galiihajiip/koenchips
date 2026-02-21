import { Link } from 'react-router-dom'
import { Leaf, MessageCircle, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { getDirectWALink } from '../utils/whatsapp'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary-500 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">
                KOEN<span className="text-primary-300">CHIPS</span>
              </span>
            </div>
            <p className="text-sm text-primary-300 leading-relaxed mb-4">
              Keripik sukun rendah lemak dengan rasa premium.
              Snack lokal yang terasa modern.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram KOENCHIPS"
                className="w-9 h-9 bg-primary-700 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={getDirectWALink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp KOENCHIPS"
                className="w-9 h-9 bg-primary-700 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@koenchips.id"
                aria-label="Email KOENCHIPS"
                className="w-9 h-9 bg-primary-700 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-base mb-4 text-primary-300">Menu</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Beranda', to: '/' },
                { label: 'Katalog Produk', to: '/katalog' },
                { label: 'Tentang Kami', to: '/#tentang' },
                { label: 'Team', to: '/#team' },
                { label: 'FAQ', to: '/#faq' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-300 hover:text-primary-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-base mb-4 text-primary-300">Produk</h3>
            <ul className="space-y-2.5">
              {[
                'Chocolate Bliss 70g',
                'Matcha Zen 70g',
                'Vanilla Cloud 70g',
                'Taro Twist 70g',
                'Bundle Quartet',
                'Family Pack 200g',
                'Sampler Pack 4x35g',
              ].map((p) => (
                <li key={p}>
                  <Link
                    to="/katalog"
                    className="text-sm text-gray-300 hover:text-primary-300 transition-colors"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-base mb-4 text-primary-300">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary-300 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">Sidoarjo, Jawa Timur, Indonesia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary-300 shrink-0" />
                <a
                  href={getDirectWALink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-primary-300 transition-colors"
                >
                  +62 822-6558-8823
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary-300 shrink-0" />
                <a
                  href="mailto:hello@koenchips.id"
                  className="text-sm text-gray-300 hover:text-primary-300 transition-colors"
                >
                  hello@koenchips.id
                </a>
              </li>
            </ul>
            <a
              href={getDirectWALink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-700 text-white text-sm font-heading font-semibold px-4 py-2.5 rounded-full transition-all duration-200 hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              Chat Sekarang
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            Copyright {year} KOENCHIPS. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Keripik Sukun Rendah Lemak, Rasa Premium.
          </p>
        </div>
      </div>
    </footer>
  )
}
