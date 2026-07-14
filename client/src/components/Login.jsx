import Logo from "./Logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogIn } from "lucide-react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const URL = `${import.meta.env.VITE_API_URL}/auth/login`;
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const loginresponse = await axios.post(
        URL,
        new URLSearchParams({
          username: username,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      console.log(loginresponse.data.access_token);
      localStorage.setItem(loginresponse.data.access_token, "access_token");
      navigate("/chat")
    } catch (error) {
      if (error.response) {
        console.error(error.response.data, "login failed");
      } else {
        console.error("Network error", error.message);
      }
    }
  };

  const handleClickRegister = async() =>{
    navigate("/register")
  }

  return (
    <div className="bg-[#43637E] text-[#D9FFF4] border border-[#65DCD5] rounded-md flex items-center justify-center flex-col gap-10 w-screen h-screen">
      <Logo />
      <div className="flex flex-col border border-[#321E48] p-4 rounded-md gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="flex gap-2">
            Username
            <input
              type="text"
              className="focus:outline-none caret-[#65DCD5] border border-[#43637E] focus:border-[#65DCD5] rounded-md"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </label>
          <label htmlFor="password" className="flex gap-2">
            Password
            <input
              type="password"
              className="focus:outline-none caret-[#65DCD5] border border-[#43637E] focus:border-[#65DCD5] rounded-md"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
        </div>
        <div
          className="flex items-center justify-center bg-[#321E48] p-2 rounded-md cursor-pointer gap-1"
          onClick={handleLogin}
        >
          <LogIn className="size-4" />
          Login
        </div>
      <div onClick={handleClickRegister} className="flex justify-center items-center hover:underline cursor-pointer">new to chat-app? register here..</div>
      </div>
    </div>
  );
};
