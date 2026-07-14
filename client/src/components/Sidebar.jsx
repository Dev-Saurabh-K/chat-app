import { SidebarIcon } from "lucide-react"
import axios from "axios"
import { useEffect } from "react"
import { usePeopleDataStore } from "../store/peopleDataStore"
import { useToStore } from "../store/toStore"
export const Sidebar = ({setSidebarOpen, sidebarOpen}) => {
  const URL = `${import.meta.env.VITE_API_URL}/user/retrieve/users`
  const token = localStorage.getItem("access_token")
  const setPeople = usePeopleDataStore((state)=>state.setPeople);
  const peoples = usePeopleDataStore((state)=>state.peoples);
  const set_to_id = useToStore((state)=>state.set_to_id);
  useEffect(()=>{
    const fetchUsers = async()=>{
      const response = await axios.get(URL,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      setPeople(response.data)
    }
    fetchUsers()
  },[])
  return (
    <div className="flex flex-col p-2 h-screen pt-16 bg-[#321E48] text-[#D9FFF4] gap-5 fixed left-0 min-w-40">
      <div onClick={()=>setSidebarOpen(!sidebarOpen)} className="hover:bg-[#43637E] w-fit h-fit p-2 rounded-md">
        <SidebarIcon/>
      </div>
      {peoples.map((people)=>(<div key={people.id} onClick={()=>set_to_id(people.id)} className="cursor-pointer">{people.username}</div>))}
      sidebar
    </div>
  )
}
