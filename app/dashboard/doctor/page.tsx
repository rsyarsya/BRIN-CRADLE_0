"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Toaster, toast } from "react-hot-toast"
import Sidebar from "@/components/sidebar"
import { getUser } from "@/lib/auth"
import { patientsMock, generateDecibelData, riskColor, type Patient } from "@/lib/mock-data"
import Link from "next/link"
import { ChevronDown, Search, Download, Stethoscope, LoaderCircle } from "lucide-react"

const DecibelChart = dynamic(() => import("@/components/chart").then((m) => m.DecibelChart), {
  ssr: false,
  loading: () => <div className="h-40 animate-pulse rounded bg-gray-100" />,
})
const MiniDecibelChart = dynamic(() => import("@/components/chart").then((m) => m.MiniDecibelChart), {
  ssr: false,
  loading: () => <div className="h-16 animate-pulse rounded bg-gray-100" />,
})

export default function DoctorDashboard() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [sortBy, setSortBy] = useState<"risk" | "date">("risk")
  const [patients, setPatients] = useState<Patient[]>(patientsMock)
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [recording, setRecording] = useState(false)
  const [decibels, setDecibels] = useState<number[]>([])
  const [risk, setRisk] = useState<number>(0)
  const [showExamModal, setShowExamModal] = useState(false)
  const [questions, setQuestions] = useState({ smoke: false, allergies: false, diet: false, notes: "" })

  useEffect(() => {
    const user = getUser()
    if (!user || user.role !== "doctor") {
      router.replace("/login")
    }
  }, [router])

  const filtered = useMemo(() => {
    let data = patients.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    if (sortBy === "risk") data = data.sort((a, b) => b.risk - a.risk)
    if (sortBy === "date") data = data.sort((a, b) => (a.lastExam < b.lastExam ? 1 : -1))
    return data
  }, [patients, query, sortBy])

  // simple drag & drop for mobile cards
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const onDragStart = (idx: number) => setDragIndex(idx)
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()
  const onDrop = (idx: number) => {
    if (dragIndex === null) return
    const updated = [...patients]
    const [moved] = updated.splice(dragIndex, 1)
    updated.splice(idx, 0, moved)
    setPatients(updated)
    setDragIndex(null)
  }

  const connectDevice = () => {
    setConnecting(true)
    setShowExamModal(true)
    setTimeout(() => {
      setConnecting(false)
      setConnected(true)
      toast.success("Device connected")
    }, 2000)
  }

  const startRecording = () => {
    if (!connected) {
      toast.error("Connect device first")
      return
    }
    setRecording(true)
    const data = generateDecibelData(100)
    setDecibels(data)
    const r = Math.round(10 + Math.random() * 90)
    setRisk(r)
    toast.success("Recording complete")
  }

  const downloadReport = () => {
    alert("Downloading report (mock)...")
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Toaster />
      <Sidebar role="doctor" />
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">{"Doctor Dashboard"}</h1>
          <Button
            className="bg-[#007BFF] hover:bg-[#0a66d1] text-white"
            onClick={connectDevice}
            aria-label="Connect Device"
          >
            <Stethoscope className="mr-2 h-4 w-4" />
            {connecting ? "Connecting..." : "Connect Device"}
          </Button>
        </div>

        {/* Examine Modal */}
        <Dialog open={showExamModal} onOpenChange={setShowExamModal}>
          <DialogTrigger asChild>
            <span />
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{"Examine Patient"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {connecting && <LoaderCircle className="h-4 w-4 animate-spin text-[#007BFF]" aria-hidden />}
                <Badge
                  variant="outline"
                  className={
                    connecting ? "border-[#007BFF] text-[#007BFF]" : connected ? "border-[#28A745] text-[#28A745]" : ""
                  }
                >
                  {connecting ? "Connecting..." : connected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              {/* Questionnaire */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={questions.smoke}
                    onChange={(e) => setQuestions({ ...questions, smoke: e.target.checked })}
                    aria-label="Exposure to smoke"
                  />
                  <span className="text-sm text-gray-700">{"Exposure to smoke"}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={questions.allergies}
                    onChange={(e) => setQuestions({ ...questions, allergies: e.target.checked })}
                    aria-label="Allergies"
                  />
                  <span className="text-sm text-gray-700">{"Allergies"}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={questions.diet}
                    onChange={(e) => setQuestions({ ...questions, diet: e.target.checked })}
                    aria-label="Diet issues"
                  />
                  <span className="text-sm text-gray-700">{"Diet issues"}</span>
                </label>
                <textarea
                  className="col-span-full rounded border border-gray-300 p-2 text-sm"
                  placeholder="Notes"
                  value={questions.notes}
                  onChange={(e) => setQuestions({ ...questions, notes: e.target.value })}
                  aria-label="Notes"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button
                  className="bg-[#28A745] hover:bg-[#218838] text-white"
                  onClick={startRecording}
                  aria-label="Start Recording"
                >
                  {"Start Recording"}
                </Button>
                <Button variant="outline" onClick={() => setShowExamModal(false)} aria-label="Close Examine">
                  {"Close"}
                </Button>
              </div>

              {/* Results */}
              {recording && (
                <div className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">{"Decibel vs Time"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DecibelChart data={decibels} />
                    </CardContent>
                  </Card>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800">{"Risk Level"}</p>
                      <Badge className={riskColor(risk).text} variant="outline">{`${risk}%`}</Badge>
                    </div>
                    <Progress
                      value={risk}
                      className={`h-3 ${riskColor(risk).bar}`}
                      aria-label="Risk percentage progress"
                    />
                    <div className="mt-3">
                      <Button variant="outline" onClick={downloadReport} aria-label="Download Report">
                        <Download className="mr-2 h-4 w-4" />
                        {"Download Report"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Patients */}
        <section className="mt-8">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-500" aria-hidden />
              <Input
                placeholder="Search patients by name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full sm:w-64"
                aria-label="Search patients"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setSortBy(sortBy === "risk" ? "date" : "risk")}
              aria-label="Toggle sort order"
            >
              <ChevronDown className="mr-2 h-4 w-4" />
              {sortBy === "risk" ? "Sort by Date" : "Sort by Risk"}
            </Button>
          </div>

          {/* Table on md+, cards with drag on mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="p-3 text-left text-sm text-gray-600">{"Name"}</th>
                  <th className="p-3 text-left text-sm text-gray-600">{"Age"}</th>
                  <th className="p-3 text-left text-sm text-gray-600">{"Last Exam"}</th>
                  <th className="p-3 text-left text-sm text-gray-600">{"Risk Level"}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <Link href={`/dashboard/patient/${p.id}`} className="text-[#007BFF] hover:underline">
                        {p.name}
                      </Link>
                    </td>
                    <td className="p-3">{p.age}</td>
                    <td className="p-3">{p.lastExam}</td>
                    <td className="p-3">
                      <Badge className={riskColor(p.risk).text} variant="outline">
                        {p.risk}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards with drag */}
          <div className="md:hidden grid grid-cols-1 gap-3">
            {filtered.map((p, idx) => (
              <div
                key={p.id}
                draggable
                onDragStart={() => onDragStart(idx)}
                onDragOver={onDragOver}
                onDrop={() => onDrop(idx)}
                className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm"
                aria-grabbed={dragIndex === idx}
              >
                <div className="flex items-center justify-between">
                  <Link href={`/dashboard/patient/${p.id}`} className="text-[#007BFF] font-medium">
                    {p.name}
                  </Link>
                  <Badge className={riskColor(p.risk).text} variant="outline">
                    {p.risk}%
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{`Age: ${p.age}`}</p>
                <p className="text-sm text-gray-600">{`Last Exam: ${p.lastExam}`}</p>
                <div className="mt-2">
                  <MiniDecibelChart data={generateDecibelData(30)} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
