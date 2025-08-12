"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster, toast } from "react-hot-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"

function passwordStrength(pw: string) {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [role, setRole] = useState<"doctor" | "parent">("parent")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const strength = passwordStrength(password)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!fullName.trim()) e.fullName = "Full name is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) e.email = "Invalid email format"
    if (password.length < 8) e.password = "Password must be at least 8 characters"
    if (confirm !== password) e.confirm = "Passwords do not match"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onRegister = () => {
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      try {
        const key = "cradle_users"
        const prev = typeof window !== "undefined" ? JSON.parse(localStorage.getItem(key) || "[]") : []
        const user = { fullName, email, role }
        localStorage.setItem(key, JSON.stringify([...(prev || []), user]))
        toast.success("Registered! Please login.")
        router.replace("/login")
      } catch {
        toast.error("Registration failed. Try again.")
      } finally {
        setLoading(false)
      }
    }, 700)
  }

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      <Header />
      <main className="mx-auto max-w-md px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>{"Create your account"}</CardTitle>
              <CardDescription>{"Sign up as a Doctor or Parent."}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    aria-invalid={!!errors.fullName}
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={!!errors.password}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                  {/* Strength bar */}
                  <div className="mt-2 h-2 w-full rounded bg-gray-200">
                    <div
                      className={`h-2 rounded transition-all ${
                        strength <= 1
                          ? "bg-red-500 w-1/4"
                          : strength === 2
                            ? "bg-yellow-500 w-2/4"
                            : strength === 3
                              ? "bg-green-500 w-3/4"
                              : "bg-[#28A745] w-full"
                      }`}
                      aria-hidden
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-600">
                    {strength <= 1 ? "Weak" : strength === 2 ? "Fair" : strength === 3 ? "Good" : "Strong"}
                  </p>
                </div>
                <div>
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    aria-invalid={!!errors.confirm}
                  />
                  {errors.confirm && <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>}
                </div>
                <div>
                  <Label>Role</Label>
                  <Select value={role} onValueChange={(v) => setRole(v as "doctor" | "parent")}>
                    <SelectTrigger aria-label="Select role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">{"Doctor"}</SelectItem>
                      <SelectItem value="parent">{"Parent"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    className="w-full bg-[#28A745] hover:bg-[#218838] text-white"
                    onClick={onRegister}
                    disabled={loading}
                    aria-label="Register"
                  >
                    {loading && (
                      <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    )}
                    {"Register"}
                  </Button>
                </motion.div>
                <p className="text-sm text-gray-600">
                  {"Already have an account? "}
                  <Link href="/login" className="text-[#007BFF] underline">
                    {"Log in"}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
