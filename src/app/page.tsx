"use client"

import { useState } from "react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { SortableItem} from "src/components/sortable-item"
import { Button } from "src/components/ui/button"
import { Menu } from "lucide-react"

interface ItineraryItem {
  id: string
  number: number
  title: string
  rating: number
  reviewCount: string
  description: string
  image: string
  tags: string[]
}

export default function TravelItinerary() {
  const [items, setItems] = useState<ItineraryItem[]>([
    {
      id: "1",
      number: 1,
      title: "India Gate",
      rating: 4.5,
      reviewCount: "201,124",
      description: "India Gate is a war memorial located in New Delhi, along the Rajpath...",
      image: "/imageone.jpeg?height=60&width=60",
      tags: ["Credit"],
    },
    {
      id: "2",
      number: 2,
      title: "Red Fort",
      rating: 4.5,
      reviewCount: "169,729",
      description: "The Red Fort is a historical fort in the old Delhi area, on the banks of...",
      image: "/two.webp?height=60&width=60",
      tags: ["Credit"],
    },
    {
      id: "3",
      number: 3,
      title: "Qutub Minar",
      rating: 4.4,
      reviewCount: "161,546",
      description: "Qutub Minar is a minaret or a victory tower located in the Qutub complex...",
      image: "/four.jpeg?height=60&width=60",
      tags: ["Credit"],
    },
    {
      id: "4",
      number: 4,
      title: "Lotus Temple",
      rating: 4.6,
      reviewCount: "161,546",
      description: "Located in the national capital of New Delhi, the Lotus Temple...",
      image: "/three.jpeg?height=60&width=60",
      tags: ["MAPS"],
    },
  ])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const newItems = arrayMove(items, oldIndex, newIndex)
        return newItems.map((item, index) => ({
          ...item,
          number: index + 1,
        }))
      })
    }
  }

  const handleEdit = (id: string, newDescription: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, description: newDescription } : item)))
  }

  const handleDelete = (id: string) => {
    const newItems = items.filter((item) => item.id !== id)
    setItems(
      newItems.map((item, index) => ({
        ...item,
        number: index + 1,
      })),
    )
  }

  const handleViewLocation = (title: string) => {
    const query = encodeURIComponent(`${title} Delhi India`)
    window.open(`https://www.google.com/maps/search/${query}`, "_blank")
  }

  const handleCopyLink = (title: string) => {
    const query = encodeURIComponent(`${title} Delhi India`)
    const url = `https://www.google.com/maps/search/${query}`
    navigator.clipboard.writeText(url).then(() => {
      console.log("Link copied to clipboard")
    })
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      {/* Header - Exact match to screenshot */}
      <header className=" text-pink-500 px-4 py-3 flex items-center justify-between">
        <h1 className="text-base font-bold tracking-wide">Y2Z TRAVEL</h1>
        <Button variant="ghost" size="icon" className=" text-black h-8 w-8">
          <Menu className="h-5 w-5" />
        </Button>
      </header>

      {/* Content */}
      <div className="px-4 py-1">
        {/* Title Section - Exact match */}
        <div className="mb-4 space-y-1 ">
          <h2 className="text-lg font-bold text-black">Itinerary</h2>
          <p className="text-sm text-gray-500 -mt-1">Day</p>
        </div>

        {/* Drag and Drop Context */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {items.map((item) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onViewLocation={handleViewLocation}
                  onCopyLink={handleCopyLink}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Maps Button - Exact match */}
        <div className="mt-6 flex justify-center">
          <Button
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            onClick={() => window.open("https://www.google.com/maps", "_blank")}
          >
            MAPS
            {/* <span className="bg-gray-700 text-white text-xs px-1.5 py-0.5 rounded">JD</span> */}
          </Button>
        </div>
      </div>
    </div>
  )
}
