import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { AuthModal } from "../../components/AuthModal/AuthModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  
  { label: "Home", path: "/", active: false },
  { label: "Services", path: "/services", active: true },
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

      <div className="relative z-10 pt-[140px] pb-16 px-6">
  <h1 className="text-center [font-family:'Jost',Helvetica] font-bold text-black text-[48px] tracking-[0] leading-[normal] mb-12">
    What Will It Be?
  </h1>

  <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
    <Card className="bg-[#ff9d00] border-none rounded-[24px] shadow-[0px_6px_12px_#00000040]">
      <CardContent className="p-8 flex flex-col items-center">
        <h2 className="[font-family:'Jost',Helvetica] font-bold text-black text-[28px] text-center tracking-[0] leading-[normal] mb-4">
          Need to Hire Workers?
        </h2>

        <p className="[font-family:'Jost',Helvetica] font-normal text-black text-base text-center tracking-[0] leading-[normal] mb-6">
          Manpower not enough in your current project? Or just seeking manpower in general?
        </p>

        <ul className="[font-family:'Jost',Helvetica] font-normal text-black text-base mb-2 space-y-1 self-start">
          <li>· Reliable</li>
          <li>· Professional</li>
          <li>· Hardworking</li>
          <li>· Honest</li>
          <li>· Disciplined</li>
        </ul>

        <Button
          onClick={() => setIsAuthModalOpen(true)}
          className="bg-white hover:bg-gray-100 text-black rounded-[48px] h-[48px] px-8 [font-family:'Jost',Helvetica] font-semibold text-lg mt-2"
        >
          Hire Workers
        </Button>
      </CardContent>
    </Card>

    <Card className="bg-[#ff9d00] border-none rounded-[24px] shadow-[0px_6px_12px_#00000040]">
      <CardContent className="p-8 flex flex-col items-center">
        <h2 className="[font-family:'Jost',Helvetica] font-bold text-black text-[28px] text-center tracking-[0] leading-[normal] mb-4">
          Apply to Become a Worker!
        </h2>

        <p className="[font-family:'Jost',Helvetica] font-normal text-black text-base text-center tracking-[0] leading-[normal] mb-6">
          Looking for a job? Skilled manpower like you is always in demand!
        </p>

        <ul className="[font-family:'Jost',Helvetica] font-normal text-black text-base mb-9 space-y-1 self-start">
          <li>· Reliable</li>
          <li>· Professional</li>
          <li>· Hardworking</li>
          <li>· Honest</li>
          <li>· Disciplined</li>
        </ul>

        <Button
          onClick={() => setIsAuthModalOpen(true)}
          className="bg-white hover:bg-gray-100 text-black rounded-[48px] h-[48px] px-8 [font-family:'Jost',Helvetica] font-semibold text-lg mt-2"
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
