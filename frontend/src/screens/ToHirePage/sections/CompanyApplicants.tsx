import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useState, useEffect } from "react";

interface Applicant {
  id: number;
  name: string;
  position: string;
  project: string;
  appliedDate: string;
  status: string;
}

const applicants: Applicant[] = [
  {
    id: 1,
    name: "John Doe",
    position: "Carpenter",
    project: "Mall Construction",
    appliedDate: "2026-01-10",
    status: "pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Electrician",
    project: "House Renovation",
    appliedDate: "2026-01-09",
    status: "pending",
  },
  {
    id: 3,
    name: "Mike Johnson",
    position: "Welder",
    project: "Bridge Repair",
    appliedDate: "2026-01-08",
    status: "approved",
  },
  {
    id: 4,
    name: "Sarah Williams",
    position: "Steelman",
    project: "Mall Construction",
    appliedDate: "2026-01-07",
    status: "pending",
  },
  {
    id: 5,
    name: "Robert Brown",
    position: "Carpenter",
    project: "House Renovation",
    appliedDate: "2026-01-06",
    status: "rejected",
  },
];

export const CompanyApplicants = (): JSX.Element => {
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
    <div className="relative flex flex-col gap-6">
      <div className="flex items-center justify-end w-full">
        <span className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 [font-family:'Jost',Helvetica] font-medium text-black text-lg tracking-wide">
          {currentTime}
        </span>
      </div>

      <div className="w-full">
        <div>
          <h2 className="[font-family:'Jost',Helvetica] font-normal text-black text-2xl bg-[#FF9D00] px-8 py-3 rounded-full inline-block shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
            Job Applicants
          </h2>
        </div>

        <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020] mt-4 w-full">
          <CardContent className="p-6">
            <div className="space-y-3">
              {applicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <div className="flex-1 space-y-0.5">
                    <p className="[font-family:'Jost',Helvetica] font-bold text-black text-lg">
                      {applicant.name}
                    </p>
                    <p className="[font-family:'Jost',Helvetica] font-medium text-gray-700 text-sm">
                      Position: <span className="text-black">{applicant.position}</span>
                    </p>
                    <p className="[font-family:'Jost',Helvetica] font-medium text-gray-700 text-sm">
                      Project: <span className="text-black">{applicant.project}</span>
                    </p>
                    <p className="[font-family:'Jost',Helvetica] font-normal text-gray-500 text-xs mt-1">
                      Applied: {applicant.appliedDate}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm ${
                        applicant.status === "pending"
                          ? "bg-yellow-300 text-yellow-900"
                          : applicant.status === "approved"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {applicant.status}
                    </span>

                    {applicant.status === "pending" && (
                      <div className="flex gap-2 mt-1">
                        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg h-[32px] px-4 [font-family:'Jost',Helvetica] font-bold text-xs shadow-md transition-transform hover:scale-105">
                          Approve
                        </Button>
                        <Button className="bg-red-500 hover:bg-red-600 text-white rounded-lg h-[32px] px-4 [font-family:'Jost',Helvetica] font-bold text-xs shadow-md transition-transform hover:scale-105">
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
