import { MessageCircle, Phone} from "lucide-react"

export const Sidebar = () => {
  return (
    <div className="flex flex-col fixed left-0 p-2 h-full pt-16 bg-[#321E48] text-[#D9FFF4] gap-5">
      <div><MessageCircle/></div>
      <div><Phone/></div>
    </div>
  )
}
