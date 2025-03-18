"use client"

import type React from "react"

import { useState } from "react"
import { CandidateCard } from "@/components/candidate-card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Define candidate type
export type Candidate = {
  id: string
  name: string
  email: string
  role: string
  university: string
  avatar: string
  notes?: string
}

// Define column type
type Column = {
  id: string
  title: string
  candidates: Candidate[]
}

export default function KanbanBoard() {
  // Initial board state with mock data
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "applied",
      title: "Applied",
      candidates: [
        {
          id: "1",
          name: "Alex Johnson",
          email: "alex.j@university.edu",
          role: "Frontend Developer",
          university: "Tech University",
          avatar: "/image.png?height=40&width=40",
          notes: "Strong portfolio with React projects",
        },
        {
          id: "2",
          name: "Jamie Smith",
          email: "jamie.s@college.edu",
          role: "UX Designer",
          university: "Design College",
          avatar: "/image.png?height=40&width=40",
          notes: "Great design thinking process",
        },
        {
          id: "3",
          name: "Taylor Wilson",
          email: "t.wilson@university.edu",
          role: "Data Scientist",
          university: "State University",
          avatar: "/image.png?height=40&width=40",
          notes: "Experience with ML projects",
        },
      ],
    },
    {
      id: "screening",
      title: "Screening",
      candidates: [
        {
          id: "4",
          name: "Morgan Lee",
          email: "morgan.l@university.edu",
          role: "Backend Developer",
          university: "Tech Institute",
          avatar: "/image.png?height=40&width=40",
          notes: "Strong Java background",
        },
        {
          id: "5",
          name: "Casey Rivera",
          email: "c.rivera@college.edu",
          role: "Full Stack Developer",
          university: "Engineering College",
          avatar: "/image.png?height=40&width=40",
          notes: "Built several full-stack applications",
        },
      ],
    },
    {
      id: "interview",
      title: "Interview",
      candidates: [
        {
          id: "6",
          name: "Jordan Patel",
          email: "j.patel@university.edu",
          role: "DevOps Engineer",
          university: "Tech University",
          avatar: "/image.png?height=40&width=40",
          notes: "Experience with CI/CD pipelines",
        },
      ],
    },
    {
      id: "hired",
      title: "Hired",
      candidates: [
        {
          id: "7",
          name: "Riley Thompson",
          email: "r.thompson@college.edu",
          role: "Mobile Developer",
          university: "State College",
          avatar: "/image.png?height=40&width=40",
          notes: "Excellent React Native skills",
        },
      ],
    },
  ])

  const [newCandidate, setNewCandidate] = useState<Omit<Candidate, "id" | "avatar">>({
    name: "",
    email: "",
    role: "",
    university: "",
    notes: "",
  })

  const [open, setOpen] = useState(false)

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, candidateId: string, sourceColumnId: string) => {
    e.dataTransfer.setData("candidateId", candidateId)
    e.dataTransfer.setData("sourceColumnId", sourceColumnId)
  }

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault()

    const candidateId = e.dataTransfer.getData("candidateId")
    const sourceColumnId = e.dataTransfer.getData("sourceColumnId")

    // If dropped in the same column, do nothing
    if (sourceColumnId === targetColumnId) return

    // Create a new state
    const newColumns = [...columns]

    // Find source and target columns
    const sourceColumnIndex = newColumns.findIndex((col) => col.id === sourceColumnId)
    const targetColumnIndex = newColumns.findIndex((col) => col.id === targetColumnId)

    // Find the candidate in the source column
    const candidateIndex = newColumns[sourceColumnIndex].candidates.findIndex(
      (candidate) => candidate.id === candidateId,
    )

    // Get the candidate
    const candidate = newColumns[sourceColumnIndex].candidates[candidateIndex]

    // Remove from source column
    newColumns[sourceColumnIndex].candidates.splice(candidateIndex, 1)

    // Add to target column
    newColumns[targetColumnIndex].candidates.push(candidate)

    // Update state
    setColumns(newColumns)
  }

  // Handle adding a new candidate
  const handleAddCandidate = () => {
    if (!newCandidate.name || !newCandidate.email || !newCandidate.role || !newCandidate.university) {
      return
    }

    const newColumns = [...columns]
    const appliedColumnIndex = newColumns.findIndex((col) => col.id === "applied")

    newColumns[appliedColumnIndex].candidates.push({
      id: Date.now().toString(),
      ...newCandidate,
      avatar: "/image.png?height=40&width=40",
    })

    setColumns(newColumns)
    setNewCandidate({
      name: "",
      email: "",
      role: "",
      university: "",
      notes: "",
    })
    setOpen(false)
  }

  // Handle candidate deletion
  const handleDeleteCandidate = (candidateId: string, columnId: string) => {
    const newColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          candidates: column.candidates.filter((candidate) => candidate.id !== candidateId),
        }
      }
      return column
    })

    setColumns(newColumns)
  }

  // Define a color scheme for the columns
  const columnColors = {
    applied: "bg-blue-100",
    screening: "bg-green-100",
    interview: "bg-yellow-100",
    hired: "bg-purple-100",
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span className="text-lg font-medium">
            Total Candidates: {columns.reduce((acc, col) => acc + col.candidates.length, 0)}
          </span>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Candidate
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Candidate</DialogTitle>
              <DialogDescription>
                Enter the details of the new candidate. They will be added to the Applied stage.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newCandidate.email}
                  onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Input
                  id="role"
                  value={newCandidate.role}
                  onChange={(e) => setNewCandidate({ ...newCandidate, role: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="university" className="text-right">
                  University
                </Label>
                <Input
                  id="university"
                  value={newCandidate.university}
                  onChange={(e) => setNewCandidate({ ...newCandidate, university: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={newCandidate.notes}
                  onChange={(e) => setNewCandidate({ ...newCandidate, notes: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddCandidate}>
                Add Candidate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`rounded-lg p-4 ${columnColors[column.id]}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">{column.title}</h3>
              <div className="bg-primary/10 text-primary rounded-full px-2 py-1 text-sm">
                {column.candidates.length}
              </div>
            </div>
            <div className="space-y-3">
              {column.candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, candidate.id, column.id)}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <CandidateCard
                    candidate={candidate}
                    onDelete={() => handleDeleteCandidate(candidate.id, column.id)} // ✅ Pass the function
                  />

                  {/* <button
                    onClick={() => handleDeleteCandidate(candidate.id, column.id)}
                    className="text-white bg-red-500 p-2 m-2 rounded-lg hover:text-red-700"
                  >
                    Delete
                  </button> */}
                </div>
              ))}
              {column.candidates.length === 0 && (
                <div className="text-center py-8 text-muted-foreground border border-dashed rounded-lg">
                  No candidates yet
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

