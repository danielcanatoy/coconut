import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

interface Project {
  id: number;
  name: string;
  status: string;
  startDate?: string;
  endDate?: string;
  totalDays?: number;
  completedDays?: number;
  inNeedOf?: string;
  count?: number;
  timeIn?: string;
  timeOut?: string;
  salary?: string;
  workDays?: number;
  progress?: number;
  location?: string;
}

const ongoingProjects: Project[] = [
  {
    id: 1,
    name: "Mall Construction",
    inNeedOf: "Carpenter (10)",
    timeIn: "9:00 AM",
    timeOut: "5:00 PM",
    salary: "₱850.00/day",
    workDays: 14,
    progress: 8,
    location: "Rizal St, Laguna Province",
  },
  {
    id: 2,
    name: "House Renovation",
  },
];

const completedProjects: Project[] = [
  {
    id: 1,
    name: "Dam Construction",
    startDate: "09/01/2026",
    endDate: "09/30/2026",
    totalDays: 30,
    completedDays: 30,
  },
  {
    id: 2,
    name: "Highway Repair",
    startDate: "09/01/2026",
    endDate: "09/30/2026",
    totalDays: 30,
    completedDays: 30,
  },
];

export const CompanyProjects = (): JSX.Element => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="bg-[#ff9d00] rounded-full px-6 py-2">
          <p className="[font-family:'Jost',Helvetica] font-bold text-black text-lg">
            Hello User!
          </p>
        </div>
        <span className="[font-family:'Jost',Helvetica] font-normal text-black text-base">
          08:34:31 PM
        </span>
      </div>

      <h2 className="[font-family:'Jost',Helvetica] font-bold text-black text-3xl">
        Ongoing Projects
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-12">
        {ongoingProjects.map((project) => (
          <Card
            key={project.id}
            className="bg-[#ff9d00] border-none rounded-[20px] shadow-[0px_4px_12px_#00000020] cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedProject(project)}
          >
            <CardContent className="p-6">
              <h3 className="[font-family:'Jost',Helvetica] font-bold text-black text-xl mb-4">
                {project.name}
              </h3>

              {project.inNeedOf && (
                <>
                  <p className="[font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-1">
                    In need of :
                  </p>
                  <p className="[font-family:'Jost',Helvetica] font-bold text-[#ff9d00] text-lg mb-4">
                    {project.inNeedOf}
                  </p>

                  <div className="space-y-2 text-xs mb-4">
                    {project.timeIn && (
                      <p className="[font-family:'Jost',Helvetica] font-semibold text-black">
                        Time in : <span className="font-normal text-[#ff9d00]">{project.timeIn}</span>
                      </p>
                    )}
                    {project.timeOut && (
                      <p className="[font-family:'Jost',Helvetica] font-semibold text-black">
                        Time out : <span className="font-normal text-[#ff9d00]">{project.timeOut}</span>
                      </p>
                    )}
                    {project.salary && (
                      <p className="[font-family:'Jost',Helvetica] font-semibold text-black">
                        Salary : <span className="font-normal text-[#ff9d00]">{project.salary}</span>
                      </p>
                    )}
                    {project.workDays && (
                      <p className="[font-family:'Jost',Helvetica] font-semibold text-black">
                        Total Work Days : <span className="font-normal text-[#ff9d00]">{project.workDays}</span>
                      </p>
                    )}
                    {project.progress && (
                      <p className="[font-family:'Jost',Helvetica] font-semibold text-black">
                        Progress : <span className="font-normal text-[#ff9d00]">{project.progress}/{project.workDays} Days</span>
                      </p>
                    )}
                    {project.location && (
                      <p className="[font-family:'Jost',Helvetica] font-semibold text-black">
                        Location : <span className="font-normal text-[#ff9d00]">{project.location}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 justify-center">
                    <Button className="bg-white hover:bg-gray-100 text-black rounded-full h-[40px] w-[40px] p-0 flex items-center justify-center">
                      👁️
                    </Button>
                    <Button className="bg-white hover:bg-gray-100 text-black rounded-full h-[40px] w-[40px] p-0 flex items-center justify-center">
                      👥
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="[font-family:'Jost',Helvetica] font-bold text-black text-3xl">
        Completed Projects
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {completedProjects.map((project) => (
          <Card
            key={project.id}
            className="bg-green-400 border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]"
          >
            <CardContent className="p-6">
              <h3 className="[font-family:'Jost',Helvetica] font-bold text-white text-xl mb-4">
                {project.name}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="[font-family:'Jost',Helvetica] font-semibold text-white">
                  Construction Start: <span className="font-normal">{project.startDate}</span>
                </p>
                <p className="[font-family:'Jost',Helvetica] font-semibold text-white">
                  Construction End: <span className="font-normal">{project.endDate}</span>
                </p>
                <p className="[font-family:'Jost',Helvetica] font-semibold text-white">
                  Total Work Days: <span className="font-normal">{project.completedDays}/{project.totalDays} days</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] p-4">
          <Card className="bg-[#ff9d00] border-none rounded-[20px] shadow-[0px_8px_24px_#00000040] max-w-[600px] w-full">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="[font-family:'Jost',Helvetica] font-bold text-white text-2xl">
                  {selectedProject.name}
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white text-2xl hover:text-gray-200"
                >
                  ×
                </button>
              </div>

              <div className="bg-green-400 rounded-lg p-4 mb-6">
                <p className="[font-family:'Jost',Helvetica] font-semibold text-white text-center">
                  Status: Ongoing
                </p>
              </div>

              <h3 className="[font-family:'Jost',Helvetica] font-bold text-black text-lg mb-4">
                Workers
              </h3>

              <div className="space-y-3">
                {[
                  { name: "Daniel Casutoy", role: "Steelman" },
                  { name: "Marvin San Diego", role: "Mason" },
                  { name: "Chrislyn Devers", role: "Taga kape" },
                  { name: "Jann Talania", role: "Carpenter" },
                  { name: "Daniel Casutoy", role: "Steelman" },
                  { name: "Marvin San Diego", role: "Mason" },
                  { name: "Chrislyn Devers", role: "Taga kape" },
                  { name: "Jann Talania", role: "Carpenter" },
                ].map((worker, idx) => (
                  <div key={idx} className="flex justify-between [font-family:'Jost',Helvetica]">
                    <span className="font-semibold text-black">{worker.name}</span>
                    <span className="font-normal text-black">{worker.role}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => setSelectedProject(null)}
                className="w-full mt-6 bg-red-400 hover:bg-red-500 text-white rounded-lg h-[44px] [font-family:'Jost',Helvetica] font-semibold text-base"
              >
                Back
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
