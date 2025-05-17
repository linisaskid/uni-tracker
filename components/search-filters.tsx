"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [region, setRegion] = useState(searchParams.get("region") || "all")

  // Update URL with search params
  const updateSearchParams = () => {
    const params = new URLSearchParams()

    if (search) params.set("search", search)
    if (region !== "all") params.set("region", region)

    router.push(`/?${params.toString()}`)
  }

  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateSearchParams()
  }

  // Handle region change
  const handleRegionChange = (value: string) => {
    setRegion(value)

    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete("region")
    } else {
      params.set("region", value)
    }

    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search universities or countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={region} onValueChange={handleRegionChange}>
            <SelectTrigger className="w-full sm:w-[180px] h-10">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="north-america">North America</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
              <SelectItem value="africa">Africa</SelectItem>
              <SelectItem value="south-america">South America</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" variant="outline" className="h-10">
            Search
          </Button>
        </div>
      </form>
    </div>
  )
}
