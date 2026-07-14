import { UserPlus } from "lucide-react";
import Logo from "./Logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Register = () => {
  const URL = `${import.meta.env.VITE_API_URL}/auth/register`;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log(URL);
    try {
      const registerResponse = await axios.post(URL, {
        username: username,
        password: password,
      });
      console.log(registerResponse.data);
       navigate("/")
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error(error);
      }
    }

   
  };

  const handleClickOnRegistered = () => {
    navigate("/");
  };
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
              placeholder="username"
            />
          </label>
          <label htmlFor="password" className="flex gap-2">
            Password
            <input
              type="password"
              className="focus:outline-none caret-[#65DCD5] border border-[#43637E] focus:border-[#65DCD5] rounded-md"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="password"
            />
          </label>
        </div>
        <div
          className="flex items-center justify-center bg-[#321E48] p-2 rounded-md cursor-pointer gap-1"
          onClick={handleRegister}
        >
          <UserPlus className="size-4" />
          Register
        </div>
        <div
          className="hover:underline cursor-pointer flex items-center justify-center"
          onClick={handleClickOnRegistered}
        >
          Already registered?
        </div>
      </div>
    </div>
  );
};
