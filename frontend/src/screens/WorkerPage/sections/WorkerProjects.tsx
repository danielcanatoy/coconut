import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

const activeProjects = [
  {
    id: 1,
    company: "LightLab",
    role: "Steel Worker",
    inNeedOf: "Carpenter (3D)",
    timeIn: "9:00 am",
    timeOut: "5:30 pm",
    duration: "3 weeks",
  },
  {
    id: 2,
    company: "Mango",
    role: "Electrician",
    inNeedOf: "Mechanic (2D)",
    timeIn: "10:00 am",
    timeOut: "6:00 pm",
    duration: "2 weeks",
  },
];

const completedJobs = [
  {
    id: 1,
    company: "Moon Phases",
    duration: "2 weeks",
  },
];

const companyListings = [
  {
    id: 1,
    company: "LightLab",
    role: "Studio Construction",
    inNeedOf: "Carpenter (2D)",
  },
  {
    id: 2,
    company: "LightLab",
    role: "Studio Construction",
    inNeedOf: "Carpenter (2D)",
  },
];

export const WorkerProjects = (): JSX.Element => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="[font-family:'Jost',Helvetica] font-bold text-black text-3xl mb-6">
          Active Projects
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {activeProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-[#ff9d00] border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="[font-family:'Jost',Helvetica] font-bold text-black text-lg">
                    {project.company}
                  </p>
                  <p className="[font-family:'Jost',Helvetica] font-normal text-black text-sm">
                    {project.role}
                  </p>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <p className="[font-family:'Jost',Helvetica] font-semibold text-black">
                    In need of:
                  </p>
                  <p className="[font-family:'Jost',Helvetica] font-normal text-black">
                    {project.inNeedOf}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div>
                    <p className="[font-family:'Jost',Helvetica] font-semibold text-black">
                      Time in:
                    </p>
                    <p className="[font-family:'Jost',Helvetica] font-normal text-black">
                      {project.timeIn}
                    </p>
                  </div>
                  <div>
                    <p className="[font-family:'Jost',Helvetica] font-semibold text-black">
                      Time out:
                    </p>
                    <p className="[font-family:'Jost',Helvetica] font-normal text-black">
                      {project.timeOut}
                    </p>
                  </div>
                </div>

                <p className="[font-family:'Jost',Helvetica] font-semibold text-black text-xs mb-3">
                  Duration: {project.duration}
                </p>

                <Button className="w-full bg-white hover:bg-gray-100 text-black rounded-lg h-[36px] [font-family:'Jost',Helvetica] font-semibold text-sm">
                  View
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="[font-family:'Jost',Helvetica] font-bold text-black text-3xl mb-6">
          Completed Jobs
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {completedJobs.map((job) => (
            <Card
              key={job.id}
              className="bg-green-400 border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]"
            >
              <CardContent className="p-6">
                <p className="[font-family:'Jost',Helvetica] font-bold text-white text-lg mb-2">
                  {job.company}
                </p>
                <p className="[font-family:'Jost',Helvetica] font-normal text-white text-sm">
                  Duration: {job.duration}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="[font-family:'Jost',Helvetica] font-bold text-black text-3xl mb-6">
          Company Listings
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {companyListings.map((listing) => (
            <Card
              key={listing.id}
              className="bg-[#ff9d00] border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="[font-family:'Jost',Helvetica] font-bold text-black text-lg">
                    {listing.company}
                  </p>
                  <p className="[font-family:'Jost',Helvetica] font-normal text-black text-sm">
                    {listing.role}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="[font-family:'Jost',Helvetica] font-semibold text-black text-sm">
                    In need of:
                  </p>
                  <p className="[font-family:'Jost',Helvetica] font-normal text-black text-sm">
                    {listing.inNeedOf}
                  </p>
                </div>

                <Button className="w-full bg-white hover:bg-gray-100 text-black rounded-lg h-[36px] [font-family:'Jost',Helvetica] font-semibold text-sm">
                  Apply
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
