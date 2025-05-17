import { universities } from "@/lib/data"
import { UniversityDetails } from "@/components/university-details"
import { notFound } from "next/navigation"
import { University } from "@/lib/data"

interface UniversityPageProps {
  params: {
    id: string
  }
}

export default function UniversityPage({ params }: UniversityPageProps) {
  const university = universities.find((u) => u.id === parseInt(params.id))

  if (!university) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <UniversityDetails university={university as University} />
    </div>
  )
}
