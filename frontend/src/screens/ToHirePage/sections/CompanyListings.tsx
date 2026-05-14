import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useState, useEffect } from "react";

interface Listing {
  id: number;
  employer_id: number;
  position: string;
  in_need_of: string;
  time_in: string;
  time_out: string;
  salary: string;
  work_days: number;
  progress: number;
  location: string;
}

interface NewListing {
  position: string;
  inNeedOf: string;
  timeIn: string;
  timeOut: string;
  salary: string;
  workDays: string;
  location: string;
}

export const CompanyListings = (): JSX.Element => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [openListingId, setOpenListingId] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [formData, setFormData] = useState<NewListing>({
    position: "",
    inNeedOf: "",
    timeIn: "",
    timeOut: "",
    salary: "",
    workDays: "",
    location: "",
  });

  // 1. Fetch Listings
  const fetchListings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/company/listings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load Listings", err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // 2. Real-time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (field: keyof NewListing, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 3. Create Listing Function
  const handleCreateListing = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/company/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create listing");

      alert("Job posted successfully!");
      fetchListings(); // Refresh list
      setShowCreateForm(false);
      setFormData({
        position: "",
        inNeedOf: "",
        timeIn: "",
        timeOut: "",
        salary: "",
        workDays: "",
        location: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error: Check if all fields are filled.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Clock Section */}
      <div className="flex justify-end">
        <span className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 font-['Jost'] font-medium text-black text-lg">
          {currentTime}
        </span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4">
        <Button
          onClick={() => setShowCreateForm(false)}
          className={`font-['Jost'] font-normal text-black text-lg px-6 py-2 rounded-full shadow-md transition-all ${
            !showCreateForm ? "bg-[#FF9D00]" : "bg-white"
          }`}
        >
          Your Listings
        </Button>
        <Button
          onClick={() => setShowCreateForm(true)}
          className={`font-['Jost'] font-normal text-black text-lg px-6 py-2 rounded-full shadow-md transition-all ${
            showCreateForm ? "bg-[#FF9D00]" : "bg-white"
          }`}
        >
          Create New Listing
        </Button>
      </div>

      {!showCreateForm ? (
        /* Listings Display */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {listings.map((listing) => {
            const isOpen = openListingId === listing.id;
            return (
              <Card
                key={listing.id}
                className={`bg-[#ff9d00] rounded-2xl shadow-md text-black border-none transition-all ${
                  isOpen ? "scale-100" : "hover:scale-[1.01]"
                }`}
              >
                <CardContent className="p-5 space-y-3">
                  <h3
                    onClick={() => setOpenListingId(isOpen ? null : listing.id)}
                    className="text-xl font-extrabold text-center cursor-pointer hover:underline uppercase"
                  >
                    {listing.position}
                  </h3>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-96" : "max-h-0"}`}
                  >
                    <div className="bg-white rounded-2xl px-5 py-4 mt-2 space-y-2 text-sm shadow-inner">
                      <p className="font-semibold">
                        In need of:{" "}
                        <span className="text-[#ff9d00]">
                          {listing.in_need_of}
                        </span>
                      </p>
                      <p>
                        Time:{" "}
                        <span className="font-semibold">
                          {listing.time_in} - {listing.time_out}
                        </span>
                      </p>
                      <p>
                        Salary:{" "}
                        <span className="font-semibold">₱{listing.salary}</span>
                      </p>
                      <p>
                        Progress:{" "}
                        <span className="font-semibold">
                          {listing.progress || 0}/{listing.work_days} days
                        </span>
                      </p>
                      <p>📍 {listing.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Create Form Section */
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-[#ff9d00] rounded-[3rem] p-6 shadow-2xl w-full max-w-[650px]">
            <input
              type="text"
              placeholder="Title (e.g. Carpenter Needed)"
              value={formData.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
              className="bg-transparent text-center text-3xl font-bold text-gray-800 placeholder-gray-700/50 focus:outline-none w-full mb-4"
            />

            <div className="bg-white rounded-[2.5rem] p-8 space-y-6 shadow-inner">
              <div className="text-center">
                <h3 className="text-xl font-bold text-black mb-2">
                  In need of:
                </h3>
                <input
                  type="text"
                  placeholder="Job Title (Quantity)"
                  value={formData.inNeedOf}
                  onChange={(e) =>
                    handleInputChange("inNeedOf", e.target.value)
                  }
                  className="w-3/4 text-center text-2xl border-b-2 border-gray-300 focus:border-[#ff9d00] focus:outline-none pb-1"
                />
              </div>

              <div className="space-y-4 px-4">
                {[
                  { label: "Time in", key: "timeIn" },
                  { label: "Time out", key: "timeOut" },
                  { label: "Salary", key: "salary" },
                  { label: "Total Work Days", key: "workDays" },
                  { label: "Location", key: "location" },
                ].map((field) => (
                  <div key={field.key} className="flex items-center gap-4">
                    <span className="min-w-[140px] font-bold text-gray-700">
                      {field.label} :
                    </span>
                    <input
                      type="text"
                      value={formData[field.key as keyof NewListing]}
                      onChange={(e) =>
                        handleInputChange(
                          field.key as keyof NewListing,
                          e.target.value,
                        )
                      }
                      className="flex-1 border-b-2 border-gray-200 focus:outline-none focus:border-[#ff9d00] py-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleCreateListing}
            className="bg-green-400 text-white font-bold py-3 px-20 rounded-full shadow-lg hover:bg-green-500 transition-all text-xl transform hover:scale-105"
          >
            Post!
          </button>
        </div>
      )}
    </div>
  );
};
