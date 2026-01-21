import { useState, useEffect } from "react";
import { Card, CardContent } from "../../../components/ui/card";

interface Listing {
  id: number;
  employer_id: number;
  company_name: string;
  in_need_of: string;
  time_in: string;
  time_out: string;
  duration: string;
  salary: string;
  location: string;
}

export const WorkerListings = (): JSX.Element => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch listings mula sa backend
  useEffect(() => {
    fetch("http://localhost:5000/api/worker/listings")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
        setLoading(false);
      });
  }, []);

  // 2. Function para sa pag-apply (Updated to use worker_id)
  const handleApply = async (listingId: number, companyName: string, role: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/worker/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listing_id: listingId,
          worker_id: 1, // Pansamantala munang hardcoded. Palitan ng logged-in user ID later.
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Successfully applied for ${role} at ${companyName || 'this company'}!`);
      } else {
        alert(`Failed to apply: ${result.error || "Please try again."}`);
      }
    } catch (error) {
      console.error("Application error:", error);
      alert("Network error. Please check your connection.");
    }
  };

  return (
    <div className="space-y-6 px-6 py-4">
      <h1 className="font-normal [font-family:'Jost',Helvetica] text-black mb-4 bg-[#FF9D00] px-6 py-2 rounded-full inline-block shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
        Company Listings
      </h1>

      {loading ? (
        <p className="text-center [font-family:'Jost',Helvetica]">Loading available jobs...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {listings.map((listing) => (
            <Card
              key={listing.id}
              className="border-none rounded-[20px] max-w-[400px] shadow-[0px_4px_12px_#00000020] bg-[#FF9D00]"
            >
              <CardContent className="p-6 flex flex-col text-center">
                <p className="text-2xl font-bold [font-family:'Jost',Helvetica] text-black mb-2">
                  {listing.company_name || `Employer #${listing.employer_id}`}
                </p>
                
                <p className="text-lg font-semibold [font-family:'Jost',Helvetica] text-black mb-4">
                  {listing.in_need_of}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4 bg-white p-4 rounded-lg text-left flex-1">
                  <div className="flex flex-col justify-start space-y-1">
                    <p className="text-sm font-normal [font-family:'Jost',Helvetica] text-black">
                      Time In: <span className="font-semibold">{listing.time_in}</span>
                    </p>
                    <p className="text-sm font-normal [font-family:'Jost',Helvetica] text-black">
                      Time Out: <span className="font-semibold">{listing.time_out}</span>
                    </p>
                  </div>

                  <div className="flex flex-col justify-start space-y-1">
                    <p className="text-sm font-normal [font-family:'Jost',Helvetica] text-black">
                      Duration: <span className="font-semibold">{listing.duration}</span>
                    </p>
                    <p className="text-sm font-normal [font-family:'Jost',Helvetica] text-black">
                      Salary: <span className="font-semibold">{listing.salary}</span>
                    </p>
                  </div>

                  <div className="col-span-2 mt-2 pt-2 border-t border-gray-100">
                    <p className="text-sm font-normal [font-family:'Jost',Helvetica] text-black text-center">
                      📍 {listing.location}
                    </p>
                  </div>
                </div>

                <button
                  className="bg-white text-black px-10 py-2 rounded-lg font-semibold mx-auto block hover:bg-gray-100 hover:shadow-md transition-all duration-200 active:scale-95"
                  onClick={() => handleApply(listing.id, listing.company_name, listing.in_need_of)}
                >
                  Apply Now
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && listings.length === 0 && (
        <div className="text-center py-20 opacity-50">
          <p className="text-xl [font-family:'Jost',Helvetica]">No active listings available right now.</p>
        </div>
      )}
    </div>
  );
};