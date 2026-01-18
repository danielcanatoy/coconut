import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

interface Applicant {
  id: number;
  name: string;
  position: string;
  appliedDate: string;
  status: string;
}

const applicants: Applicant[] = [
  {
    id: 1,
    name: "John Doe",
    position: "Carpenter",
    appliedDate: "2026-01-10",
    status: "pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Electrician",
    appliedDate: "2026-01-09",
    status: "pending",
  },
  {
    id: 3,
    name: "Mike Johnson",
    position: "Welder",
    appliedDate: "2026-01-08",
    status: "approved",
  },
  {
    id: 4,
    name: "Sarah Williams",
    position: "Steelman",
    appliedDate: "2026-01-07",
    status: "pending",
  },
  {
    id: 5,
    name: "Robert Brown",
    position: "Carpenter",
    appliedDate: "2026-01-06",
    status: "rejected",
  },
];

export const CompanyApplicants = (): JSX.Element => {
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

      <h2 className="[font-family:'Jost',Helvetica] font-bold text-black text-3xl mb-6">
        Job Applicants
      </h2>

      <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
        <CardContent className="p-6">
          <div className="space-y-3">
            {applicants.map((applicant) => (
              <div
                key={applicant.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <p className="[font-family:'Jost',Helvetica] font-semibold text-black text-base">
                    {applicant.name}
                  </p>
                  <p className="[font-family:'Jost',Helvetica] font-normal text-gray-600 text-sm">
                    Position: {applicant.position}
                  </p>
                  <p className="[font-family:'Jost',Helvetica] font-normal text-gray-500 text-xs">
                    Applied: {applicant.appliedDate}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      applicant.status === "pending"
                        ? "bg-yellow-300 text-black"
                        : applicant.status === "approved"
                        ? "bg-green-400 text-white"
                        : "bg-red-400 text-white"
                    }`}
                  >
                    {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                  </span>

                  {applicant.status === "pending" && (
                    <div className="flex gap-2">
                      <Button className="bg-green-500 hover:bg-green-600 text-white rounded-lg h-[32px] px-4 [font-family:'Jost',Helvetica] font-semibold text-xs">
                        Approve
                      </Button>
                      <Button className="bg-red-400 hover:bg-red-500 text-white rounded-lg h-[32px] px-4 [font-family:'Jost',Helvetica] font-semibold text-xs">
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
