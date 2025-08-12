export type Patient = { id: number; name: string; age: number; lastExam: string; risk: number }

export const patientsMock: Patient[] = [
  { id: 1, name: "John Doe", age: 3, lastExam: "2025-08-01", risk: 75 },
  { id: 2, name: "Jane Smith", age: 2, lastExam: "2025-07-15", risk: 45 },
  { id: 3, name: "Sam Lee", age: 4, lastExam: "2025-07-05", risk: 32 },
  { id: 4, name: "Ava Brown", age: 3, lastExam: "2025-06-21", risk: 62 },
]

export const childrenMock = [
  { id: 101, name: "Jane Smith", age: 2, lastExam: "2025-07-15", risk: 45 },
  { id: 102, name: "Liam Wong", age: 3, lastExam: "2025-07-02", risk: 28 },
  { id: 103, name: "Mia Patel", age: 4, lastExam: "2025-06-18", risk: 60 },
]

export function generateDecibelData(n = 100): number[] {
  return Array.from({ length: n }, () => Math.random() * 60 + 20)
}

export function getPatientById(id: number) {
  return patientsMock.find((p) => p.id === id)
}

export function riskColor(risk: number) {
  if (risk > 70) return { text: "text-red-600 border-red-600", bar: "bg-red-500" }
  if (risk >= 40) return { text: "text-yellow-600 border-yellow-600", bar: "bg-yellow-500" }
  return { text: "text-green-600 border-green-600", bar: "bg-green-500" }
}
