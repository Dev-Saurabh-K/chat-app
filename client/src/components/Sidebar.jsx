import { useEffect, useState } from "react";
import axios from "axios";
import { Search, LogOut, MessageCircle, UserCheck } from "lucide-react";
import { usePeopleDataStore } from "../store/peopleDataStore";
import { useToStore } from "../store/toStore";
import { useDataStore } from "../store/userdataStore";
import { useChatStore } from "../store/chatStore";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

export const Sidebar = () => {
  const URL = `${import.meta.env.VITE_API_URL}/user/retrieve/users`;
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const setPeople = usePeopleDataStore((state) => state.setPeople);
  const peoples = usePeopleDataStore((state) => state.peoples);

  const to_id = useToStore((state) => state.to_id);
  const set_to_id = useToStore((state) => state.set_to_id);
  const remove_to_id = useToStore((state) => state.remove_to_id);

  const user_name = useDataStore((state) => state.user_name);
  const removeUser_id = useDataStore((state) => state.removeUser_id);
  const removeUsername = useDataStore((state) => state.removeUsername);

  const lastMessages = useChatStore((state) => state.lastMessages);
  const unreadCounts = useChatStore((state) => state.unreadCounts);
  const resetChatStore = useChatStore((state) => state.resetChatStore);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    if (!token) return;
    try {
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPeople(response.data);
    } catch (error) {
      console.error("Failed to sync users:", error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  // Poll for users to refresh online status
  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    removeUser_id();
    removeUsername();
    remove_to_id();
    resetChatStore();
    navigate("/");
  };

  // Filter users based on search
  const filteredPeoples = peoples.filter((people) =>
    people.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format message time preview
  const formatTime = (timeString) => {
    if (!timeString) return "";
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-brand-deep/95 backdrop-blur-md border-r border-brand-teal/10 relative z-20">
      {/* Sidebar Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-brand-teal/10 select-none">
        <Logo />
      </div>

      {/* User Search Bar */}
      <div className="p-3 select-none">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-brand-slate" />
          <input
            type="text"
            className="w-full bg-brand-deep/40 border border-brand-teal/10 hover:border-brand-teal/20 focus:border-brand-teal focus:outline-none rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-brand-slate/50 transition-all focus:ring-1 focus:ring-brand-teal"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto px-2 py-1 flex flex-col gap-1.5">
        <div className="text-[10px] font-bold text-brand-slate uppercase tracking-wider pl-3 py-1 select-none flex items-center gap-1.5">
          <MessageCircle className="size-3 text-brand-teal" />
          <span>Active Chats</span>
        </div>

        {filteredPeoples.length === 0 ? (
          <div className="text-center py-8 text-brand-slate/60 text-xs select-none">
            No contacts found
          </div>
        ) : (
          filteredPeoples.map((people) => {
            const lastMsg = lastMessages[people.id];
            const unreadCount = unreadCounts[people.id] || 0;
            const isSelected = people.id === to_id;

            return (
              <div
                key={people.id}
                onClick={() => set_to_id(people.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all select-none border-l-2 ${
                  isSelected
                    ? "bg-brand-light-glass border-brand-teal"
                    : "hover:bg-brand-light-glass/50 border-transparent"
                }`}
              >
                {/* User Avatar with Online Dot */}
                <div className="relative shrink-0">
                  <div
                    className={`size-10 rounded-full ${
                      isSelected
                        ? "bg-brand-teal text-brand-deep font-extrabold"
                        : "bg-brand-light-glass text-brand-mint border border-brand-slate/20"
                    } flex items-center justify-center font-bold font-outfit text-sm`}
                  >
                    {people.username.substring(0, 2).toUpperCase()}
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-brand-deep ${
                      people.active_status ? "bg-brand-teal online-pulse" : "bg-gray-500"
                    }`}
                  />
                </div>

                {/* Contact Text Metadata */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white truncate font-outfit">
                      {people.username}
                    </span>
                    {lastMsg?.time && (
                      <span className="text-[10px] text-brand-slate/75">
                        {formatTime(lastMsg.time)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-0.5 gap-2">
                    <p className="text-xs text-brand-slate truncate">
                      {lastMsg ? lastMsg.content : "No messages yet"}
                    </p>
                    {unreadCount > 0 && (
                      <span className="bg-brand-teal text-brand-deep font-bold text-[10px] size-4.5 rounded-full flex items-center justify-center shrink-0">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Logged in User Profile Footer */}
      <div className="p-4 border-t border-brand-teal/10 bg-brand-deep/80 backdrop-blur-md flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="size-9 rounded-full bg-brand-purple flex items-center justify-center border border-brand-teal/20 font-bold text-xs text-white shrink-0">
            {user_name.substring(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-brand-slate flex items-center gap-1 font-semibold">
              <UserCheck className="size-3 text-brand-teal" />
              Signed in
            </p>
            <p className="text-sm font-bold text-white truncate font-outfit">{user_name}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 hover:bg-red-500/10 text-brand-slate hover:text-red-400 rounded-xl cursor-pointer transition-all border border-transparent hover:border-red-500/20"
          title="Sign Out"
        >
          <LogOut className="size-4.5" />
        </button>
      </div>
    </div>
  );
};
