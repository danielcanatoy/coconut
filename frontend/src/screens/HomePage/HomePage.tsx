import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { AboutCompanySection } from "./sections/AboutCompanySection";
import { BenefitsSection } from "./sections/BenefitsSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { NewsletterSubscriptionSection } from "./sections/NewsletterSubscriptionSection";
import { ProjectTypesSection } from "./sections/ProjectTypesSection";


const navItems = [
  { label: "Home", path: "/", active: true },
  { label: "Services", path: "/services", active: false },
  { label: "Login", path: "/login", active: false },
  { label: "Signup", path: "/signup", active: false },
];

export const HomePage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full min-w-[1280px] relative">
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

      <HeroSection />
      <AboutCompanySection />
      <ProjectTypesSection />
      <BenefitsSection />
      <NewsletterSubscriptionSection />
      <FooterSection />
    </div>
  );
};
