import { MessageSquare, ShieldCheck, Zap, Heart } from "lucide-react";
import Logo from "./Logo";
import { useDataStore } from "../store/userdataStore";

export const WelcomeArea = () => {
  const user_name = useDataStore((state) => state.user_name);
  return (
    <div className="flex-1 h-full flex flex-col items-center justify-center p-8 select-none bg-brand-purple">

      <div className="flex flex-col items-center max-w-md text-center gap-6 animate-fade-in">
        <Logo />

        <h1 className="text-2xl font-black font-outfit text-brand-teal -mt-2 tracking-wide glow-text-teal">
          Welcome, {user_name} 👋
        </h1>

        <div className="relative">
          <div className="relative bg-brand-deep border border-brand-teal/20 p-6 rounded-full inline-flex items-center justify-center">
            <MessageSquare className="size-10 text-brand-teal" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold font-outfit text-white tracking-wide">
            Your conversations, instant and secure
          </h2>
          <p className="text-sm text-brand-slate leading-relaxed">
            Select a peer from the side drawer to begin chatting. Your messages are sent in real-time and saved directly.
          </p>
        </div>

        {/* Feature quick-list to look premium */}
        <div className="grid grid-cols-2 gap-3.5 w-full mt-6">
          <div className="glass-panel-light p-3.5 rounded-xl flex flex-col items-center gap-1.5 border border-brand-teal/5">
            <Zap className="size-5 text-brand-teal" />
            <span className="text-xs font-bold text-white">Instant Websockets</span>
            <span className="text-[10px] text-brand-slate">Sub-millisecond delivery</span>
          </div>
          <div className="glass-panel-light p-3.5 rounded-xl flex flex-col items-center gap-1.5 border border-brand-teal/5">
            <ShieldCheck className="size-5 text-brand-teal" />
            <span className="text-xs font-bold text-white">State Saved</span>
            <span className="text-[10px] text-brand-slate">Database-backed chat</span>
          </div>
        </div>

        <div className="mt-8 text-[11px] text-brand-slate/40 flex items-center gap-1">
          Made with <Heart className="size-3 text-red-500 fill-red-500" /> for Dev-Saurabh-K
        </div>
      </div>
    </div>
  );
};
