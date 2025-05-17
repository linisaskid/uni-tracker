import React from "react"
import { University } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"

interface UniversityDetailsProps {
  university: University
}

export function UniversityDetails({ university }: UniversityDetailsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{university.name}</CardTitle>
          <CardDescription>
            {university.city}, {university.country} • Founded {university.foundedYear}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Overview</h3>
              <p className="text-sm text-muted-foreground">{university.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Key Statistics</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Students</div>
                <div className="text-right">{university.studentCount.toLocaleString()}</div>
                <div>Faculty</div>
                <div className="text-right">{university.facultyCount.toLocaleString()}</div>
                <div>Score</div>
                <div className="text-right">{university.score}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {university.majors && (
        <Card>
          <CardHeader>
            <CardTitle>Academic Programs</CardTitle>
            <CardDescription>Available majors and degrees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {university.majors.map((major, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{major.name}</h3>
                    {major.ranking && (
                      <Badge>Rank #{major.ranking}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{major.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Degree</div>
                    <div className="text-right">{major.degree}</div>
                    <div>Duration</div>
                    <div className="text-right">{major.duration}</div>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium mb-1">Requirements:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {major.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  {index < university.majors.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Academic Metrics</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Academic Reputation</div>
                <div className="text-right">{university.metrics.academicReputation}</div>
                <div>Employer Reputation</div>
                <div className="text-right">{university.metrics.employerReputation}</div>
                <div>Faculty/Student Ratio</div>
                <div className="text-right">{university.metrics.facultyStudentRatio}</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Research & International</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Citations</div>
                <div className="text-right">{university.metrics.citations}</div>
                <div>International Faculty</div>
                <div className="text-right">{university.metrics.internationalFaculty}</div>
                <div>International Students</div>
                <div className="text-right">{university.metrics.internationalStudents}</div>
                <div>Research Output</div>
                <div className="text-right">{university.metrics.researchOutput}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 