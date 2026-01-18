import { Card, CardContent } from "../../../components/ui/card";

export const CompanyHome = (): JSX.Element => {
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

      <Card className="bg-green-400 border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
        <CardContent className="p-8">
          <h2 className="[font-family:'Jost',Helvetica] font-bold text-black text-2xl mb-3">
            Active Projects
          </h2>
          <ul className="[font-family:'Jost',Helvetica] font-normal text-black text-lg space-y-1">
            <li>· Mall Construction</li>
            <li>· House Renovation</li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#ff9d00] border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
          <CardContent className="p-8 text-center">
            <p className="[font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
              WORKERS CURRENTLY HIRED
            </p>
            <p className="[font-family:'Jost',Helvetica] font-bold text-white text-6xl">
              23
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
          <CardContent className="p-8 text-center">
            <p className="[font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
              ACTIVE WORKERS
            </p>
            <p className="[font-family:'Jost',Helvetica] font-bold text-[#ff9d00] text-6xl">
              11
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
