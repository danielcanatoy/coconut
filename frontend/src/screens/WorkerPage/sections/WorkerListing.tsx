// File: ./sections/WorkerListings.tsx
import { Card, CardContent } from "../../../components/ui/card";

const companyListings = [
  { 
    id: 1, 
    company: "BuildRight Inc.", 
    role: "Welder",
    timeIn: "8:00 AM",
    timeOut: "5:00 PM",
    duration: "2 weeks", 
    salary: "₱900/day",
    location: "Makati City"
  },
  { 
    id: 2, 
    company: "ConstructCo", 
    role: "Painter", 
    timeIn: "8:00 AM",
    timeOut: "5:00 PM",
    duration: "1 month", 
    salary: "₱850/day", 
    location: "Quezon City"
  },
  { 
    id: 3, 
    company: "Skyline Builders", 
    role: "Electrician", 
    timeIn: "8:00 AM",
    timeOut: "5:00 PM",
    duration: "3 weeks", 
    salary: "₱950/day",
    location: "Taguig City"
  }
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
            className="border-none rounded-[20px] shadow-[0px_4px_12px_#00000020] bg-[#FF9D00]"
          >
            <CardContent className="p-6 flex flex-col text-center">
              <p className="text-2xl font-bold [font-family:'Jost',Helvetica] text-black mb-2">
                {listing.company}
              </p>
              <p className="text-lg font-normal [font-family:'Jost',Helvetica] text-black mb-4">
                {listing.role}
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4 bg-white p-4 rounded-lg text-left flex-1">
                {/* First column */}
                <div className="flex flex-col justify-start space-y-1">
                  <p className="text-sm font-normal [font-family:'Jost',Helvetica] text-black">
                    Time In: {listing.timeIn}
                  </p>
                  <p className="text-sm font-normal [font-family:'Jost',Helvetica] text-black">
                    Time Out: {listing.timeOut}
                  </p>
                </div>

                {/* Second column */}
                <div className="flex flex-col justify-start space-y-1">
                  <p className="text-sm font-normal [font-family:'Jost',Helvetica] text-black">
                    Duration: {listing.duration}
                  </p>
                  <p className="text-sm font-normal [font-family:'Jost',Helvetica] text-black">
                    Salary: {listing.salary}
                  </p>
                </div>

                {/* Location spans both columns */}
                <p className="text-sm font-normal [font-family:'Jost',Helvetica] text-black text-center col-span-2 mt-4">
                  Location: {listing.location}
                </p>
              </div>

              {/* Apply button */}
              <button
                className="bg-white text-black px-10 py-2 rounded-lg font-semibold mx-auto block"
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
