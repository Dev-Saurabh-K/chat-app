import { LogIn } from "lucide-react"
import Logo from "./Logo"
import { useNavigate } from "react-router-dom"

export const Navbar = () => {
  const navigate = useNavigate();
  const handleClickOnLogin = () =>{
    navigate("/")
  }
  return (
    <div className="fixed top-0 w-full h-fit bg-[#D9FFF4] text-[#321E48] flex items-center justify-center gap-10">
      <Logo/>
      <div className="flex flex-row items-center justify-center border border-[#43637E] rounded-sm font-bold px-2 cursor-pointer" onClick={handleClickOnLogin}><LogIn className="size-4 text-[#321E48]"/>Login</div>
      </div>
  )
}
