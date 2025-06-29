"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { href: "/contact", labelKey: "footer.contact" },
    { href: "/help", labelKey: "footer.help" },
    { href: "/about", labelKey: "footer.about" },
    { href: "/privacy", labelKey: "footer.privacy" },
    { href: "/terms", labelKey: "footer.terms" },
  ]

  return (
    <footer className="bg-card/50 border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Bóc Mệnh Logo" className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">{t("site.description")}</p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-bold text-foreground tracking-wider uppercase mb-4">{t("footer.explore")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/destiny" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("nav.destiny")}
                  </Link>
                </li>
                <li>
                  <Link href="/dreams" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("nav.dreams")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/numerology"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t("nav.numerology")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground tracking-wider uppercase mb-4">{t("footer.more")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/tarot" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("nav.tarot")}
                  </Link>
                </li>
                <li>
                  <Link href="/fengshui" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("nav.fengshui")}
                  </Link>
                </li>
                <li>
                  <Link href="/store" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("nav.store")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground tracking-wider uppercase mb-4">{t("footer.support")}</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} {t("site.owner")}. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
