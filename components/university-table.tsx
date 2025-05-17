"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronUp, ExternalLink, ArrowUpDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSearchParams } from "next/navigation"
import { universities, University } from "@/lib/data"

type SortField = "rank" | "name" | "country" | "score" | "studentCount" | "facultyCount" | "foundedYear"
type SortDirection = "asc" | "desc"

interface UniversityTableProps {
  universities: University[]
  searchParams: {
    sort?: SortField
    order?: SortDirection
  }
}

export function UniversityTable({ universities, searchParams }: UniversityTableProps) {
  const { sort = "rank", order = "asc" } = searchParams

  const sortedUniversities = [...universities].sort((a, b) => {
    const multiplier = order === "asc" ? 1 : -1
    if (sort === "name") {
      return multiplier * a.name.localeCompare(b.name)
    }
    if (sort === "country") {
      return multiplier * a.country.localeCompare(b.country)
    }
    return multiplier * (a[sort] - b[sort])
  })

  const createSortLink = (field: SortField) => {
    const newOrder = field === sort && order === "asc" ? "desc" : "asc"
    return `?sort=${field}&order=${newOrder}`
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Link href={createSortLink("rank")} className="flex items-center">
                Rank
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Link>
            </TableHead>
            <TableHead>Logo</TableHead>
            <TableHead>
              <Link href={createSortLink("name")} className="flex items-center">
                University
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Link>
            </TableHead>
            <TableHead>
              <Link href={createSortLink("country")} className="flex items-center">
                Country
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Link>
            </TableHead>
            <TableHead>
              <Link href={createSortLink("score")} className="flex items-center">
                Score
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Link>
            </TableHead>
            <TableHead>
              <Link href={createSortLink("studentCount")} className="flex items-center">
                Students
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Link>
            </TableHead>
            <TableHead>
              <Link href={createSortLink("facultyCount")} className="flex items-center">
                Faculty
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Link>
            </TableHead>
            <TableHead>
              <Link href={createSortLink("foundedYear")} className="flex items-center">
                Founded
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Link>
            </TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUniversities.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                No universities found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            sortedUniversities.map((university) => (
              <TableRow key={university.id}>
                <TableCell className="font-medium">
                  <Badge>{university.rank}</Badge>
                </TableCell>
                <TableCell>
                  <div className="h-10 w-10 rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={university.logo || "/placeholder.svg"}
                      alt={`${university.name} logo`}
                      width={40}
                      height={40}
                      className={`object-contain ${university.id === 6 ? "scale-110" : ""}`}
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{university.name}</TableCell>
                <TableCell>{university.country}</TableCell>
                <TableCell>{university.score.toFixed(1)}</TableCell>
                <TableCell>{university.studentCount.toLocaleString()}</TableCell>
                <TableCell>{university.facultyCount.toLocaleString()}</TableCell>
                <TableCell>{university.foundedYear}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-secondary">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${university.score}%`,
                          backgroundColor: university.color,
                        }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/universities/${university.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}