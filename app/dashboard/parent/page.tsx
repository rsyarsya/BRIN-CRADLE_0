"use client"

import dynamic from "next/dynamic"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { getUser } from "@/lib/auth"
import { childrenMock, generateDecibelData } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Toaster } from "react-hot-toast"

const DecibelChart = dynamic(() => import("@/components/chart").then((m) => m.DecibelChart), {
  ssr: false,
  loading: () => <div className="h-32 animate-pulse rounded bg-gray-100" />,
})

export default function ParentDashboard() {
  const router = useRouter()
  useEffect(() => {
    const user = getUser()
    if (!user || user.role !== "parent") {
      router.replace("/login")
    }
  }, [router])

  return (
    <div className="flex min-h-screen bg-white">
      <Toaster />
      <Sidebar role="parent" />
      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-2xl font-semibold text-gray-900">{"Parent Dashboard"}</h1>

        {/* Children List */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {childrenMock.map((child) => (
            <Card key={child.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{child.name}</span>
                  <Badge variant="outline" className="text-[#007BFF] border-[#007BFF]">{`${child.risk}%`}</Badge>
                </CardTitle>
                <p className="text-sm text-gray-600">{`Age: ${child.age} • Last exam: ${child.lastExam}`}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded overflow-hidden">
                  <DecibelChart data={generateDecibelData(60)} />
                </div>
                <p className="text-sm text-gray-700">{"Recommendation: Consult your doctor if risk > 50%."}</p>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" aria-label={`Show results for ${child.name}`}>
                      {"View Details"}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 text-sm text-gray-700">
                    <p>{"Detailed notes and guidance will appear here (mock)."}</p>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}
