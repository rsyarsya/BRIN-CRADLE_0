import Link from "next/link"
import { Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#F8F9FA] border-t border-gray-200 mt-10">
      <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div className="text-sm text-gray-600">
          {"© "} {new Date().getFullYear()} {" CRADLE. All rights reserved."}
        </div>
        <div className="flex justify-center gap-6">
          <Link href="/privacy" className="text-sm text-gray-700 hover:text-gray-900">
            {"Privacy Policy"}
          </Link>
          <Link href="/" className="text-sm text-gray-700 hover:text-gray-900">
            {"About"}
          </Link>
          <Link href="/" className="text-sm text-gray-700 hover:text-gray-900">
            {"Contact"}
          </Link>
        </div>
        <div className="flex justify-end gap-3">
          <a href="#" aria-label="Twitter" className="text-gray-700 hover:text-gray-900">
            <Twitter />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-gray-700 hover:text-gray-900">
            <Linkedin />
          </a>
        </div>
      </div>
    </footer>
  )
}
