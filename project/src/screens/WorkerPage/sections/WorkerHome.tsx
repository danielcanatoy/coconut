import { Card, CardContent } from "../../../components/ui/card";
import Time from "../../../components/ui/time";

export const WorkerHome = (): JSX.Element => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="[font-family:'Jost',Helvetica] font-bold text-black text-4xl">
          Hello User!
        </h1>
        <span className="[font-family:'Jost',Helvetica] font-normal text-gray-600 text-base">
          <Time />
        </span>
      </div>

      <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
        <CardContent className="p-8">
          <h2 className="[font-family:'Jost',Helvetica] font-bold text-black text-2xl mb-4">
            Today's assigned job
          </h2>
          <p className="[font-family:'Jost',Helvetica] font-normal text-gray-700 text-lg mb-2">
            <span className="font-bold">Company E</span>
          </p>
          <p className="[font-family:'Jost',Helvetica] font-normal text-gray-600 text-base">
            Mall Construction
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
          <CardContent className="p-8">
            <p className="[font-family:'Jost',Helvetica] font-semibold text-gray-600 text-sm mb-2">
              TIME IN
            </p>
            <p className="[font-family:'Jost',Helvetica] font-bold text-[#ff9d00] text-3xl">
              8:00 AM
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
          <CardContent className="p-8">
            <p className="[font-family:'Jost',Helvetica] font-semibold text-gray-600 text-sm mb-2">
              TIME OUT
            </p>
            <p className="[font-family:'Jost',Helvetica] font-bold text-[#ff9d00] text-3xl">
              5:00 PM
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="[font-family:'Jost',Helvetica] font-semibold text-gray-600 text-sm">
              HOURS WORKED TODAY
            </h3>
            <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center">
              <div className="text-center">
                <p className="[font-family:'Jost',Helvetica] font-bold text-[#ff9d00] text-3xl">
                  6
                </p>
                <p className="[font-family:'Jost',Helvetica] font-normal text-white text-xs">
                  hours
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
        <CardContent className="p-8">
          <h3 className="[font-family:'Jost',Helvetica] font-bold text-black text-xl mb-6">
            Performance report
          </h3>
          <div className="flex justify-between items-end h-32 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <div className="w-12 h-24 bg-gray-300 rounded" />
                <p className="[font-family:'Jost',Helvetica] font-normal text-gray-600 text-sm">
                  {day}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
