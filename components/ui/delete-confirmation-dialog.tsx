"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface DeleteConfirmationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    candidateName: string
}

export function DeleteConfirmationDialog({
    open,
    onOpenChange,
    onConfirm,
    candidateName,
}: DeleteConfirmationDialogProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
                <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                    <div className="flex items-center justify-between mb-4">
                        <Dialog.Title className="text-lg font-semibold">
                            Confirm Deletion
                        </Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="text-gray-400 hover:text-gray-500">
                                <X className="h-5 w-5" />
                            </button>
                        </Dialog.Close>
                    </div>
                    <p className="text-sm text-gray-600">
                        Are you sure you want to delete <strong>{candidateName}</strong>? This action cannot be undone.
                    </p>
                    <div className="mt-6 flex justify-end gap-3">
                        <Dialog.Close asChild>
                            <Button variant="outline">Cancel</Button>
                        </Dialog.Close>
                        <Button
                            onClick={onConfirm}
                            variant="destructive"
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Delete
                        </Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
