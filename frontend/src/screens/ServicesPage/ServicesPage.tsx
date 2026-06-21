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
    <div className="w-full min-h-screen relative overflow-hidden">

      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(/rectangle-3.png)" }}
      />

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/60" />

      {/* Navbar */}
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

          {/* Contact Us Button */}
          <Button
            onClick={() => navigate("/contact")}
            className="bg-[#FF9D00] rounded-[40px] shadow-[0px_4px_4px_#00000040] h-[50px] px-8 text-white text-xl hover:bg-[#e68c00]"
          >
            Contact Us
          </Button>

        </div>
      </nav>

      {/* Logo */}
      <img
        className="absolute top-3.5 left-[22px] w-[174px] h-[174px] object-cover z-50"
        alt="Construct"
        src="/construct-1-1.png"
      />

      {/* Page Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-[5%]">

        <div className="container mx-auto px-4 scale-[95%] origin-center">

          {/* Heading */}
          <div className="text-center mb-12">
            <p className="[font-family:'Jost',Helvetica] font-medium text-white text-xl mb-2">
              What are you looking for?
            </p>
            <h1 className="[font-family:'Jost',Helvetica] font-extrabold text-[#ff9d00] text-[62px] leading-tight">
              OUR SERVICES
            </h1>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">

            {/* Hire Workers Card */}
<div className="relative border-2 border-white rounded-2xl overflow-hidden group">
  <div
    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80')" }}
  />
  <div className="absolute inset-0 bg-black/60" />
  <div className="relative z-10 p-10 flex flex-col items-center">
    <h2 className="[font-family:'Jost',Helvetica] font-bold text-[#ff9d00] text-[32px] text-center mb-4">
      Need to Hire Workers?
    </h2>
    <p className="[font-family:'Jost',Helvetica] text-white text-base text-center mb-6">
      Manpower not enough in your current project? Or just seeking manpower in general?
    </p>
    <ul className="[font-family:'Jost',Helvetica] text-white text-base mb-8 space-y-1 self-start w-full">
      <li>· Reliable</li>
      <li>· Professional</li>
      <li>· Hardworking</li>
      <li>· Honest</li>
      <li>· Disciplined</li>
    </ul>
    
   <Button
  onClick={() => setIsAuthModalOpen(true)}
  className="w-[180px] h-[47px] bg-white hover:bg-[#ff9d00] hover:text-white rounded-[60px] [font-family:'Jost',Helvetica] font-extrabold text-[#ff9d00] text-base"
>
  Hire Workers
</Button>

  </div>
</div>

{/* Find Work Card */}
<div className="relative border-2 border-white rounded-2xl overflow-hidden group">
  <div
    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80')" }}
  />
  <div className="absolute inset-0 bg-black/60" />
  <div className="relative z-10 p-10 flex flex-col items-center">
    <h2 className="[font-family:'Jost',Helvetica] font-bold text-[#ff9d00] text-[32px] text-center mb-4">
      Apply to Become a Worker!
    </h2>
    <p className="[font-family:'Jost',Helvetica] text-white text-base text-center mb-6">
      Looking for a job? Skilled manpower like you is always in demand!
    </p>
    <ul className="[font-family:'Jost',Helvetica] text-white text-base mb-8 space-y-1 self-start w-full">
      <li>· Reliable</li>
      <li>· Professional</li>
      <li>· Hardworking</li>
      <li>· Honest</li>
      <li>· Disciplined</li>
    </ul>
    <Button
  onClick={() => setIsAuthModalOpen(true)}
  className="w-[180px] h-[47px] bg-transparent hover:bg-white hover:text-[#ff9d00]  border-2 border-white rounded-[60px] [font-family:'Jost',Helvetica] font-extrabold text-white text-base"
>
  Find Work
</Button>
  </div>
</div>

          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};