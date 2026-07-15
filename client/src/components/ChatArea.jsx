import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import {
  Send,
  Smile,
  ArrowLeft,
  Phone,
  Video,
  Search,
  MoreVertical,
  Check,
  CheckCheck,
  Loader2,
  Lock,
} from "lucide-react";
import { useToStore } from "../store/toStore";
import { useDataStore } from "../store/userdataStore";
import { usePeopleDataStore } from "../store/peopleDataStore";
import { useChatStore } from "../store/chatStore";

const EMOJIS = ["😀", "😂", "🥰", "😍", "👍", "🔥", "🎉", "❤️", "🙌", "✨", "🚀", "💡", "👀", "🤔", "👏", "💩"];

export const ChatArea = ({ onBackMobile }) => {
  const to_id = useToStore((state) => state.to_id);
  const user_id = useDataStore((state) => state.user_id);
  const peoples = usePeopleDataStore((state) => state.peoples);
  const clearUnread = useChatStore((state) => state.clearUnread);
  const incrementUnread = useChatStore((state) => state.incrementUnread);
  const updateLastMessage = useChatStore((state) => state.updateLastMessage);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSocketConnecting, setIsSocketConnecting] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Find recipient details
  const targetUser = useMemo(() => {
    return peoples.find((p) => p.id === to_id) || { username: "Chat Partner", active_status: false };
  }, [peoples, to_id]);

  // Handle outside click for emoji picker
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Fetch Message History and Establish WebSocket Connection
  useEffect(() => {
    if (!to_id || !user_id) return;

    // 1. Fetch History
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const URL = `${import.meta.env.VITE_API_URL}/user/retrieve/message?to_id=${to_id}`;
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
        clearUnread(to_id); // Clear notifications on opening chat
      } catch (error) {
        console.error("Failed to load message history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();

    // 2. Establish WebSocket
    setIsSocketConnecting(true);
    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    let wsBase = apiUrl.replace(/^http/, "ws");
    if (wsBase.endsWith("/")) wsBase = wsBase.slice(0, -1);
    const wsUrl = `${wsBase}/ws?from=${user_id}&to=${to_id}`;

    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connection established");
      setIsSocketConnecting(false);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Payload format: { sender_id, message }
        if (data.sender_id === to_id) {
          // If from the active user, add to messages list and auto-seen is implied
          const newMsg = {
            id: Date.now() + Math.random(),
            sender_id: data.sender_id,
            receiver_id: user_id,
            status: 2,
            content: data.message,
            created_at: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, newMsg]);
          updateLastMessage(to_id, data.message, newMsg.created_at);
        } else {
          // If from another user, increment their unread count
          incrementUnread(data.sender_id);
          updateLastMessage(data.sender_id, data.message, new Date().toISOString());
        }
      } catch (err) {
        console.error("Failed to process socket payload:", err);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      setIsSocketConnecting(false);
    };

    socket.onerror = (err) => {
      console.error("WebSocket encountered error:", err);
      setIsSocketConnecting(false);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close();
      }
    };
  }, [to_id, user_id, clearUnread, incrementUnread, updateLastMessage]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const text = inputText.trim();
      socketRef.current.send(text);

      const timestamp = new Date().toISOString();
      const statusValue = targetUser.active_status ? 2 : 1;

      // Append locally
      const localMsg = {
        id: Date.now(),
        sender_id: user_id,
        receiver_id: to_id,
        status: statusValue,
        content: text,
        created_at: timestamp,
      };

      setMessages((prev) => [...prev, localMsg]);
      updateLastMessage(to_id, text, timestamp);
      setInputText("");
      setShowEmojiPicker(false);
    } else {
      console.error("Socket not connected. Cannot send message.");
    }
  };

  // Helper: Format message time
  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    } catch {
      return "";
    }
  };

  // Helper: Format message Date headers
  const getGroupedMessages = () => {
    const groups = {};
    messages.forEach((msg) => {
      const dateKey = new Date(msg.created_at).toDateString();
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(msg);
    });
    return groups;
  };

  const getFriendlyDateHeader = (dateStr) => {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (dateStr === today) return "Today";
    if (dateStr === yesterdayStr) return "Yesterday";

    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const addEmoji = (emoji) => {
    setInputText((prev) => prev + emoji);
  };

  const groupedMessages = getGroupedMessages();

  return (
    <div className="flex-1 h-full flex flex-col glass-panel-light rounded-r-2xl border-l border-brand-teal/10 relative overflow-hidden">
      {/* Header */}
      <div className="h-16 border-b border-brand-teal/10 bg-brand-deep/80 backdrop-blur-md px-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackMobile}
            className="md:hidden p-2 text-brand-slate hover:text-white rounded-lg hover:bg-brand-light-glass transition-all"
          >
            <ArrowLeft className="size-5" />
          </button>

          {/* Avatar with status indicator */}
          <div className="relative">
            <div className="size-10 rounded-full bg-brand-light-glass flex items-center justify-center font-bold font-outfit text-brand-mint border border-brand-slate/25 text-sm">
              {targetUser.username.substring(0, 2).toUpperCase()}
            </div>
            <div
              className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-brand-deep ${
                targetUser.active_status ? "bg-brand-teal online-pulse" : "bg-gray-500"
              }`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-white font-outfit text-sm tracking-wide">
              {targetUser.username}
            </h3>
            <span className="text-[11px] font-medium text-brand-slate">
              {targetUser.active_status ? (
                <span className="text-brand-teal font-semibold">online</span>
              ) : (
                <span>offline</span>
              )}
            </span>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 text-brand-slate">
          <button className="p-2 hover:text-brand-teal rounded-lg hover:bg-brand-light-glass cursor-pointer transition-all">
            <Phone className="size-4.5" />
          </button>
          <button className="p-2 hover:text-brand-teal rounded-lg hover:bg-brand-light-glass cursor-pointer transition-all">
            <Video className="size-4.5" />
          </button>
          <button className="p-2 hover:text-brand-teal rounded-lg hover:bg-brand-light-glass cursor-pointer transition-all">
            <Search className="size-4.5" />
          </button>
          <button className="p-2 hover:text-brand-teal rounded-lg hover:bg-brand-light-glass cursor-pointer transition-all">
            <MoreVertical className="size-4.5" />
          </button>
        </div>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6 relative">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-2">
            <Loader2 className="size-8 text-brand-teal animate-spin" />
            <span className="text-xs text-brand-slate">Fetching message archives...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-2">
            <div className="text-4xl">👋</div>
            <span className="text-sm font-semibold text-white">No messages yet</span>
            <span className="text-xs text-brand-slate max-w-xs leading-relaxed">
              Start the discussion by typing a message below.
            </span>
          </div>
        ) : (
          Object.keys(groupedMessages).map((dateKey) => (
            <div key={dateKey} className="flex flex-col gap-4">
              {/* Date divider */}
              <div className="flex items-center justify-center my-2">
                <span className="bg-brand-deep/90 border border-brand-teal/10 px-3 py-1 rounded-full text-[10px] font-bold text-brand-slate uppercase tracking-wider shadow-sm select-none">
                  {getFriendlyDateHeader(dateKey)}
                </span>
              </div>

              {/* Day's messages */}
              {groupedMessages[dateKey].map((msg) => {
                const isMine = msg.sender_id === user_id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col w-full animate-fade-in ${
                      isMine ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2.5 rounded-xl text-sm relative break-words border ${
                        isMine
                          ? "bg-brand-teal text-brand-deep font-medium rounded-tr-none border-brand-teal/10"
                          : "bg-brand-light-glass text-brand-mint rounded-tl-none border-brand-slate/25"
                      }`}
                    >
                      {/* Message Content */}
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                      {/* Message Meta Info */}
                      <div className="flex items-center justify-end gap-1.5 mt-1 select-none">
                        <span className={`text-[9px] ${isMine ? "text-brand-deep/60" : "text-brand-slate/75"}`}>
                          {formatTime(msg.created_at)}
                        </span>
                        {isMine && (
                          <span>
                            {msg.status === 2 ? (
                              <CheckCheck className="size-3 text-brand-deep/80" />
                            ) : (
                              <Check className="size-3 text-brand-deep/40" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input container */}
      <div className="p-4 border-t border-brand-teal/10 bg-brand-deep/60 backdrop-blur-md relative">
        {isSocketConnecting && (
          <div className="absolute inset-x-0 -top-6 h-6 bg-brand-purple/20 backdrop-blur-sm flex items-center justify-center gap-1.5 border-t border-brand-teal/10 text-[10px] text-brand-teal select-none">
            <Loader2 className="size-3 animate-spin" />
            Connecting chat channel...
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-center gap-2 relative">
          <div className="relative" ref={emojiPickerRef}>
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2.5 text-brand-slate hover:text-brand-teal rounded-xl hover:bg-brand-light-glass cursor-pointer transition-all"
            >
              <Smile className="size-5.5" />
            </button>

            {/* Premium Emoji picker panel */}
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 glass-panel p-3 rounded-xl shadow-xl grid grid-cols-4 gap-2 w-44 z-50 animate-fade-in">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => addEmoji(emoji)}
                    className="text-xl hover:scale-125 transition-transform p-1 hover:bg-brand-light-glass rounded-lg cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            className="flex-1 bg-brand-deep/80 border border-brand-teal/10 focus:border-brand-teal focus:outline-none rounded-xl py-3 px-4 text-white text-sm placeholder-brand-slate/50 transition-all focus:ring-1 focus:ring-brand-teal focus:glow-teal"
            placeholder="Type a secure message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isSocketConnecting}
          />

          <button
            type="submit"
            className="bg-brand-teal hover:bg-brand-teal/90 text-brand-deep p-3 rounded-xl hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none shrink-0"
            disabled={!inputText.trim() || isSocketConnecting}
          >
            <Send className="size-4.5 fill-current" />
          </button>
        </form>

        <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[10px] text-brand-slate/40 select-none">
          <Lock className="size-3" />
          <span>Messages are locally stored in real-time</span>
        </div>
      </div>
    </div>
  );
};
