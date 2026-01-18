import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { AboutCompanySection } from "./sections/AboutCompanySection";
import { BenefitsSection } from "./sections/BenefitsSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { NewsletterSubscriptionSection } from "./sections/NewsletterSubscriptionSection";
import { ProjectTypesSection } from "./sections/ProjectTypesSection";

const navItems = [
  { label: "Services", path: "/services", active: false },
  { label: "Home", path: "/", active: true },
  { label: "Login", path: "/login", active: false },
  { label: "Signup", path: "/signup", active: false },
];

export const HomePage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full min-w-[1280px] relative">
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

      <HeroSection />
      <AboutCompanySection />
      <ProjectTypesSection />
      <BenefitsSection />
      <NewsletterSubscriptionSection />
      <FooterSection />
    </div>
  );
};
