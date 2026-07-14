import { Navbar } from "./components/Navbar";
import { SidebarIcon } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { useState } from "react";
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="w-screen h-screen bg-zinc-100 flex items-center justify-center flex-row font-roboto border-2 border-[#D9FFF4]">
      <div className="h-screen w-fit">
        {sidebarOpen ? <Sidebar /> : <div  onClick={toggleSidebar} className="fixed top-4 left-4 hover:bg-[#65DCD5] p-2 rounded-md z-10"><SidebarIcon/></div>}
      </div>
      <Navbar />
      chatapp
    </div>
  );
}

export default App;
