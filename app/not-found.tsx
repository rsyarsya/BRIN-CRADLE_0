import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-900">{"Page Not Found"}</h1>
      <p className="text-gray-600">{"The page you are looking for does not exist."}</p>
      <Link href="/">
        <Button className="bg-[#007BFF] hover:bg-[#0a66d1] text-white">{"Back to Home"}</Button>
      </Link>
    </main>
  )
}
