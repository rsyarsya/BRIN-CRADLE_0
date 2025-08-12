"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import dynamic from "next/dynamic"
import { generateDecibelData, riskColor, type Patient } from "@/lib/mock-data"

const MiniDecibelChart = dynamic(() => import("@/components/chart").then((m) => m.MiniDecibelChart), { ssr: false })

export default function PatientCard({ patient }: { patient: Patient }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          <Link href={`/dashboard/patient/${patient.id}`} className="text-[#007BFF] hover:underline">
            {patient.name}
          </Link>
          <Badge className={riskColor(patient.risk).text} variant="outline">
            {patient.risk}%
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">{`Age ${patient.age} • Last Exam ${patient.lastExam}`}</p>
      </CardHeader>
      <CardContent>
        <MiniDecibelChart data={generateDecibelData(30)} />
      </CardContent>
    </Card>
  )
}
