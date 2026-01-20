// File: ./sections/WorkerListings.tsx
import { Card, CardContent } from "../../../components/ui/card";

const companyListings = [
  { id: 1, company: "BuildRight Inc.", role: "Welder", duration: "2 weeks", salary: "₱900/day" },
  { id: 2, company: "ConstructCo", role: "Painter", duration: "1 month", salary: "₱850/day" },
  { id: 3, company: "Skyline Builders", role: "Electrician", duration: "3 weeks", salary: "₱950/day" },
];

export const WorkerListings = (): JSX.Element => {
  const handleApply = (listing: typeof companyListings[0]) => {
    alert(`Applied for ${listing.company} - ${listing.role}`);
  };

  return (
    <div className="space-y-6 px-6 py-4">
      <h1 className="text-2xl font-bold [font-family:'Jost',Helvetica] text-black mb-4">
        Company Listings
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {companyListings.map((listing) => (
          <Card
            key={listing.id}
            className="border-none rounded-[20px] shadow-[0px_4px_12px_#00000020] bg-[#00BFFF]"
          >
            <CardContent className="p-6 text-center">
              <p className="text-xl font-bold [font-family:'Jost',Helvetica] text-black mb-2">
                {listing.company}
              </p>
              <p className="text-lg font-normal [font-family:'Jost',Helvetica] text-black mb-4">
                {listing.role}
              </p>

              <div className="space-y-2 mb-4">
                <p className="text-sm font-normal [font-family:'Jost',Helvetica] text-black">
                  Duration: {listing.duration}
                </p>
                <p className="text-sm font-normal [font-family:'Jost',Helvetica] text-black">
                  Salary: {listing.salary}
                </p>
              </div>

              <button
                className="bg-white text-black px-6 py-2 rounded-lg font-semibold mx-auto block"
                onClick={() => handleApply(listing)}
              >
                Apply
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
