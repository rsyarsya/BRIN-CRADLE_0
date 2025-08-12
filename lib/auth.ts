export type User = { email: string; role: "doctor" | "parent" }

const KEY = "cradle_user"

export function getUser(): User | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function setUser(user: User) {
  if (typeof window === "undefined") return
  localStorage.setItem(KEY, JSON.stringify(user))
}

export function clearUser() {
  if (typeof window === "undefined") return
  localStorage.removeItem(KEY)
}
