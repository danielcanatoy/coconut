import { Button } from "../../components/ui/button";
import { useState } from "react";
import { WorkerHome } from "./sections/WorkerHome";
import { WorkerProjects } from "./sections/WorkerProjects";
import { WorkerMessages } from "./sections/WorkerMessages";
import { WorkerProfile } from "./sections/WorkerProfile";
import { useNavigate } from "react-router-dom";

type ActiveSection = "home" | "projects" | "messages";

export const WorkerPage = (): JSX.Element => {
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
        <aside className="w-[200px] bg-[#f5e6d3] shadow-[2px_0px_8px_#00000020] flex flex-col overflow-y-auto">
          <div className="p-6 space-y-4">
            <div className="text-center">
              <div className="w-24 h-24 bg-black rounded-full mx-auto mb-4" />
              <button
                onClick={() => setShowProfileEdit(true)}
                className="[font-family:'Jost',Helvetica] font-semibold text-black text-base
                  underline underline-offset-4
                  transition-all duration-200
                  hover:text-[#ff9d00] hover:underline-offset-2"
              >
                Edit Profile
              </button>
            </div>

            <div className="space-y-3 mt-8">
              <button
                onClick={() => setActiveSection("home")}
                className={`w-full py-3 px-4 rounded-lg
                  [font-family:'Jost',Helvetica] font-semibold text-lg
                  transition-all duration-200 ease-out
                  ${
                    activeSection === "home"
                      ? "bg-[#ff9d00] text-black shadow-md"
                      : "bg-white text-black hover:bg-gray-100 hover:-translate-y-[1px] hover:shadow-md"
                  }`}
              >
                Home
              </button>


              <button
                onClick={() => setActiveSection("messages")}
                className={`w-full py-3 px-4 rounded-lg
                  [font-family:'Jost',Helvetica] font-semibold text-lg
                  transition-all duration-200 ease-out
                  ${
                    activeSection === "messages"
                      ? "bg-[#ff9d00] text-black shadow-md"
                      : "bg-white text-black hover:bg-gray-100 hover:-translate-y-[1px] hover:shadow-md"
                  }`}
              >
                Messages
              </button>


              <button
                onClick={() => setActiveSection("projects")}
                className={`w-full py-3 px-4 rounded-lg
                  [font-family:'Jost',Helvetica] font-semibold text-lg
                  transition-all duration-200 ease-out
                  ${
                    activeSection === "projects"
                      ? "bg-[#ff9d00] text-black shadow-md"
                      : "bg-white text-black hover:bg-gray-100 hover:-translate-y-[1px] hover:shadow-md"
                  }`}
              >
                Projects
              </button>

            </div>
          </div>

          <div className="mt-auto p-6">
            <Button
              onClick={handleLogout}
              className="w-full bg-white text-black rounded-lg h-[48px]
                transition-all duration-200 ease-out
                hover:bg-[#FF9D00] hover:shadow-md hover:-translate-y-[1px]
                active:scale-[0.98]"
            >
              Logout
            </Button>

          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-8">
          {showProfileEdit ? (
            <WorkerProfile onClose={() => setShowProfileEdit(false)} />
          ) : (
            <>
              {activeSection === "home" && <WorkerHome />}
              {activeSection === "projects" && <WorkerProjects />}
              {activeSection === "messages" && <WorkerMessages />}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
