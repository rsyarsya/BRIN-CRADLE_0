export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">{"Privacy Policy"}</h1>
      <p className="mt-4 text-gray-700">
        {
          "CRADLE ensures your data is protected with industry best practices. This demo stores only mock, non-sensitive data in localStorage for authentication simulation. No medical data is transmitted. For production, implement secure encryption, role-based access controls, and comply with HIPAA/GDPR as applicable."
        }
      </p>
    </main>
  )
}
