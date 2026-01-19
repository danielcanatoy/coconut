import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

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
  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="bg-[#ff9d00] rounded-full px-8 py-3">
          <p className="[font-family:'Jost',Helvetica] font-bold text-black text-xl">
            Hello User!
          </p>
        </div>
        <span className="[font-family:'Jost',Helvetica] font-normal text-black text-lg">
          08:34:31 PM
        </span>
      </div>

      <h2 className="[font-family:'Jost',Helvetica] font-bold text-black text-4xl mb-8">
        Job Applicants
      </h2>

      {/* APPLICANTS LIST CARD */}
      <Card className="bg-white border-none rounded-[30px] shadow-[0px_4px_12px_#00000020]">
        <CardContent className="p-8">
          <div className="space-y-5">
            {applicants.map((applicant) => (
              <div
                key={applicant.id}
                className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
              >
                {/* APPLICANT INFO */}
                <div className="flex-1 space-y-1">
                  <p className="[font-family:'Jost',Helvetica] font-bold text-black text-xl">
                    {applicant.name}
                  </p>
                  <p className="[font-family:'Jost',Helvetica] font-medium text-gray-700 text-base">
                    Position: <span className="text-black">{applicant.position}</span>
                  </p>
                  <p className="[font-family:'Jost',Helvetica] font-medium text-gray-700 text-base">
                    Project: <span className="text-black">{applicant.project}</span>
                  </p>
                  <p className="[font-family:'Jost',Helvetica] font-normal text-gray-500 text-sm mt-2">
                    Applied: {applicant.appliedDate}
                  </p>
                </div>

                {/* STATUS & ACTIONS */}
                <div className="flex flex-col items-end gap-3">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase shadow-sm ${
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
                    <div className="flex gap-3 mt-2">
                      <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg h-[40px] px-6 [font-family:'Jost',Helvetica] font-bold text-sm shadow-md transition-transform hover:scale-105">
                        Approve
                      </Button>
                      <Button className="bg-red-500 hover:bg-red-600 text-white rounded-lg h-[40px] px-6 [font-family:'Jost',Helvetica] font-bold text-sm shadow-md transition-transform hover:scale-105">
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
  );
};
