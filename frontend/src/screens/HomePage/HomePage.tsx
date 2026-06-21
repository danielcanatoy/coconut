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

      {/* Navbar */}
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

      {/* Sections */}
      <HeroSection />
      <AboutCompanySection />
      <ProjectTypesSection />
      <BenefitsSection />
      <NewsletterSubscriptionSection />
      <FooterSection />

    </div>
  );
};