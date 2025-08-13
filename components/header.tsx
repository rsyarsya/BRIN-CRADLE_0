"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image" // Add this import
import { UserRound } from "lucide-react" 

export default function Header() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="CRADLE Home">
          <Image 
            src="/LOGO 2.svg" // Path to your SVG in public folder
            alt="CRADLE Logo" 
            width={48} // Adjust based on your desired size
            height={48} // Adjust based on your desired size
            className="text-[#007BFF]" // This applies color if SVG uses currentColor
          />
          <span className="font-semibold text-gray-900">{"CRADLE"}</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6">
          <Link
            href="/privacy"
            className={`text-sm ${pathname === "/privacy" ? "text-[#007BFF] font-medium" : "text-gray-700 hover:text-gray-900"}`}
          >
            {"Privacy"}
          </Link>
          <Link
            href="/login"
            className="text-sm text-gray-700 hover:text-gray-900 flex items-center gap-1"
            aria-label="Login"
          >
            <UserRound className="h-4 w-4" /> {"Login"}
          </Link>
        </nav>
      </div>
    </header>
  )
}