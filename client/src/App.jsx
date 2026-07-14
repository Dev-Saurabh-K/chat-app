import { Navbar } from "./components/Navbar";
import { SidebarIcon } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { useState } from "react";
import { useToStore } from "./store/toStore";
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const to_id = useToStore((state)=>state.to_id);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="w-screen h-screen bg-zinc-100 flex items-center justify-center flex-row font-roboto border-2 border-[#D9FFF4]">
      <div className="h-screen w-fit">
        {sidebarOpen ? <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/> : <div  onClick={toggleSidebar} className="fixed top-4 left-4 hover:bg-[#65DCD5] p-2 rounded-md z-10"><SidebarIcon/></div>}
      </div>
      <Navbar />
      chatapp
      <div>{to_id}</div>
    </div>
  );
}

export default App;
