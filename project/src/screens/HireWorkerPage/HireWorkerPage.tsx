import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Services", path: "/services", active: false },
  { label: "Home", path: "/", active: false },
  { label: "Login", path: "/login", active: false },
  { label: "Signup", path: "/signup", active: false },
];

export const HireWorkerPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const handlePostJob = () => {
    console.log("Post job:", { jobTitle, description, location, salary });
  };

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

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8 pt-32 pb-20">
        <div className="max-w-[800px] w-full">
          <div className="bg-[#ff9d00] rounded-[30px] shadow-[0px_8px_16px_#00000040] p-12">
            <div className="text-center mb-12">
              <h1 className="[font-family:'Jost',Helvetica] font-bold text-black text-[56px] tracking-[0] leading-[normal] mb-2">
                Post a Job
              </h1>
              <p className="[font-family:'Jost',Helvetica] font-semibold text-black text-lg tracking-[0] leading-[normal]">
                Find the right workers for your project
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-base mb-2">
                  Job Title
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Steel Worker, Electrician, Welder"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full h-[54px] bg-[#e8e8e8] rounded-full px-6 [font-family:'Jost',Helvetica] font-normal text-black text-lg border-0 placeholder:text-[#00000066] placeholder:italic focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <div>
                <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-base mb-2">
                  Location
                </label>
                <Input
                  type="text"
                  placeholder="Project location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-[54px] bg-[#e8e8e8] rounded-full px-6 [font-family:'Jost',Helvetica] font-normal text-black text-lg border-0 placeholder:text-[#00000066] placeholder:italic focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <div>
                <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-base mb-2">
                  Salary Range
                </label>
                <Input
                  type="text"
                  placeholder="e.g., $50-70/hr"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full h-[54px] bg-[#e8e8e8] rounded-full px-6 [font-family:'Jost',Helvetica] font-normal text-black text-lg border-0 placeholder:text-[#00000066] placeholder:italic focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <div>
                <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-base mb-2">
                  Job Description
                </label>
                <textarea
                  placeholder="Describe the job requirements and responsibilities"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full bg-[#e8e8e8] rounded-[20px] px-6 py-4 [font-family:'Jost',Helvetica] font-normal text-black text-lg border-0 placeholder:text-[#00000066] placeholder:italic focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                />
              </div>

              <div className="flex gap-4 justify-center pt-6">
                <Button
                  onClick={() => navigate("/services")}
                  className="bg-white hover:bg-gray-100 text-black rounded-[60px] h-[54px] w-[180px] [font-family:'Jost',Helvetica] font-semibold text-lg"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePostJob}
                  className="bg-white hover:bg-gray-100 text-black rounded-[60px] h-[54px] w-[180px] [font-family:'Jost',Helvetica] font-semibold text-lg"
                >
                  Post Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
