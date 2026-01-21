// File: ./sections/WorkerListings.tsx
import { Card, CardContent } from "../../../components/ui/card";
import { useEffect, useState } from "react";

interface Listing {
  id: number;
  position: string;
  time_in: string;
  time_out: string;
  salary: number;
  location: string;
}

export const WorkerListings = (): JSX.Element => {
  /* =========================
     STATE: REAL LISTINGS
  ========================= */
  const [companyListings, setCompanyListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  /* =========================
     FETCH LISTINGS FROM DB
  ========================= */
  useEffect(() => {
    fetch("http://localhost:5000/api/company/public-listings", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCompanyListings(data))
      .catch((err) => console.error("FETCH LISTINGS ERROR:", err));
  }, []);

  /* =========================
     APPLY TO JOB
  ========================= */
  const handleApply = async (listingId: number) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/worker/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ listingId }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("APPLY RESPONSE ERROR:", errText);
        throw new Error(errText);
      }

      alert("Applied successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 px-6 py-4">
      <h1 className="font-bold [font-family:'Jost',Helvetica] text-black mb-4">
        Company Listings
      </h1>

      {companyListings.length === 0 && (
        <div className="text-center text-gray-500">No available listings</div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {companyListings.map((listing) => (
          <Card
            key={listing.id}
            className="border-none rounded-[20px] shadow-[0px_4px_12px_#00000020] bg-[#FF9D00]"
          >
            <CardContent className="p-6 flex flex-col text-center">
              <p className="text-2xl font-bold [font-family:'Jost',Helvetica] text-black mb-2">
                {listing.position}
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4 bg-white p-4 rounded-lg text-left flex-1">
                <div className="flex flex-col space-y-1">
                  <p>Time In: {listing.time_in}</p>
                  <p>Time Out: {listing.time_out}</p>
                </div>

                <div className="flex flex-col space-y-1">
                  <p>Salary: ₱{listing.salary}/day</p>
                  <p>Location: {listing.location}</p>
                </div>
              </div>

              {/* Apply button */}
              <button
                disabled={loading}
                className="bg-white text-black px-10 py-2 rounded-lg font-semibold mx-auto disabled:opacity-60"
                onClick={() => handleApply(listing.id)}
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
