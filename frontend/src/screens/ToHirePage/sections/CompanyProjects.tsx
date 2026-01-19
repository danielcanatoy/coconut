import { Card, CardContent } from "../../../components/ui/card";
import { useState } from "react";

/* =======================
   TYPES
======================= */
interface Worker {
  name: string;
  role: string;
}

interface Project {
  id: number;
  name: string;
  inNeedOf?: string;
  timeIn?: string;
  timeOut?: string;
  salary?: string;
  workDays?: number;
  progress?: number;
  location?: string;
  workers?: Worker[];
  startDate?: string;
  endDate?: string;
  totalDays?: number;
  completedDays?: number;
}

/* =======================
   DATA
======================= */
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
    workers: [
      { name: "Daniel Canatoy", role: "Steelman" },
      { name: "Marvin San Diego", role: "Mason" },
      { name: "Christyn Devera", role: "Taga kape" },
      { name: "Jhan Talania", role: "Carpenter" },
    ],
  },
  {
    id: 2,
    name: "House Renovation",
    inNeedOf: "Painter (5)",
    timeIn: "8:00 AM",
    timeOut: "4:00 PM",
    salary: "₱700.00/day",
    workDays: 10,
    progress: 3,
    location: "Calamba City, Laguna",
    workers: [
      { name: "Juan Dela Cruz", role: "Painter" },
      { name: "Pedro Santos", role: "Painter" },
    ],
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

/* =======================
   COMPONENT
======================= */
export const CompanyProjects = (): JSX.Element => {
  const [openProjectId, setOpenProjectId] = useState<number | null>(null);
  const [selectedWorkers, setSelectedWorkers] = useState<Project | null>(null);

  const panelVisible = !!selectedWorkers;

  return (
    <div className="relative flex gap-6">
      {/* =======================
          LEFT SIDE (PROJECTS)
      ======================= */}
      <div className="flex-1 space-y-10">
        {/* Ongoing Projects */}
        <h2 className="text-3xl font-bold">Ongoing Projects</h2>

        <div className="grid grid-cols-2 gap-6 items-start">
          {ongoingProjects.map((project) => {
            const isOpen = openProjectId === project.id;

            return (
              <Card
                key={project.id}
                className={`
                  bg-[#FFA800] rounded-2xl shadow-md
                  transition-transform duration-200
                  ${isOpen ? "scale-100" : "hover:scale-[1.02]"}
                `}
              >
                <CardContent className="p-5 space-y-3 text-black">
                  {/* Title */}
                  <h3
                    onClick={() =>
                      setOpenProjectId(isOpen ? null : project.id)
                    }
                    className="text-xl font-extrabold text-center cursor-pointer hover:underline"
                  >
                    {project.name}
                  </h3>

                  {/* Smooth dropdown */}
                  <div
                    className={`
                      overflow-hidden
                      transition-[max-height] duration-500 ease-in-out
                      ${isOpen ? "max-h-96" : "max-h-0"}
                    `}
                  >
                    <div className="bg-white rounded-2xl px-5 py-4 mt-2 space-y-2 text-sm">
                      <p className="font-semibold">In need of:</p>
                      <p className="font-bold text-[#FFA800] text-lg">
                        {project.inNeedOf}
                      </p>

                      <p>
                        Time in:{" "}
                        <span className="font-semibold text-[#FFA800]">
                          {project.timeIn}
                        </span>
                      </p>

                      <p>
                        Time out:{" "}
                        <span className="font-semibold text-[#FFA800]">
                          {project.timeOut}
                        </span>
                      </p>

                      <p>
                        Salary:{" "}
                        <span className="font-semibold text-[#FFA800]">
                          {project.salary}
                        </span>
                      </p>

                      <p>
                        Progress:{" "}
                        <span className="font-semibold text-[#FFA800]">
                          {project.progress}/{project.workDays} days
                        </span>
                      </p>

                      <p>
                        Location:{" "}
                        <span className="font-semibold text-[#FFA800]">
                          {project.location}
                        </span>
                      </p>

                      {/* 👥 BUTTON */}
                      <div className="flex justify-center pt-2">
                        <button
                          onClick={() => setSelectedWorkers(project)}
                          className="w-10 h-10 bg-[#FFA800] rounded-full flex items-center justify-center
                                     hover:scale-110 transition"
                        >
                          👥
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Completed Projects */}
        <h2 className="text-3xl font-bold">Completed Projects</h2>

        <div className="grid grid-cols-2 gap-6 items-start">
          {completedProjects.map((project) => (
            <Card
              key={project.id}
              className="
                bg-[#6EFF7A] rounded-2xl shadow-md
                transition-transform duration-200
                hover:scale-[1.02]
              "
            >
              <CardContent className="p-5 space-y-3 text-black">
                {/* Title */}
                <h3 className="text-xl font-extrabold text-center">
                  {project.name}
                </h3>

                {/* White inner box */}
                <div className="bg-white rounded-2xl px-5 py-4 space-y-2 text-sm">
                  <p>
                    Construction Start:{" "}
                    <span className="font-semibold text-[#FFA800]">
                      {project.startDate}
                    </span>
                  </p>
                  <p>
                    Construction End:{" "}
                    <span className="font-semibold text-[#FFA800]">
                      {project.endDate}
                    </span>
                  </p>
                  <p>
                    Total Work Days:{" "}
                    <span className="font-semibold text-[#FFA800]">
                      {project.completedDays}/{project.totalDays} days
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* =======================
          RIGHT SIDE PANEL (absolute, animated)
      ======================= */}
      <div className="relative">
        <div
          className={`
            w-[350px]
            absolute right-0 top-0
            transform transition-all duration-500 ease-in-out
            ${panelVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"}
          `}
        >
          {selectedWorkers && (
            <div className="bg-white rounded-2xl shadow-xl p-5 space-y-4">
              <h3 className="text-lg font-bold text-center">
                {selectedWorkers.name}
              </h3>

              <div className="bg-green-300 text-center py-2 rounded-full font-semibold">
                Status: Ongoing
              </div>

              <div className="bg-gray-100 rounded-xl p-4">
                <div className="flex justify-between font-semibold mb-2">
                  <span>Workers</span>
                  <span>Role</span>
                </div>

                <div className="space-y-1 text-sm">
                  {selectedWorkers.workers?.map((worker, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b pb-1"
                    >
                      <span>{worker.name}</span>
                      <span>{worker.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedWorkers(null)}
                className="w-full bg-red-400 text-white py-2 rounded-full hover:bg-red-500"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
