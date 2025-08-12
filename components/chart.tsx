"use client"

import * as React from "react"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Brush } from "recharts"

function toSeries(data: number[]) {
  return data.map((d, i) => ({ time: i, db: Math.round(d) }))
}

const chartConfig = {
  db: { label: "Decibels", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig

export function DecibelChart({
  data = Array.from({ length: 60 }, () => 20 + Math.random() * 60),
}: { data?: number[] }) {
  const series = React.useMemo(() => toSeries(data), [data])
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={series} role="img" aria-label="Decibel line chart">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis domain={[0, 100]} stroke="#94a3b8" />
          <Tooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="db" stroke="#007BFF" dot={false} strokeWidth={2} isAnimationActive />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export function MiniDecibelChart({
  data = Array.from({ length: 30 }, () => 20 + Math.random() * 60),
}: { data?: number[] }) {
  const series = React.useMemo(() => toSeries(data), [data])
  return (
    <ResponsiveContainer width="100%" height={80}>
      <LineChart data={series}>
        <Line type="monotone" dataKey="db" stroke="#28A745" dot={false} strokeWidth={2} isAnimationActive />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function ZoomableDecibelChart({
  data = Array.from({ length: 120 }, () => 20 + Math.random() * 60),
}: { data?: number[] }) {
  const series = React.useMemo(() => toSeries(data), [data])
  return (
    <ChartContainer config={chartConfig} className="min-h-[240px] w-full">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={series} role="img" aria-label="Zoomable decibel chart">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis domain={[0, 100]} stroke="#94a3b8" />
          <Tooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line type="monotone" dataKey="db" stroke="#007BFF" dot={false} strokeWidth={2} isAnimationActive />
          <Brush dataKey="time" height={20} stroke="#28A745" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default DecibelChart
