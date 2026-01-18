import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Services", path: "/services", active: false },
  { label: "Home", path: "/", active: false },
  { label: "Login", path: "/login", active: false },
  { label: "Signup", path: "/signup", active: true },
];

export const SignupPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"worker" | "employer" | null>(null);

  const handleSignup = () => {
    console.log("Signup attempt:", { email, password, userType });

    navigate(userType === "worker" ? "/worker" : "/to-hire", {
      state: {
        email,
        password,
        userType,
      },
    });
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
            <div className="relative w-full h-full">
              <div className="absolute inset-0 grid grid-cols-2">
                <img
                  className="w-full h-full object-cover"
                  alt="Construction site"
                  src="/rectangle-27.png"
                />
                <img
                  className="w-full h-full object-cover"
                  alt="Construction worker"
                  src="/rectangle-28.png"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-[8px] bg-[#ff9d00] transform rotate-[20deg] scale-150" />
              </div>
            </div>
          </div>

          <div className="bg-[#ff9d00] rounded-[30px] shadow-[0px_8px_16px_#00000040] p-12">
            <div className="text-center mb-8">
              <h1 className="[font-family:'Jost',Helvetica] font-bold text-black text-[64px] tracking-[0] leading-[normal] mb-2">
                SIGNUP
              </h1>
              <p className="[font-family:'Jost',Helvetica] font-semibold text-black text-xl tracking-[0] leading-[normal]">
                Create Your Account Today!
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

              <div className="space-y-3">
                <p className="text-center [font-family:'Jost',Helvetica] font-medium italic text-black text-sm tracking-[0] leading-[normal]">
                  *Choose one of the following*
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => setUserType("worker")}
                    className={`h-[54px] rounded-full [font-family:'Jost',Helvetica] font-semibold text-xl ${
                      userType === "worker"
                        ? "bg-white text-black"
                        : "bg-[#e8e8e8] text-black hover:bg-white"
                    }`}
                  >
                    To Work
                  </Button>

                  <Button
                    onClick={() => setUserType("employer")}
                    className={`h-[54px] rounded-full [font-family:'Jost',Helvetica] font-semibold text-xl ${
                      userType === "employer"
                        ? "bg-white text-black"
                        : "bg-[#e8e8e8] text-black hover:bg-white"
                    }`}
                  >
                    To Hire
                  </Button>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleSignup}
                  className="bg-white hover:bg-gray-100 text-black rounded-[60px] h-[54px] w-[200px] [font-family:'Jost',Helvetica] font-semibold text-xl"
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
