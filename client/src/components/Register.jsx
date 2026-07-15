import Logo from "./Logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserPlus, KeyRound, User, Eye, EyeOff, AlertTriangle, CheckCircle } from "lucide-react";

export const Register = () => {
  const URL = `${import.meta.env.VITE_API_URL}/auth/register`;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg("Please enter a username and password");
      return;
    }

    if (password.length < 4) {
      setErrorMsg("Password must be at least 4 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await axios.post(URL, {
        username: username.trim(),
        password: password,
      });

      setSuccessMsg("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      if (error.response) {
        const detail = error.response.data?.detail || "Registration failed. Username may already be taken.";
        setErrorMsg(detail);
      } else {
        setErrorMsg("Connection to the server failed. Make sure the backend is running.");
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-4 select-none bg-brand-deep">

      <div className="w-full max-w-md glass-panel p-8 rounded-2xl flex flex-col items-center gap-6 animate-fade-in relative z-10">
        <Logo />

        <div className="text-center -mt-2">
          <h2 className="text-xl font-bold font-outfit text-white">Create an Account</h2>
          <p className="text-sm text-brand-slate mt-1">Get started chatting with your peers</p>
        </div>

        {errorMsg && (
          <div className="w-full bg-red-500/10 border border-red-500/20 text-red-300 text-sm p-3 rounded-lg flex items-center gap-2.5 animate-pulse">
            <AlertTriangle className="size-4.5 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm p-3 rounded-lg flex items-center gap-2.5">
            <CheckCircle className="size-4.5 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 relative">
            <label className="text-xs font-semibold text-brand-mint/80 uppercase tracking-wider pl-1">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-brand-slate" />
              <input
                type="text"
                autoComplete="username"
                className="w-full pl-10 pr-4 py-3 bg-brand-deep/60 border border-brand-teal/10 hover:border-brand-teal/20 focus:border-brand-teal focus:outline-none rounded-xl text-white placeholder-brand-slate/60 text-sm transition-all focus:ring-1 focus:ring-brand-teal focus:glow-teal"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Choose a username"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 relative">
            <label className="text-xs font-semibold text-brand-mint/80 uppercase tracking-wider pl-1">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-brand-slate" />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                className="w-full pl-10 pr-10 py-3 bg-brand-deep/60 border border-brand-teal/10 hover:border-brand-teal/20 focus:border-brand-teal focus:outline-none rounded-xl text-white placeholder-brand-slate/60 text-sm transition-all focus:ring-1 focus:ring-brand-teal focus:glow-teal"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Create password (min 4 chars)"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-slate hover:text-brand-teal transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 relative">
            <label className="text-xs font-semibold text-brand-mint/80 uppercase tracking-wider pl-1">
              Confirm Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-brand-slate" />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                className="w-full pl-10 pr-4 py-3 bg-brand-deep/60 border border-brand-teal/10 hover:border-brand-teal/20 focus:border-brand-teal focus:outline-none rounded-xl text-white placeholder-brand-slate/60 text-sm transition-all focus:ring-1 focus:ring-brand-teal focus:glow-teal"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="Confirm password"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 bg-brand-teal hover:bg-brand-teal/90 text-brand-deep font-bold py-3.5 rounded-xl cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="size-5 border-2 border-brand-deep border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <UserPlus className="size-4.5 text-brand-deep" />
                <span>Register</span>
              </>
            )}
          </button>
        </form>

        <div className="w-full border-t border-brand-teal/10 pt-4 flex flex-col items-center gap-2">
          <p className="text-xs text-brand-slate">
            Already registered?{" "}
            <span
              onClick={() => !isLoading && navigate("/")}
              className="text-brand-teal hover:text-brand-mint font-semibold hover:underline cursor-pointer transition-colors"
            >
              Sign in instead
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
