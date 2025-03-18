import KanbanBoard from "@/components/kanban-board"

export default function Home() {
  return (
    <main className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Internship Hiring Pipeline</h1>
      <KanbanBoard />
    </main>
  )
}

