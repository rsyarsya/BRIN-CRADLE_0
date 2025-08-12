"use client"

import { useEffect } from "react"

export function useHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const { hash } = window.location
      if (!hash) return
      const id = decodeURIComponent(hash.slice(1))
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }
    }

    // Scroll on initial mount
    const raf = requestAnimationFrame(scrollToHash)
    // Scroll on hash change
    window.addEventListener("hashchange", scrollToHash, false)

    return () => {
      cancelAnimationFrame(raf as unknown as number)
      window.removeEventListener("hashchange", scrollToHash, false)
    }
  }, [])
}
