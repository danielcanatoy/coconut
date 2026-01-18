import { Button } from "../../components/ui/button";
import { useState } from "react";
import { CompanyHome } from "./sections/CompanyHome";
import { CompanyProjects } from "./sections/CompanyProjects";
import { CompanyListings } from "./sections/CompanyListings";
import { CompanyWorkers } from "./sections/CompanyWorkers";
import { CompanyApplicants } from "./sections/CompanyApplicants";
import { CompanyMessages } from "./sections/CompanyMessages";
import { CompanyProfile } from "./sections/CompanyProfile";
import { useNavigate } from "react-router-dom";

type ActiveSection =
  | "home"
  | "projects"
  | "listings"
  | "workers"
  | "applicants"
  | "messages";

export const ToHirePage = (): JSX.Element => {
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="bg-[#d4b896] w-full min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url(/rectangle-3.png)" }}
      />

      <div className="flex h-screen relative z-10">
        <aside className="w-[200px] bg-[#ff9d00] shadow-[2px_0px_8px_#00000020] flex flex-col overflow-y-auto">
          <div className="p-6 space-y-4">
            <div className="text-center">
              <div className="w-24 h-24 bg-black rounded-full mx-auto mb-4" />
              <button
                onClick={() => setShowProfileEdit(true)}
                className="[font-family:'Jost',Helvetica] font-semibold text-black text-base underline hover:no-underline"
              >
                Edit Profile
              </button>
            </div>

            <div className="space-y-3 mt-8">
              <button
                onClick={() => setActiveSection("home")}
                className={`w-full py-3 px-4 rounded-lg [font-family:'Jost',Helvetica] font-semibold text-base transition-colors ${
                  activeSection === "home"
                    ? "bg-white text-[#ff9d00]"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                Home
              </button>

              <button
                onClick={() => setActiveSection("projects")}
                className={`w-full py-3 px-4 rounded-lg [font-family:'Jost',Helvetica] font-semibold text-base transition-colors ${
                  activeSection === "projects"
                    ? "bg-white text-[#ff9d00]"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                Projects
              </button>

              <button
                onClick={() => setActiveSection("listings")}
                className={`w-full py-3 px-4 rounded-lg [font-family:'Jost',Helvetica] font-semibold text-base transition-colors ${
                  activeSection === "listings"
                    ? "bg-white text-[#ff9d00]"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                Listings
              </button>

              <button
                onClick={() => setActiveSection("workers")}
                className={`w-full py-3 px-4 rounded-lg [font-family:'Jost',Helvetica] font-semibold text-base transition-colors ${
                  activeSection === "workers"
                    ? "bg-white text-[#ff9d00]"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                Workers
              </button>

              <button
                onClick={() => setActiveSection("applicants")}
                className={`w-full py-3 px-4 rounded-lg [font-family:'Jost',Helvetica] font-semibold text-base transition-colors ${
                  activeSection === "applicants"
                    ? "bg-white text-[#ff9d00]"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                Applicants
              </button>

              <button
                onClick={() => setActiveSection("messages")}
                className={`w-full py-3 px-4 rounded-lg [font-family:'Jost',Helvetica] font-semibold text-base transition-colors ${
                  activeSection === "messages"
                    ? "bg-white text-[#ff9d00]"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                Messages
              </button>
            </div>
          </div>

          <div className="mt-auto p-6">
            <Button
              onClick={handleLogout}
              className="w-full bg-white hover:bg-gray-100 text-black rounded-lg h-[48px]"
            >
              Logout
            </Button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-8">
          {showProfileEdit ? (
            <CompanyProfile onClose={() => setShowProfileEdit(false)} />
          ) : (
            <>
              {activeSection === "home" && <CompanyHome />}
              {activeSection === "projects" && <CompanyProjects />}
              {activeSection === "listings" && <CompanyListings />}
              {activeSection === "workers" && <CompanyWorkers />}
              {activeSection === "applicants" && <CompanyApplicants />}
              {activeSection === "messages" && <CompanyMessages />}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
