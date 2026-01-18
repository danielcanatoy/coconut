import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Services", path: "/services", active: false },
  { label: "Home", path: "/", active: false },
  { label: "Login", path: "/login", active: true },
  { label: "Signup", path: "/signup", active: false },
];

export const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      navigate(data.user.role === "worker" ? "/worker" : "/to-hire");
    }
  };

  return (
    <div className="bg-[#d4b896] w-full min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url(/rectangle-3.png)" }}
      />

      <nav className="fixed top-[38px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-[154px]">
        <div className="flex items-center gap-8 bg-[#00000066] rounded-[60px] shadow-[0px_4px_4px_#00000040] px-[50px] h-[59px]">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`[font-family:'Jost',Helvetica] font-normal text-2xl tracking-[0] leading-[normal] ${
                item.active ? "text-[#ff9d00]" : "text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Button
          onClick={() => navigate("/")}
          className="bg-[#00000066] rounded-[60px] shadow-[0px_4px_4px_#00000040] h-[59px] w-[197px] hover:bg-[#00000080]"
        >
          <span className="[font-family:'Jost',Helvetica] font-normal text-white text-2xl tracking-[0] leading-[normal]">
            Contact us
          </span>
        </Button>
      </nav>

      <img
        className="absolute top-3.5 left-[22px] w-[174px] h-[174px] object-cover z-10"
        alt="Construct"
        src="/construct-1-1.png"
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8 pt-32">
        <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-[30px] overflow-hidden shadow-[0px_8px_16px_#00000040]">
            <img
              className="w-full h-full object-cover"
              alt="Construction workers"
              src="/rectangle-14.png"
            />
          </div>

          <div className="bg-[#ff9d00] rounded-[30px] shadow-[0px_8px_16px_#00000040] p-12">
            <div className="text-center mb-8">
              <h1 className="[font-family:'Jost',Helvetica] font-bold text-black text-[64px] tracking-[0] leading-[normal] mb-2">
                LOGIN
              </h1>
              <p className="[font-family:'Jost',Helvetica] font-semibold text-black text-xl tracking-[0] leading-[normal]">
                Let's get you back in your Account!
              </p>
            </div>

            <div className="space-y-6">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[54px] bg-[#e8e8e8] rounded-full px-6 [font-family:'Jost',Helvetica] font-normal text-black text-lg border-0 placeholder:text-[#00000066] placeholder:italic focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[54px] bg-[#e8e8e8] rounded-full px-6 [font-family:'Jost',Helvetica] font-normal text-black text-lg border-0 placeholder:text-[#00000066] placeholder:italic focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <div className="text-right">
                <button className="[font-family:'Jost',Helvetica] font-normal italic text-black text-sm tracking-[0] leading-[normal] underline hover:no-underline">
                  Forgot your Password?
                </button>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleLogin}
                  className="bg-white hover:bg-gray-100 text-black rounded-[60px] h-[54px] w-[200px] [font-family:'Jost',Helvetica] font-semibold text-xl"
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
