import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useState, useEffect } from "react";

interface Listing {
  id: number;
  employer_id: number;
  position: string;
  in_need_of: string; // ✅ snake_case to match DB
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
  const [currentTime, setCurrentTime] = useState("");
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  const [formData, setFormData] = useState<NewListing>({
    position: "",
    inNeedOf: "",
    timeIn: "",
    timeOut: "",
    salary: "",
    workDays: "",
    location: "",
  });

  const token = localStorage.getItem("token");

  // =========================
  // FETCH LISTINGS
  // =========================
  const fetchListings = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/company/listings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch listings");
      const data = await res.json();
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Listings Error:", err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // =========================
  // REAL TIME CLOCK
  // =========================
  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (field: keyof NewListing, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // =========================
  // CREATE LISTING
  // =========================
  const handleCreateListing = async () => {
    if (
      !formData.position ||
      !formData.inNeedOf ||
      !formData.timeIn ||
      !formData.timeOut ||
      !formData.salary ||
      !formData.workDays ||
      !formData.location
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/company/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          workDays: parseInt(formData.workDays),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create listing");

      alert("Job posted successfully!");
      fetchListings();
      setFormData({
        position: "",
        inNeedOf: "",
        timeIn: "",
        timeOut: "",
        salary: "",
        workDays: "",
        location: "",
      });
      setShowCreateForm(false);
    } catch (err) {
      console.error("Create Listing Error:", err);
      alert("Failed to create listing.");
    }
  };

  // =========================
  // DELETE LISTING
  // =========================
  const handleDeleteListing = async (id: number) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/company/listings/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!res.ok) throw new Error("Delete failed");
      alert("Listing deleted!");
      setOpenListingId(null);
      fetchListings();
    } catch (err) {
      console.error(err);
      alert("Failed to delete listing.");
    }
  };

  // =========================
  // EDIT LISTING
  // =========================
  const handleEditClick = (listing: Listing) => {
    setEditingListing(listing);
    setFormData({
      position: listing.position,
      inNeedOf: listing.in_need_of,
      timeIn: listing.time_in,
      timeOut: listing.time_out,
      salary: listing.salary,
      workDays: String(listing.work_days),
      location: listing.location,
    });
  };

  const handleUpdateListing = async () => {
    if (!editingListing) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/company/listings/${editingListing.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            workDays: parseInt(formData.workDays),
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update listing");

      alert("Listing updated successfully!");
      setEditingListing(null);
      setFormData({
        position: "",
        inNeedOf: "",
        timeIn: "",
        timeOut: "",
        salary: "",
        workDays: "",
        location: "",
      });
      fetchListings();
    } catch (err) {
      console.error(err);
      alert("Failed to update listing.");
    }
  };

  // =========================
  // EDIT FORM (modal)
  // =========================
  if (editingListing) {
    return (
      <div className="space-y-8">
        <div className="flex justify-end">
          <span className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 font-['Jost'] font-medium text-black text-lg">
            {currentTime}
          </span>
        </div>

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
                  { label: "Time In", key: "timeIn" },
                  { label: "Time Out", key: "timeOut" },
                  { label: "Salary", key: "salary" },
                  { label: "Total Work Days", key: "workDays" },
                  { label: "Location", key: "location" },
                ].map((field) => (
                  <div key={field.key} className="flex items-center gap-4">
                    <span className="min-w-[140px] font-bold text-gray-700">
                      {field.label}:
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

          <div className="flex gap-4">
            <button
              onClick={handleUpdateListing}
              className="bg-blue-500 text-white font-bold py-3 px-16 rounded-full shadow-lg hover:bg-blue-600 transition-all text-xl"
            >
              Update!
            </button>
            <button
              onClick={() => {
                setEditingListing(null);
                setFormData({
                  position: "",
                  inNeedOf: "",
                  timeIn: "",
                  timeOut: "",
                  salary: "",
                  workDays: "",
                  location: "",
                });
              }}
              className="bg-gray-400 text-white font-bold py-3 px-16 rounded-full shadow-lg hover:bg-gray-500 transition-all text-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* CLOCK */}
      <div className="flex justify-end">
        <span className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 font-['Jost'] font-medium text-black text-lg">
          {currentTime}
        </span>
      </div>

      {/* TOP BUTTONS */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {listings.length === 0 ? (
            <div className="col-span-full text-center text-gray-600 text-lg font-semibold">
              No listings available.
            </div>
          ) : (
            listings.map((listing) => {
              const isOpen = openListingId === listing.id;
              return (
                <Card
                  key={listing.id}
                  className={`bg-[#ff9d00] rounded-2xl shadow-md text-black border-none transition-all duration-300 ${
                    isOpen ? "scale-100" : "hover:scale-[1.01]"
                  }`}
                >
                  <CardContent className="p-5 space-y-3">
                    {/* TITLE */}
                    <h3
                      onClick={() =>
                        setOpenListingId(isOpen ? null : listing.id)
                      }
                      className="text-xl font-extrabold text-center cursor-pointer hover:underline uppercase"
                    >
                      {listing.position}
                    </h3>

                    {/* EXPANDABLE DETAILS */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-[500px]" : "max-h-0"}`}
                    >
                      <div className="bg-white rounded-2xl px-5 py-4 mt-2 space-y-3 text-sm shadow-inner">
                        <p className="font-semibold">
                          In need of:
                          <span className="text-[#ff9d00] ml-2">
                            {listing.in_need_of}
                          </span>
                        </p>
                        <p>
                          Time:
                          <span className="font-semibold ml-2">
                            {listing.time_in} - {listing.time_out}
                          </span>
                        </p>
                        <p>
                          Salary:
                          <span className="font-semibold ml-2">
                            ₱{listing.salary}
                          </span>
                        </p>
                        <p>
                          Progress:
                          <span className="font-semibold ml-2">
                            {listing.progress || 0}/{listing.work_days} days
                          </span>
                        </p>
                        <p>📍 {listing.location}</p>

                        {/* ✅ EDIT & DELETE BUTTONS */}
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => handleEditClick(listing)}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1.5 rounded-xl transition-all"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteListing(listing.id)}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1.5 rounded-xl transition-all"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      ) : (
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
                  { label: "Time In", key: "timeIn" },
                  { label: "Time Out", key: "timeOut" },
                  { label: "Salary", key: "salary" },
                  { label: "Total Work Days", key: "workDays" },
                  { label: "Location", key: "location" },
                ].map((field) => (
                  <div key={field.key} className="flex items-center gap-4">
                    <span className="min-w-[140px] font-bold text-gray-700">
                      {field.label}:
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
