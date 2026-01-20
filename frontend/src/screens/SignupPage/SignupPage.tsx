import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/", active: false },
  { label: "Services", path: "/services", active: false },
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

      <nav className="fixed top-[20px] left-0 w-full z-50">
        <div className="relative w-full px-10 flex items-center justify-end">
          {/* Centered Navbar */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-6 bg-[#00000066] rounded-[40px] shadow-[0px_4px_4px_#00000040] px-8 h-[50px]">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`relative px-3 py-1 rounded-full
                    [font-family:'Jost',Helvetica] font-normal text-xl
                    transition-all duration-200 ease-out
                    ${
                      item.active
                        ? "text-[#ff9d00] bg-white/10"
                        : "text-white hover:bg-white/10"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Us Button (Right Side) */}
          <Button
            onClick={() => navigate("/contact")}
            className="bg-[#FF9D00] rounded-[40px] shadow-[0px_4px_4px_#00000040] h-[50px] px-8 text-white text-xl hover:bg-[#00000080]"
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
          {/* Left images */}
          <div className="relative h-[400px] rounded-[24px] overflow-hidden shadow-[0px_6px_12px_#00000040]">
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
          </div>

          {/* Right signup card */}
          <div className="bg-[#ff9d00] rounded-[24px] shadow-[0px_6px_12px_#00000040] p-8">
            <div className="text-center mb-6">
              <h1 className="[font-family:'Jost',Helvetica] font-bold text-black text-[48px] tracking-[0] leading-[normal] mb-1">
                SIGNUP
              </h1>
              <p className="[font-family:'Jost',Helvetica] font-semibold text-black text-lg tracking-[0] leading-[normal]">
                Create Your Account Today!
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

              <div className="space-y-2">
                <p className="text-center [font-family:'Jost',Helvetica] font-medium italic text-black text-sm tracking-[0] leading-[normal]">
                  *Choose one of the following*
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    onClick={() => setUserType("worker")}
                    className={`h-[44px] rounded-full font-semibold text-lg
                      transition-all duration-200 ease-out shadow-md hover:shadow-lg
                      border border-[#FF9D00]/30 hover:border-[#FF9D00]/50
                      ${
                        userType === "worker"
                          ? "bg-[#945B00] text-white shadow-xl hover:shadow-2xl"
                          : "bg-white/70 text-[#000000] hover:bg-white/90"
                      }
                      active:scale-95 focus-visible:ring-2 focus-visible:ring-[#FF9D00]/50`}
                  >
                    To Work
                  </Button>

                  <Button
                    type="button"
                    onClick={() => setUserType("employer")}
                    className={`h-[44px] rounded-full font-semibold text-lg
                      transition-all duration-200 ease-out shadow-md hover:shadow-lg
                      border border-[#FF9D00]/30 hover:border-[#FF9D00]/50
                      ${
                        userType === "employer"
                          ? "bg-[#945B00] text-white shadow-xl hover:shadow-2xl"
                          : "bg-white/70 text-[#000000] hover:bg-white/90"
                      }
                      active:scale-95 focus-visible:ring-2 focus-visible:ring-[#FF9D00]/50`}
                  >
                    To Hire
                  </Button>
                </div>
              </div>

              <div className="flex justify-center pt-3">
                <Button
                  onClick={handleSignup}
                  className="bg-white hover:bg-gray-100 text-black rounded-[48px] h-[44px] w-[180px] [font-family:'Jost',Helvetica] font-semibold text-lg transition-all duration-200 ease-out
                            hover:bg-[#FFC05B] hover:shadow-md hover:-translate-y-[1px]
                            active:scale-[0.98]"
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
