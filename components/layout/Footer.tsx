"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Footer() {
  const { t } = useLanguage()
  const pathname = usePathname()

  // Get current locale from pathname
  const currentLocale = pathname.split("/")[1] || "vi"

  const mainFeatures = [
    { href: `/${currentLocale}/destiny`, label: t("nav.destiny") },
    { href: `/${currentLocale}/dreams`, label: t("nav.dreams") },
    { href: `/${currentLocale}/numerology`, label: t("nav.numerology") },
    { href: `/${currentLocale}/tarot`, label: t("nav.tarot") },
    { href: `/${currentLocale}/fengshui`, label: t("nav.fengshui") },
    { href: `/${currentLocale}/compatibility`, label: t("nav.compatibility") },
  ]

  const additionalServices = [
    { href: `/${currentLocale}/horoscope`, label: t("nav.horoscope") },
    { href: `/${currentLocale}/palmistry`, label: t("nav.palmistry") },
    { href: `/${currentLocale}/astrology`, label: t("nav.astrology") },
    { href: `/${currentLocale}/crystals`, label: t("nav.crystals") },
    { href: `/${currentLocale}/meditation`, label: t("nav.meditation") },
    { href: `/${currentLocale}/wedding-date`, label: t("nav.weddingDate") },
  ]

  const businessServices = [
    { href: `/${currentLocale}/name-analysis`, label: t("nav.nameAnalysis") },
    { href: `/${currentLocale}/business-name`, label: t("nav.businessName") },
    { href: `/${currentLocale}/store`, label: t("nav.store") },
    { href: `/${currentLocale}/community`, label: t("nav.community") },
  ]

  const legalLinks = [
    { href: `/${currentLocale}/terms`, label: t("footer.terms") },
    { href: `/${currentLocale}/privacy`, label: t("footer.privacy") },
    { href: `/${currentLocale}/contact`, label: t("footer.contact") },
    { href: `/${currentLocale}/about`, label: t("footer.about") },
    { href: `/${currentLocale}/faq`, label: t("footer.faq") },
  ]

  const socialLinks = [
    { href: "https://facebook.com/bocmenh", icon: Facebook, label: "Facebook" },
    { href: "https://instagram.com/bocmenh", icon: Instagram, label: "Instagram" },
    { href: "https://youtube.com/bocmenh", icon: Youtube, label: "YouTube" },
    { href: "https://twitter.com/bocmenh", icon: Twitter, label: "Twitter" },
  ]

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link href={`/${currentLocale}`} className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold">BM</span>
              </div>
              <span className="text-xl font-bold text-yellow-500">{t("site.title")}</span>
            </Link>
            <p className="text-gray-400 mb-4 leading-relaxed">{t("footer.description")}</p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@bocmenh.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{t("footer.address")}</span>
              </div>
            </div>
          </div>

          {/* Main Features */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.mainFeatures")}</h3>
            <ul className="space-y-2">
              {mainFeatures.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.additionalServices")}</h3>
            <ul className="space-y-2">
              {additionalServices.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.businessServices")}</h3>
            <ul className="space-y-2 mb-6">
              {businessServices.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-medium mb-2">{t("footer.legal")}</h4>
            <ul className="space-y-1">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors text-xs">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">{t("footer.followUs")}:</span>
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <Link
                href={currentLocale === "vi" ? pathname.replace("/vi", "/en") : pathname.replace("/en", "/vi")}
                className="text-gray-400 hover:text-yellow-500 transition-colors text-sm"
              >
                {currentLocale === "vi" ? "English" : "Tiếng Việt"}
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2024 {t("site.title")}. {t("footer.copyright")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
