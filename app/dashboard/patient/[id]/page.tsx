"use client"

import { useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Sidebar from "@/components/sidebar"
import { getUser } from "@/lib/auth"
import { generateDecibelData, getPatientById, riskColor } from "@/lib/mock-data"
import { Toaster, toast } from "react-hot-toast"
import Image from "next/image"

const ZoomableChart = dynamic(() => import("@/components/chart").then((m) => m.ZoomableDecibelChart), {
  ssr: false,
  loading: () => <div className="h-48 animate-pulse rounded bg-gray-100" />,
})
const MiniDecibelChart = dynamic(() => import("@/components/chart").then((m) => m.MiniDecibelChart), {
  ssr: false,
  loading: () => <div className="h-16 animate-pulse rounded bg-gray-100" />,
})

export default function PatientDetailsPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const user = getUser()
  const patient = useMemo(() => getPatientById(Number(params.id)), [params.id])

  if (!patient) {
    if (typeof window !== "undefined") router.replace("/dashboard/doctor")
    return null
  }

  const timeline = Array.from({ length: 4 }).map((_, idx) => {
    const data = generateDecibelData(40)
    const risk = Math.round(10 + Math.random() * 90)
    return {
      id: idx + 1,
      date: new Date(Date.now() - idx * 1000 * 60 * 60 * 24 * 7).toISOString().slice(0, 10),
      data,
      risk,
    }
  })

  const shareLink = () => {
    toast.success("Secure share link generated (mock)")
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Toaster />
      <Sidebar role={user?.role === "parent" ? "parent" : "doctor"} />
      <main className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Image
            src="/placeholder.svg?height=80&width=80"
            alt={`Avatar for ${patient.name}`}
            width={80}
            height={80}
            className="rounded-full border"
          />
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{patient.name}</h1>
            <p className="text-sm text-gray-600">{`Age ${patient.age} • Last Exam ${patient.lastExam}`}</p>
          </div>
          <div className="ml-auto">
            <Button variant="outline" onClick={shareLink} aria-label="Share patient details">
              {"Share"}
            </Button>
          </div>
        </div>

        {/* Interactive Chart */}
        <section className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">{"Decibel Chart (Zoomable)"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ZoomableChart data={generateDecibelData(120)} />
            </CardContent>
          </Card>
        </section>

        {/* Timeline */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {timeline.map((e) => (
            <Card key={e.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  <span>{e.date}</span>
                  <Badge className={riskColor(e.risk).text} variant="outline">
                    {`${e.risk}%`}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MiniDecibelChart data={e.data} />
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Anamnesis Form (doctor-only) */}
        {user?.role === "doctor" && (
          <section className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{"Anamnesis (Doctor Only)"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" aria-label="Fever" /> <span className="text-sm text-gray-700">Fever</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" aria-label="Cough" /> <span className="text-sm text-gray-700">Cough</span>
                </label>
                <textarea
                  className="w-full rounded border p-2 text-sm"
                  placeholder="Notes"
                  aria-label="Anamnesis notes"
                />
                <Button className="bg-[#28A745] hover:bg-[#218838] text-white" aria-label="Save anamnesis">
                  {"Save"}
                </Button>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
    </div>
  )
}
