import { useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { ChatArea } from "./components/ChatArea";
import { WelcomeArea } from "./components/WelcomeArea";
import { useToStore } from "./store/toStore";
import { useDataStore } from "./store/userdataStore";
import { useNavigate } from "react-router-dom";

function App() {
  const to_id = useToStore((state) => state.to_id);
  const set_to_id = useToStore((state) => state.set_to_id);
  const user_id = useDataStore((state) => state.user_id);
  const navigate = useNavigate();

  // Route guarding: Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token || user_id === 0) {
      navigate("/");
    }
  }, [user_id, navigate]);

  const handleBackToContacts = () => {
    set_to_id(0);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-0 md:p-4 bg-brand-deep">

      {/* Main Container Workspace */}
      <div className="w-full h-full max-w-7xl md:h-[90vh] glass-panel rounded-none md:rounded-2xl flex flex-row overflow-hidden shadow-2xl z-10">
        
        {/* Sidebar Container */}
        {/* Desktop: Always Visible | Mobile: Visible if no active chat selected */}
        <div
          className={`h-full w-full md:w-80 lg:w-96 md:block ${
            to_id !== 0 ? "hidden" : "block"
          }`}
        >
          <Sidebar />
        </div>

        {/* Chat / Welcome Area Container */}
        {/* Desktop: Always Visible | Mobile: Visible only if active chat selected */}
        <div
          className={`h-full flex-1 md:flex ${
            to_id === 0 ? "hidden" : "flex"
          }`}
        >
          {to_id !== 0 ? (
            <ChatArea onBackMobile={handleBackToContacts} />
          ) : (
            <WelcomeArea />
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
