import { Card, CardContent } from "../../../components/ui/card";

interface Worker {
  id: number;
  name: string;
  status: string;
  role: string;
}

const currentWorkers: Worker[] = [
  { id: 1, name: "Daniel Casutoy", status: "Active", role: "Steelman" },
  { id: 2, name: "Marvin San Diego", status: "Active", role: "Mason" },
  { id: 3, name: "Chrislyn Devers", status: "Active", role: "Taga kape" },
  { id: 4, name: "Jann Talania", status: "Inactive", role: "Carpenter" },
  { id: 5, name: "Maria Santos", status: "Active", role: "Welder" },
  { id: 6, name: "Jose Garcia", status: "Active", role: "Electrician" },
];

export const CompanyWorkers = (): JSX.Element => {
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
        Company Workers
      </h2>

      <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full [font-family:'Jost',Helvetica]">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-semibold text-black text-base">
                    Workers
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-black text-base">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-black text-base">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentWorkers.map((worker) => (
                  <tr
                    key={worker.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-normal text-black text-sm">
                      {worker.name}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          worker.status === "Active"
                            ? "bg-green-400 text-white"
                            : "bg-gray-300 text-black"
                        }`}
                      >
                        {worker.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-normal text-black text-sm">
                      {worker.role}
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
