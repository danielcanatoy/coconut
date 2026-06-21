import { Button } from "../../components/ui/button";
import { useState, useEffect } from "react";
import { WorkerHome } from "./sections/WorkerHome";
import { WorkerProjects } from "./sections/WorkerProjects";
import { WorkerProfile } from "./sections/WorkerProfile";
import { WorkerListings } from "./sections/WorkerListing";

import { useNavigate } from "react-router-dom";

type ActiveSection = "home" | "projects" | "messages" | "listings";

export const WorkerPage = (): JSX.Element => {
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null); // ✅ new

  const navigate = useNavigate();

  // ✅ Fetch profile image on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://localhost:5000/api/worker/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.profileImage) setProfileImage(data.data.profileImage);
      })
      .catch(console.error);
  }, []);

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
        {/* Sidebar */}
        <aside className="w-[200px] bg-[#f5e6d3] shadow-[2px_0px_8px_#00000020] flex flex-col overflow-y-auto">
          <div className="p-6 space-y-4">
            <div className="text-center">
              {/* ✅ Profile image with fallback */}
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-black">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-black rounded-full" />
                )}
              </div>

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
                className={`w-full py-3 px-4 rounded-lg [font-family:'Jost',Helvetica] font-semibold text-lg transition-colors ${
                  activeSection === "home"
                    ? "bg-[#ff9d00] text-black"
                    : "bg-white text-black hover:bg-[#ffce80]"
                }`}
              >
                Home
              </button>

              <button
                onClick={() => setActiveSection("projects")}
                className={`w-full py-3 px-4 rounded-lg [font-family:'Jost',Helvetica] font-semibold text-lg transition-colors ${
                  activeSection === "projects"
                    ? "bg-[#ff9d00] text-black"
                    : "bg-white text-black hover:bg-[#ffce80]"
                }`}
              >
                Projects
              </button>

              <button
                onClick={() => setActiveSection("listings")}
                className={`w-full py-3 px-4 rounded-lg [font-family:'Jost',Helvetica] font-semibold text-lg transition-colors ${
                  activeSection === "listings"
                    ? "bg-[#ff9d00] text-black"
                    : "bg-white text-black hover:bg-[#ffce80]"
                }`}
              >
                Listings
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

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {showProfileEdit ? (
            // ✅ Pass onProfileImageChange to update sidebar immediately
            <WorkerProfile
              onClose={() => setShowProfileEdit(false)}
              onProfileImageChange={setProfileImage}
            />
          ) : (
            <>
              {activeSection === "home" && <WorkerHome />}
              {activeSection === "projects" && <WorkerProjects />}
              {activeSection === "listings" && <WorkerListings />}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
