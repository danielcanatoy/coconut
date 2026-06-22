import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/", active: false },
  { label: "Services", path: "/services", active: false },
  { label: "Login", path: "/login", active: true },
  { label: "Signup", path: "/signup", active: false },
];

export const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON. stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("role", data.user.role);
      if (data.token) localStorage.setItem("token", data.token);

      navigate(data.user.role === "worker" ? "/worker" : "/to-hire");
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="bg-[#d4b896] w-full min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url(/rectangle-3.png)" }}
      />

      {/* Navbar — homepage style */}
      <nav className="fixed top-5 left-0 w-full z-50">
        <div className="relative w-full px-10 flex items-center justify-end">

          {/* Center Navbar */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-4 bg-[#00000066] rounded-full shadow-[0px_4px_4px_#00000040] px-6 h-[55px] backdrop-blur-sm">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`
                    flex items-center justify-center
                    min-w-[95px]
                    h-[40px]
                    rounded-full
                    font-['Jost']
                    text-base
                    font-medium
                    tracking-wide
                    transition-all duration-200 ease-out
                    ${
                      item.active
                        ? "text-[#ff9d00] bg-white/10"
                        : "text-white hover:bg-white/10"
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Button */}
          <Button
            onClick={() => navigate("/contact")}
            className="bg-[#FF9D00] rounded-full shadow-[0px_4px_4px_#00000040] h-[55px] px-8 text-base font-medium text-white hover:bg-[#d98400] transition-all duration-200"
          >
            Contact Us
          </Button>

        </div>
      </nav>

      <img
        className="absolute top-3.5 left-[22px] w-[174px] h-[174px] object-cover z-10"
        alt="Construct"
        src="/construct-1-1.png"
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left image */}
          <div className="relative h-[400px] rounded-[24px] overflow-hidden shadow-[0px_6px_12px_#00000040]">
            <img
              className="w-full h-full object-cover"
              alt="Construction workers"
              src="/rectangle-14.png"
            />
          </div>

          {/* Right login card */}
          <div className="bg-[#ff9d00] rounded-[24px] shadow-[0px_6px_12px_#00000040] p-8">
            <div className="text-center mb-6">
              <h1 className="[font-family:'Jost',Helvetica] font-bold text-black text-[48px] tracking-[0] leading-[normal] mb-1">
                LOGIN
              </h1>
              <p className="[font-family:'Jost',Helvetica] font-semibold text-black text-lg tracking-[0] leading-[normal]">
                Let's get you back in your Account!
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[44px] bg-[#e8e8e8] rounded-full px-4 [font-family:'Jost',Helvetica] font-normal text-black text-base border-0 placeholder:text-[#00000066] placeholder:italic focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[44px] bg-[#e8e8e8] rounded-full px-4 [font-family:'Jost',Helvetica] font-normal text-black text-base border-0 placeholder:text-[#00000066] placeholder:italic focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <div className="flex justify-center">
                <button className="[font-family:'Jost',Helvetica] font-normal italic text-black text-sm tracking-[0] leading-[normal] underline hover:no-underline transition-all duration-200 ease-out active:scale-[0.98]">
                  Forgot your Password?
                </button>
              </div>

              <div className="flex justify-center pt-3">
                <Button
                  onClick={handleLogin}
                  className="bg-white hover:bg-gray-100 text-black rounded-[48px] h-[44px] w-[180px] [font-family:'Jost',Helvetica] font-semibold text-lg transition-all duration-200 ease-out
                  hover:bg-[#FFC05B] hover:shadow-md hover:-translate-y-[1px]
                  active:scale-[0.98]"
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};