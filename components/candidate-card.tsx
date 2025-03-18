import type { Candidate } from "@/components/kanban-board"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Mail, FileText, Star, Trash } from "lucide-react"
import { useState } from "react"
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog"

interface CandidateCardProps {
  candidate: Candidate
  onDelete: (id: string) => void
}

export function CandidateCard({ candidate, onDelete }: CandidateCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const initials = candidate.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()

  const handleDelete = () => {
    onDelete(candidate.id) // ✅ Trigger delete action after confirmation
    setShowDeleteDialog(false)
  }

  return (
    <>
      <Card className="bg-background">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Avatar>
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium text-sm">{candidate.name}</h4>
                <p className="text-xs text-muted-foreground">{candidate.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{candidate.university}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border rounded-md shadow-lg">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email Candidate</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>View Resume</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star className="mr-2 h-4 w-4" />
                  <span>Add to Favorites</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* ✅ Added Delete Option */}
                <DropdownMenuItem
                  onSelect={() => setShowDeleteDialog(true)}
                  className="text-red-500 cursor-pointer"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete Candidate</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {candidate.notes && (
            <div className="mt-3 pt-3 border-t text-xs">
              <p className="text-muted-foreground">{candidate.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ✅ Add DeleteConfirmationDialog */}
      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        candidateName={candidate.name}
      />
    </>
  )
}
