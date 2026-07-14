import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Login } from "./components/Login";

function App() {
  return <div className="w-screen h-screen bg-zinc-100 flex items-center justify-center flex-row font-roboto">
    <Navbar/>
    <Sidebar/>
    <Login/>
    </div>;
}

export default App;
