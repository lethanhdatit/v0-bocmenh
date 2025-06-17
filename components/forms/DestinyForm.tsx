"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const DestinyForm: React.FC = () => {
  const pathname = usePathname()

  return (
    <div>
      <p>This is a form about destiny.</p>
      <Link href={pathname === "/" ? "/about" : "/"}>Go to {pathname === "/" ? "About" : "Home"}</Link>
      <Link href={`${pathname}/details`}>Details</Link>
    </div>
  )
}

export default DestinyForm
