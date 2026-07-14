import { LogIn } from "lucide-react"

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-fit bg-[#321E48] text-[#D9FFF4] flex items-center justify-center gap-10">
      navbar
      <div className="flex flex-row items-center justify-center border border-[#43637E] rounded-sm "><LogIn className="size-4"/>Login</div>
      </div>
  )
}
