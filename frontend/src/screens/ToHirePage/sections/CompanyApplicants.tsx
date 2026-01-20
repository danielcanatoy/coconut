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
  const [selectedStatus, setSelectedStatus] = useState<'approved' | 'rejected'>('approved');
  const [panelVisible, setPanelVisible] = useState(false);

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

  const pendingApplicants = applicants.filter(a => a.status === "pending");
  const approvedWorkers = applicants.filter(a => a.status === "approved");
  const rejectedWorkers = applicants.filter(a => a.status === "rejected");
  const currentWorkers = selectedStatus === 'approved' ? approvedWorkers : rejectedWorkers;

  return (
    <>
      <div className="relative flex flex-col gap-6">
        <div className="flex items-center justify-end w-full">
          <span className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 [font-family:'Jost',Helvetica] font-medium text-black text-lg tracking-wide">
            {currentTime}
          </span>
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h1 className="[font-family:'Jost',Helvetica] font-normal text-black text-lg bg-[#FF9D00] px-6 py-2 rounded-full inline-block shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
              Job Applicants
            </h1>
            <button
              onClick={() => setPanelVisible(!panelVisible)}
              className={`[font-family:'Jost',Helvetica] font-normal text-black text-lg px-6 py-2 rounded-full inline-block shadow-[0px_4px_8px_rgba(0,0,0,0.25)] transition-all cursor-pointer hover:shadow-[0px_6px_12px_rgba(0,0,0,0.3)] ${
                panelVisible
                  ? 'bg-[#FF9D00]'
                  : 'bg-white'
              }`}
            >
              Approval History
            </button>
          </div>

          <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020] w-full">
            <CardContent className="p-6">
              <div className="space-y-3">
                {pendingApplicants.map((applicant) => (
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

                    <div className="flex gap-2">
                      <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg h-[32px] px-4 [font-family:'Jost',Helvetica] font-bold text-xs shadow-md transition-transform hover:scale-105">
                        Approve
                      </Button>
                      <Button className="bg-red-500 hover:bg-red-600 text-white rounded-lg h-[32px] px-4 [font-family:'Jost',Helvetica] font-bold text-xs shadow-md transition-transform hover:scale-105">
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
                {pendingApplicants.length === 0 && (
                  <div className="p-12 text-center text-gray-500 font-medium">
                    No pending applicants
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CENTERED MODAL - GREEN/RED TAB BUTTONS */}
      {panelVisible && (
        <div 
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
          onClick={() => setPanelVisible(false)}
        >
          <div 
            className="bg-white rounded-[20px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-none rounded-[20px] overflow-hidden h-full flex flex-col max-h-[700px]">
              <div className="bg-[#FF9D00] p-6 flex items-center justify-between flex-shrink-0 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                <h3 className="[font-family:'Jost',Helvetica] font-normal text-2xl text-black">
                  Approval History
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedStatus('approved')}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
                      selectedStatus === 'approved'
                        ? 'bg-green-500 text-white shadow-[0px_4px_8px_rgba(0,0,0,0.25)]'
                        : 'bg-white/70 text-black hover:bg-green-500 hover:text-white hover:shadow-[0px_4px_8px_rgba(0,0,0,0.25)]'
                    }`}
                  >
                    Approved ({approvedWorkers.length})
                  </button>
                  <button
                    onClick={() => setSelectedStatus('rejected')}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
                      selectedStatus === 'rejected'
                        ? 'bg-red-500 text-white shadow-[0px_4px_8px_rgba(0,0,0,0.25)]'
                        : 'bg-white/70 text-black hover:bg-red-500 hover:text-white hover:shadow-[0px_4px_8px_rgba(0,0,0,0.25)]'
                    }`}
                  >
                    Rejected ({rejectedWorkers.length})
                  </button>
                </div>
              </div>
              
              <CardContent className="p-6 flex-1 overflow-y-auto">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px] [font-family:'Jost',Helvetica]">
                    <thead>
                      <tr className={`border-b-2 ${selectedStatus === 'approved' ? 'border-green-300' : 'border-red-300'}`}>
                        <th className={`text-left py-3 px-4 font-semibold text-black text-base ${selectedStatus === 'approved' ? 'bg-green-50' : 'bg-red-50'}`}>
                          Name
                        </th>
                        <th className={`text-left py-3 px-4 font-semibold text-black text-base ${selectedStatus === 'approved' ? 'bg-green-50' : 'bg-red-50'}`}>
                          Position
                        </th>
                        <th className={`text-left py-3 px-4 font-semibold text-black text-base ${selectedStatus === 'approved' ? 'bg-green-50' : 'bg-red-50'}`}>
                          Project
                        </th>
                        <th className={`text-left py-3 px-4 font-semibold text-black text-base ${selectedStatus === 'approved' ? 'bg-green-50' : 'bg-red-50'}`}>
                          {selectedStatus === 'approved' ? 'Approved' : 'Rejected'} Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentWorkers.map((worker) => (
                        <tr
                          key={worker.id}
                          className={`border-b ${selectedStatus === 'approved' ? 'border-green-200 hover:bg-green-50' : 'border-red-200 hover:bg-red-50'} transition-colors`}
                        >
                          <td className="py-3 px-4 font-normal text-black text-sm">
                            {worker.name}
                          </td>
                          <td className="py-3 px-4 font-normal text-black text-sm">
                            {worker.position}
                          </td>
                          <td className="py-3 px-4 font-normal text-black text-sm">
                            {worker.project}
                          </td>
                          <td className={`py-3 px-4 font-normal text-sm font-medium ${selectedStatus === 'approved' ? 'text-green-700' : 'text-red-700'}`}>
                            {worker.appliedDate}
                          </td>
                        </tr>
                      ))}
                      {currentWorkers.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-12 text-center text-gray-500 font-medium">
                            No {selectedStatus} workers yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>

              <div className="p-6 border-t bg-gray-50 flex gap-3">
                <Button
                  onClick={() => setPanelVisible(false)}
                  className="flex-1 bg-[#FF9D00] hover:bg-[#FF8C00] text-white py-3 rounded-full font-bold [font-family:'Jost',Helvetica] shadow-md transition-all hover:scale-105"
                >
                  Close
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};
