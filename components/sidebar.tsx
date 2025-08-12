"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { PanelLeft, Users, FileText, UserCog, Bell, LayoutDashboard, Stethoscope } from "lucide-react"

type Props = { role?: "doctor" | "parent" }

export default function Sidebar({ role = "doctor" }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const doctorMenu = [
    { href: "/dashboard/doctor", label: "Patients", icon: Users },
    { href: "/dashboard/doctor#examine", label: "Examine", icon: Stethoscope },
    { href: "/dashboard/doctor#reports", label: "Reports", icon: FileText },
    { href: "/dashboard/doctor#profile", label: "Profile", icon: UserCog },
  ]

  const parentMenu = [
    { href: "/dashboard/parent", label: "My Children", icon: Users },
    { href: "/dashboard/parent#results", label: "Results", icon: LayoutDashboard },
    { href: "/dashboard/parent#notifications", label: "Notifications", icon: Bell },
  ]

  const menu = role === "doctor" ? doctorMenu : parentMenu

  return (
    <>
      {/* Mobile */}
      <aside className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="m-2" aria-label="Open Menu">
              <PanelLeft />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <nav className="h-full w-72 bg-white">
              <div className="px-4 py-4 border-b">
                <div className="font-semibold text-gray-900">
                  {role === "doctor" ? "Doctor" : "Parent"} {"Menu"}
                </div>
              </div>
              <ul className="p-2">
                {menu.map((m) => (
                  <li key={m.href}>
                    <Link
                      href={m.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 ${
                        pathname === m.href ? "bg-gray-100 text-[#007BFF]" : "text-gray-700"
                      }`}
                    >
                      <m.icon className="h-4 w-4" aria-hidden />
                      <span>{m.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </aside>

      {/* Desktop */}
      <aside className="hidden md:block w-64 border-r border-gray-200">
        <div className="px-4 py-4 border-b">
          <div className="font-semibold text-gray-900">
            {role === "doctor" ? "Doctor" : "Parent"} {"Menu"}
          </div>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            {menu.map((m) => (
              <li key={m.href}>
                <Link
                  href={m.href}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 ${
                    pathname === m.href ? "bg-gray-100 text-[#007BFF]" : "text-gray-700"
                  }`}
                >
                  <m.icon className="h-4 w-4" aria-hidden />
                  <span>{m.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
