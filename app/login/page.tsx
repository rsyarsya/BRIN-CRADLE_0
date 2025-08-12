"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster, toast } from "react-hot-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { setUser, getUser } from "@/lib/auth"
import { Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"doctor" | "parent">("parent")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const existing = getUser()
    if (existing?.role) {
      router.replace(`/dashboard/${existing.role}`)
    }
  }, [router])

  const validate = () => {
    const e: { email?: string; password?: string } = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) e.email = "Invalid email format"
    if (password.length < 8) e.password = "Password must be at least 8 characters"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onLogin = async () => {
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setUser({ email, role })
      toast.success("Logged in!")
      router.replace(`/dashboard/${role}`)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#007BFF]/10 to-[#F8F9FA]">
      <Toaster />
      <Header />
      <main className="mx-auto max-w-md px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="text-[#007BFF]" aria-hidden />
                <span>{"Login"}</span>
              </CardTitle>
              <CardDescription>{"Authenticate as a Doctor or Parent."}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={!!errors.password}
                    aria-describedby="password-error"
                  />
                  {errors.password && (
                    <p id="password-error" className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
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
                <div className="pt-2">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      className="w-full bg-[#007BFF] hover:bg-[#0a66d1] text-white"
                      onClick={onLogin}
                      aria-label="Login"
                      disabled={loading}
                    >
                      {loading && (
                        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      )}
                      {"Login"}
                    </Button>
                  </motion.div>
                </div>
                <p className="text-sm text-gray-600">
                  {"Don't have an account? "}
                  <Link href="/register" className="text-[#007BFF] underline">
                    {"Sign up"}
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
