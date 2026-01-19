import { Card, CardContent } from "../../../components/ui/card";
import { useState, useEffect } from "react";

interface Worker {
  id: number;
  name: string;
  role: string;
  project: string;
}

const currentWorkers: Worker[] = [
  { id: 1, name: "Daniel Casutoy", role: "Steelman", project: "Mall Construction" },
  { id: 2, name: "Marvin San Diego", role: "Mason", project: "House Renovation" },
  { id: 3, name: "Chrislyn Devers", role: "Taga kape", project: "Office Build" },
  { id: 4, name: "Jann Talania", role: "Carpenter", project: "Mall Construction" },
  { id: 5, name: "Maria Santos", role: "Welder", project: "Bridge Repair" },
  { id: 6, name: "Jose Garcia", role: "Electrician", project: "House Renovation" },
];

export const CompanyWorkers = (): JSX.Element => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="space-y-6"> {/* Reduced space between elements */}
      
      {/* HEADER: REAL-TIME CLOCK */}
      <div className="flex justify-end">
        <span className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 [font-family:'Jost',Helvetica] font-medium text-black text-lg tracking-wide">
          {currentTime}
        </span>
      </div>

      {/* TITLE WITH ORANGE BACKGROUND */}
      <div>
        <h2 className="bg-[#ff9d00] inline-block rounded-full px-8 py-3 [font-family:'Jost',Helvetica] font-bold text-black text-3xl mb-4 shadow-sm"> {/* Reduced mb-6 to mb-4 */}
          Company Workers
        </h2>
      </div>

      {/* WORKERS TABLE CARD */}
      <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full [font-family:'Jost',Helvetica]">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-semibold text-black text-base w-1/3">
                    Workers
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-black text-base w-1/3">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-black text-base w-1/3">
                    Project
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentWorkers.map((worker) => (
                  <tr
                    key={worker.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-normal text-black text-sm">
                      {worker.name}
                    </td>
                    <td className="py-3 px-4 font-normal text-black text-sm">
                      {worker.role}
                    </td>
                    <td className="py-3 px-4 font-normal text-black text-sm">
                      {worker.project}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
