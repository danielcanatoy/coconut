import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

// Sample data
const activeProjects = [
  {
    id: 1,
    company: "LightLab",
    role: "Steel Worker",
    inNeedOf: "Carpenter (3)",
    timeIn: "9:00 am",
    timeOut: "5:30 pm",
    duration: "3 weeks",
    workers: [
      { name: "John Doe", role: "Carpenter" },
      { name: "Jane Smith", role: "Mason" },
      { name: "Bob Lee", role: "Engineer" },
    ],
  },
  {
    id: 2,
    company: "Mango",
    role: "Electrician",
    inNeedOf: "Mechanic (2)",
    timeIn: "10:00 am",
    timeOut: "6:00 pm",
    duration: "2 weeks",
    workers: [
      { name: "Alice Brown", role: "Electrician" },
      { name: "Tom Clark", role: "Mechanic" },
    ],
  },
];

export const WorkerProjects = (): JSX.Element => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const closeView = () => setSelectedProject(null);

  return (
    <div className="space-y-8 px-6">
      <div>
        <h2 className="[font-family:'Jost',Helvetica] font-normal text-black text-1 bg-[#FF9D00] px-6 py-2 rounded-full inline-block shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
          Active Projects
        </h2>
        <br />
        <br />

        <div className="grid grid-cols-2 gap-6">
          {activeProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-[#ff9d00] border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="[font-family:'Jost',Helvetica] font-bold text-black text-lg">
                    {project.company}
                  </p>
                  <p className="[font-family:'Jost',Helvetica] font-normal text-black text-sm">
                    {project.role}
                  </p>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <p className="[font-family:'Jost',Helvetica] font-semibold text-black">
                    In need of:
                  </p>
                  <p className="[font-family:'Jost',Helvetica] font-normal text-black">
                    {project.inNeedOf}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div>
                    <p className="[font-family:'Jost',Helvetica] font-semibold text-black">
                      Time in:
                    </p>
                    <p className="[font-family:'Jost',Helvetica] font-normal text-black">
                      {project.timeIn}
                    </p>
                  </div>
                  <div>
                    <p className="[font-family:'Jost',Helvetica] font-semibold text-black">
                      Time out:
                    </p>
                    <p className="[font-family:'Jost',Helvetica] font-normal text-black">
                      {project.timeOut}
                    </p>
                  </div>
                </div>

                <p className="[font-family:'Jost',Helvetica] font-semibold text-black text-xs mb-3">
                  Duration: {project.duration}
                </p>

                <Button
                  onClick={() => setSelectedProject(project.id)}
                  className="w-full bg-white hover:bg-gray-100 text-black rounded-lg h-9 [font-family:'Jost',Helvetica] font-semibold text-sm"
                >
                  View
                </Button>
              </CardContent>
            </Card>
            
            
          ))}
        </div>
      </div>

      {/* Modal / View Tab */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
          <Card className="w-full max-w-[500px] rounded-[20px] shadow-lg bg-[#ff9d00] border-none">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="[font-family:'Jost',Helvetica] font-bold text-black text-2xl">
                  Workers in Project
                </h3>
                <button
                  onClick={closeView}
                  className="text-black font-bold text-xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-2">
                {activeProjects
                  .find((p) => p.id === selectedProject)
                  ?.workers.map((worker, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between bg-gray-100 rounded-md px-4 py-2"
                    >
                      <p className="[font-family:'Jost',Helvetica] font-medium text-black">
                        {worker.name}
                      </p>
                      <p className="[font-family:'Jost',Helvetica] font-normal text-gray-700">
                        {worker.role}
                      </p>
                    </div>
                  ))}
              </div>

              <div className="flex justify-end mt-4 max-w-[500px]">
                <Button
                  onClick={closeView}
                  className="bg-white hover:bg-[#e89d00] text-black rounded-lg px-6"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
