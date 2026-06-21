import { Card, CardContent } from "../../../components/ui/card";
import { useState, useEffect } from "react";

interface Project {
  id: number;
  status: "ongoing" | "completed";
  start_date: string;
  end_date: string;
  position: string;
  in_need_of: string;
  time_in: string;
  time_out: string;
  salary: string;
  work_days: number;
  location: string;
  company_name: string;
}

export const WorkerProjects = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<"active" | "completed">(
    "active",
  );
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/worker/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data.data) ? data.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  const activeProjects = projects.filter((p) => p.status === "ongoing");
  const completedProjects = projects.filter((p) => p.status === "completed");
  const currentProjects =
    selectedTab === "active" ? activeProjects : completedProjects;

  return (
    <div className="space-y-8 px-6">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setSelectedTab("active")}
          className={`px-6 py-2 rounded-full font-semibold text-sm shadow-[0px_4px_8px_rgba(0,0,0,0.25)] ${
            selectedTab === "active"
              ? "bg-[#FF9D00] text-black ring-2 ring-black"
              : "bg-[#FF9D00] text-black"
          }`}
        >
          Active Projects
        </button>
        <button
          onClick={() => setSelectedTab("completed")}
          className={`px-6 py-2 rounded-full font-semibold text-sm shadow-[0px_4px_8px_rgba(0,0,0,0.25)] ${
            selectedTab === "completed"
              ? "bg-[#98FF7E] text-black ring-2 ring-black"
              : "bg-[#98FF7E] text-black"
          }`}
        >
          Completed Projects
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500">Loading projects...</p>
      ) : currentProjects.length === 0 ? (
        <div className="text-center py-20 opacity-50">
          <p className="text-xl">
            No {selectedTab === "active" ? "active" : "completed"} projects yet.
          </p>
        </div>
      ) : (
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
                  <p className="font-bold text-black text-2xl">
                    {project.company_name || "Company"}
                  </p>
                  <p className="font-semibold text-black text-lg">
                    {project.in_need_of || project.position}
                  </p>
                </div>

                {selectedTab === "active" && (
                  <div className="grid grid-cols-2 gap-4 mb-4 bg-white/70 p-4 rounded-md">
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <p className="font-semibold text-black">Time in:</p>
                        <p className="font-normal text-black">
                          {project.time_in}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-black mt-2">Salary:</p>
                        <p className="font-normal text-black">
                          ₱{project.salary}/day
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <p className="font-semibold text-black">Time out:</p>
                        <p className="font-normal text-black">
                          {project.time_out}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-black mt-2">
                          Work Days:
                        </p>
                        <p className="font-normal text-black">
                          {project.work_days} days
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-white/50">
                      <p className="text-sm text-black">
                        📍 {project.location}
                      </p>
                    </div>
                  </div>
                )}

                {selectedTab === "completed" && (
                  <div className="space-y-2 text-sm mb-4 bg-white p-4 rounded-md">
                    <p className="font-semibold text-black">
                      Position: {project.in_need_of || project.position}
                    </p>
                    <p className="font-normal text-black">
                      Completed:{" "}
                      {project.end_date
                        ? new Date(project.end_date).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p className="font-normal text-black">
                      Work Days: {project.work_days} days
                    </p>
                    <p className="font-normal text-black">
                      Salary: ₱{project.salary}/day
                    </p>
                    <p className="font-normal text-black">
                      📍 {project.location}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
