# 🗂️ Itinerary Planner with Drag-and-Drop

A beautifully interactive **drag-and-drop itinerary planner** built using **React**, **@dnd-kit**, and **Tailwind CSS**. Users can easily reorder activity cards, edit details, and manage travel plans in a seamless interface.

---

## 🚀 Features

✅ Intuitive drag-and-drop interaction  
✅ Inline editing of activity descriptions  
✅ Dropdown menu with options (Map, Copy, Delete)  
✅ Tags/Badges for additional metadata (e.g., credits)  
✅ Responsive layout with clean UI components

---

## 🛠️ Tech Stack

| Layer        | Technology                 |
|--------------|----------------------------|
| Frontend     | React (TypeScript Ready)   |
| Drag & Drop  | [`@dnd-kit`](https://dndkit.com) |
| Styling      | Tailwind CSS               |
| UI Components| ShadCN UI, Lucide Icons    |
| Image Handling| next/image (for optimization) |

---

## ⚙️ How It Works

- `SortableItem` uses `useSortable()` from **@dnd-kit** to register the card as a draggable item.
- `CSS.Transform.toString()` is used to animate card position updates smoothly.
- State is managed with React hooks (`useState`) for edit toggling, content changes, and conditional rendering.
- Reusable components like `Card`, `Badge`, and `DropdownMenu` make it scalable.

---

## 🧠 Challenges & Solutions

| Challenge | Solution |
|----------|----------|
| Responsiveness of dynamic draggable cards | Used Tailwind’s grid/flex layout + `DnD Kit` transform utilities |
| Preventing drag interference with buttons/editing | Used `e.stopPropagation()` on interactive elements |

---

## 💡 Future Improvements

- [ ] Add local or backend storage for persistent state  
- [ ] Enable dynamic card addition via modal/form  
- [ ] Mobile-first UI refinements  
- [ ] Add dark mode switch

---

## 🙋‍♂️ Author

**Chitta Ranjan**  
🧑‍💻 MCA | React & Full Stack Enthusiast  
📫 chittaranjan@example.com  
🔗 [GitHub](https://github.com/chittaranjan27)

---

> If you like this project, consider giving it a ⭐ on GitHub!


