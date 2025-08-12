"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { Brain, Mic, Wifi, LineChart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster } from "react-hot-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      <Header />
      <main>
        {/* Hero */}
        <section aria-label="CRADLE Hero" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#007BFF] to-[#28A745] opacity-95" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:py-28 lg:py-32 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                  {"CRADLE: Protect Your Child’s Breath"}
                </h1>
                <p className="mt-4 text-base sm:text-lg opacity-95">
                  {"Non-invasive respiratory analysis for toddlers using AI and IoT."}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/register" aria-label="Get Started">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center rounded-md bg-white text-[#007BFF] hover:text-white px-5 py-3 font-medium shadow hover:bg-[#0a66d1] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                    >
                      {"Get Started"}
                    </motion.button>
                  </Link>
                  <Link href="/login" aria-label="Login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center rounded-md bg-transparent border border-white/80 px-5 py-3 font-medium hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                    >
                      {"Login"}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="flex justify-center"
              >
                {/* Device placeholder image styled like a thermogun */}
                <Image
                  src="/placeholder.svg?height=420&width=560"
                  alt="CRADLE device mockup"
                  width={560}
                  height={420}
                  className="rounded-xl shadow-2xl ring-1 ring-white/30"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-2xl font-semibold text-gray-900"
          >
            {"Powerful, Non-invasive Respiratory Insights"}
          </motion.h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Audio Recording",
                desc: "Capture toddler breathing sounds non-invasively.",
                Icon: Mic,
              },
              {
                title: "AI Analysis",
                desc: "Detects patterns like crackles and rhonchi.",
                Icon: Brain,
              },
              {
                title: "Real-Time Results",
                desc: "View decibel charts and risk percentages instantly.",
                Icon: LineChart,
              },
              {
                title: "IoT Integration",
                desc: "Wireless data transfer for seamless medical use.",
                Icon: Wifi,
              },
            ].map((f, idx) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Card className="h-full border-gray-200 hover:shadow-md transition">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <f.Icon aria-hidden className="text-[#007BFF]" />
                      <span>{f.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-600">{f.desc}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Banner */}
        <section className="bg-[#F8F9FA] py-12">
          <div className="mx-auto max-w-5xl px-4">
            <div className="rounded-lg bg-white border border-gray-200 p-6 text-center shadow-sm">
              <p className="text-base sm:text-lg text-gray-800 font-medium">
                {"In 2019, there were "}
                <span className="font-bold text-[#007BFF]">
                  <CountUp end={740180} separator="," duration={2.5} />
                </span>
                {" toddler deaths from respiratory issues."}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
