"use client"

import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card } from "src/components/ui/card"
import { Button } from "src/components/ui/button"
import { Badge } from "src/components/ui/badge"
import { Textarea } from "src/components/ui/textarea"
import {
  MapPin,
  Edit3,
  MoreVertical,
  Star,
  Check,
  X,
  ExternalLink,
  Copy,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu"
import Image from "next/image"

interface ItineraryItem {
  id: string
  number: number
  title: string
  rating: number
  reviewCount: string
  description: string
  image?: string
  tags?: string[]
}

interface SortableItemProps {
  item: ItineraryItem
  onEdit: (id: string, newDescription: string) => void
  onDelete: (id: string) => void
  onViewLocation: (title: string) => void
  onCopyLink: (title: string) => void
}

export function SortableItem({
  item,
  onEdit,
  onDelete,
  onViewLocation,
  onCopyLink,
}: SortableItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(item.description)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  }

  const handleSaveEdit = () => {
    onEdit(item.id, editText)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditText(item.description)
    setIsEditing(false)
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="bg-white border border-gray-200 rounded-md shadow-sm p-0 touch-manipulation"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start gap-3 p-3 border-b border-gray-100 last:border-b-0">
        {/* Drag Handle and Image Section */}
        <div className="flex items-start gap-2">
          {/* Drag Handle */}
          <div className="pt-10 pr-2 cursor-grab text-black">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 8H20M4 16H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Image with Purple Badge */}
          <div className="relative w-20 h-20">
            <Image
              src={item.image || "/four.jpeg"}
              alt={item.title}
              width={80}
              height={90}
              className="rounded-lg object-cover"
            />
            {/* Purple Pin */}
            <div
              className="absolute top-2.5 -left-3 w-6 h-7 text-white text-xs font-bold flex items-center justify-center shadow z-10"
              style={{
                backgroundColor: "#a855f7",
                clipPath: "path('M12 0 C18.6274 0 24 5.37258 24 12 C24 19 12 28 12 28 C12 28 0 19 0 12 C0 5.37258 5.37258 0 12 0 Z')"
              }}
            >
              {item.number}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-black text-sm leading-tight">
              {item.title}
            </h3>
            <div className="flex items-center gap-4 ml-2">
              <Image
                src="/map.png" 
                alt="Map Marker"
                width={16}
                height={16}
                className="object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-black hover:bg-gray-100"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
            <span className="text-xs text-black font-medium">{item.rating}</span>
            <span className="text-xs text-gray-500">({item.reviewCount})</span>
          </div>

          {/* Description */}
          <div className="relative mb-3">
            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="text-xs resize-none min-h-[50px] border-gray-300"
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveEdit} className="h-6 px-2 text-xs">
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="h-6 px-2 text-xs"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 pr-6">
                  {item.description}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-0 h-5 w-5 text-black hover:text-gray-600 hover:bg-gray-100 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsEditing(!isEditing)
                  }}
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex gap-20 mt-2">
            <Badge className="flex items-center gap-1 text-xs bg-white border border-gray-200 shadow-sm">
              <Image src="/word.png" alt="W" width={24} height={24} />
              Credit...
            </Badge>
            <Badge className="w-20 h-8 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-s text-black cursor-pointer hover:bg-gray-50">
              +
            </Badge>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div className="flex mt-10 flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => onViewLocation(item.title)}>
                <ExternalLink className="h-3 w-3 mr-2" />
                View on Maps
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onCopyLink(item.title)}>
                <Copy className="h-3 w-3 mr-2" />
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(item.id)}
                className="text-red-600 focus:text-red-600"
              >
                <X className="h-3 w-3 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  )
}
