import { Card, CardContent } from "../../../components/ui/card";
import { useState } from "react";

// Sample data
const activeProjects = [
  {
    id: 1,
    company: "LightLab",
    role: "Steel Worker",
    timeIn: "9:00 am",
    timeOut: "5:30 pm",
    duration: "3 weeks",
    salary: "₱850.00/day"
  },
  {
    id: 2,
    company: "Mango",
    role: "Electrician",
    timeIn: "10:00 am",
    timeOut: "6:00 pm",
    duration: "2 weeks",
    salary: "₱930.00/day"
  },
];

const completedProjects = [
  {
    id: 1,
    company: "Sunrise Construction",
    role: "Mason",
    completedDate: "Jan 15, 2026",
    duration: "4 weeks",
    salary: "₱850.00/day"
  },
  {
    id: 2,
    company: "BlueSky Builders",
    role: "Plumber",
    completedDate: "Jan 10, 2026",
    duration: "2 weeks",
    salary: "₱850.00/day"
  },
];

export const WorkerProjects = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<"active" | "completed">("active");

  const currentProjects = selectedTab === "active" ? activeProjects : completedProjects;

  return (
    <div className="space-y-8 px-6">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setSelectedTab("active")}
          className={`px-6 py-2 rounded-full font-semibold text-sm ${
            selectedTab === "active"
              ? "bg-[#FF9D00] text-black"
              : "bg-[#FF9D00] px-6 py-2 rounded-full inline-block shadow-[0px_4px_8px_rgba(0,0,0,0.25)]"
          }`}
        >
          Active Projects
        </button>
        <button
          onClick={() => setSelectedTab("completed")}
          className={`px-6 py-2 rounded-full font-semibold text-sm ${
            selectedTab === "completed"
              ? "bg-[#98FF7E] text-black"
              : "bg-[#98FF7E] px-6 py-2 rounded-full inline-block shadow-[0px_4px_8px_rgba(0,0,0,0.25)]"
          }`}
        >
          Completed Designs
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-3 gap-6">
        {currentProjects.map((project) => (
          <Card
            key={project.id}
            className={`border-none rounded-[20px] shadow-[0px_4px_12px_#00000020] ${
              selectedTab === "active" ? "bg-[#FF9D00]" : "bg-[#98FF7E]"
            }`}
          >
            <CardContent className="p-6">
              <div className="mb-4 text-center">
                <p className="font-bold text-black text-2xl">{project.company}</p>
                <p className="font-semibold text-black text-lg">{project.role}</p>
              </div>

              {selectedTab === "active" && (
                <div className="grid grid-cols-2 gap-4  mb-4 bg-white/70 p-4 rounded-md">
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <p className="font-semibold text-black">Time in:</p>
                      <p className="font-normal text-black">{(project as any).timeIn}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-black mt-2">Salary:</p>
                      <p className="font-normal text-black">{(project as any).salary}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <p className="font-semibold text-black">Time out:</p>
                      <p className="font-normal text-black">{(project as any).timeOut}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-black mt-2">Duration:</p>
                      <p className="font-normal text-black">{(project as any).duration}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === "completed" && (
                <div className="space-y-2 text-sm mb-4 bg-white p-4 rounded-md">
                  <p className="font-semibold text-black">Completed: {(project as any).completedDate}</p>
                  <p className="font-normal text-black">Duration: {(project as any).duration}</p>
                  <p className="font-normal text-black">Salary: {(project as any).salary}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
