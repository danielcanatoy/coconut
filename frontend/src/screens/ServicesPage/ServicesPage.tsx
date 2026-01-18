import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { AuthModal } from "../../components/AuthModal/AuthModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Services", path: "/services", active: true },
  { label: "Home", path: "/", active: false },
  { label: "Login", path: "/login", active: false },
  { label: "Signup", path: "/signup", active: false },
];

export const ServicesPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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

      <div className="relative z-10 pt-[200px] pb-20 px-8">
        <h1 className="text-center [font-family:'Jost',Helvetica] font-bold text-black text-[64px] tracking-[0] leading-[normal] mb-16">
          What Will It Be?
        </h1>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <Card className="bg-[#ff9d00] border-none rounded-[30px] shadow-[0px_8px_16px_#00000040]">
            <CardContent className="p-12 flex flex-col items-center">
              <h2 className="[font-family:'Jost',Helvetica] font-bold text-black text-[32px] text-center tracking-[0] leading-[normal] mb-6">
                Need to Hire Workers?
              </h2>

              <p className="[font-family:'Jost',Helvetica] font-normal text-black text-lg text-center tracking-[0] leading-[normal] mb-8">
                Manpower not enough in your current project? Or just seeking manpower in general?
              </p>

              <ul className="[font-family:'Jost',Helvetica] font-normal text-black text-lg mb-8 space-y-2 self-start">
                <li>· Reliable</li>
                <li>· Professional</li>
                <li>· Hardworking</li>
                <li>· Honest</li>
                <li>· Disciplined</li>
              </ul>

              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-white hover:bg-gray-100 text-black rounded-[60px] h-[54px] px-10 [font-family:'Jost',Helvetica] font-semibold text-xl mt-4"
              >
                Hire Workers
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#ff9d00] border-none rounded-[30px] shadow-[0px_8px_16px_#00000040]">
            <CardContent className="p-12 flex flex-col items-center">
              <h2 className="[font-family:'Jost',Helvetica] font-bold text-black text-[32px] text-center tracking-[0] leading-[normal] mb-6">
                Apply to Become a Worker!
              </h2>

              <p className="[font-family:'Jost',Helvetica] font-normal text-black text-lg text-center tracking-[0] leading-[normal] mb-8">
                Looking for a job? Skilled manpower like you is always in demand!
              </p>

              <ul className="[font-family:'Jost',Helvetica] font-normal text-black text-lg mb-8 space-y-2 self-start">
                <li>· Reliable</li>
                <li>· Professional</li>
                <li>· Hardworking</li>
                <li>· Honest</li>
                <li>· Disciplined</li>
              </ul>

              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-white hover:bg-gray-100 text-black rounded-[60px] h-[54px] px-10 [font-family:'Jost',Helvetica] font-semibold text-xl mt-4"
              >
                Find Work
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};
