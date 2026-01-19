import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useState, useEffect } from "react";

interface Listing {
  id: number;
  company: string;
  position: string;
  inNeedOf: string;
  timeIn: string;
  timeOut: string;
  salary: string;
  workDays: number;
  progress: number;
  location: string;
}

interface NewListing {
  title: string;
  inNeedOf: string;
  count: string;
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
  const [formData, setFormData] = useState<NewListing>({
    title: "",
    inNeedOf: "",
    count: "",
    timeIn: "",
    timeOut: "",
    salary: "",
    workDays: "",
    location: "",
  });

  /* ✅ LOAD LISTINGS FROM BACKEND */
  useEffect(() => {
    fetch("http://localhost:5000/api/company/listings", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Failed to load listings", err));
  }, []);

  const handleInputChange = (field: keyof NewListing, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ✅ CREATE LISTING (BACKEND) */
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

      // refresh listings
      const updated = await fetch(
        "http://localhost:5000/api/company/listings",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ).then((r) => r.json());

      setListings(updated);
      setShowCreateForm(false);

      // reset form
      setFormData({
        title: "",
        inNeedOf: "",
        count: "",
        timeIn: "",
        timeOut: "",
        salary: "",
        workDays: "",
        location: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create listing");
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="bg-[#ff9d00] rounded-full px-6 py-2">
          <p className="font-bold text-black text-lg">Hello User!</p>
        </div>

        {/* TOGGLE BUTTONS */}
        <div className="flex gap-4">
          <Button 
            onClick={() => setShowCreateForm(false)}
            className={`
              rounded-full px-8 py-6 text-lg font-bold transition-colors duration-200
              ${!showCreateForm 
                ? "bg-[#ff9d00] text-white hover:bg-[#ff8f00]" 
                : "bg-white text-black hover:bg-gray-100 border border-gray-300"}
            `}
          >
            Your Listings
          </Button>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className={`
              rounded-full px-8 py-6 text-lg font-bold transition-colors duration-200
              ${showCreateForm 
                ? "bg-[#ff9d00] text-white hover:bg-[#ff8f00]" 
                : "bg-white text-black hover:bg-gray-100 border border-gray-300"}
            `}
          >
            Create New Listing
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      {!showCreateForm ? (
        /* LISTINGS VIEW */
        <div>
          <h2 className="text-3xl font-bold mb-8">Your Listings</h2>
          <div className="grid grid-cols-2 gap-6">
            {listings.map((listing) => {
              const isOpen = openListingId === listing.id;

              return (
                <Card
                  key={listing.id}
                  className={`
                    bg-[#ff9d00] rounded-2xl shadow-md text-black
                    transition-transform duration-200
                    ${isOpen ? "scale-100" : "hover:scale-[1.02]"}
                  `}
                >
                  <CardContent className="p-5 space-y-3">
                    <h3
                      onClick={() =>
                        setOpenListingId(isOpen ? null : listing.id)
                      }
                      className="text-xl font-extrabold text-center cursor-pointer hover:underline"
                    >
                      {listing.position}
                    </h3>

                    <div
                      className={`
                        overflow-hidden
                        transition-[max-height] duration-500 ease-in-out
                        ${isOpen ? "max-h-96" : "max-h-0"}
                      `}
                    >
                      <div className="bg-white rounded-2xl px-5 py-4 mt-2 space-y-2 text-sm">
                        <p className="font-semibold">In need of:</p>
                        <p className="font-bold text-[#ff9d00] text-lg">
                          {listing.inNeedOf}
                        </p>
                        <p>
                          Time in: <span className="font-semibold text-[#ff9d00]">{listing.timeIn}</span>
                        </p>
                        <p>
                          Time out: <span className="font-semibold text-[#ff9d00]">{listing.timeOut}</span>
                        </p>
                        <p>
                          Salary: <span className="font-semibold text-[#ff9d00]">{listing.salary}</span>
                        </p>
                        <p>
                          Progress: <span className="font-semibold text-[#ff9d00]">{listing.progress}/{listing.workDays} days</span>
                        </p>
                        <p>
                          Location: <span className="font-semibold text-[#ff9d00]">{listing.location}</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        /* CREATE FORM UI */
        <div className="flex flex-col items-center py-10 space-y-6">
          
          {/* Main Orange Card */}
          <div className="bg-[#ff9d00] rounded-[3rem] p-6 shadow-2xl w-[650px]">
            
            {/* Title Input */}
            <div className="text-center mb-6">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="bg-transparent text-center text-3xl font-normal text-gray-800 placeholder-gray-700/70 focus:outline-none w-full tracking-wide"
              />
            </div>

            {/* White Inner Container */}
            <div className="bg-white rounded-[2.5rem] p-10 pb-16 space-y-8 min-h-[500px] shadow-inner">
              
              {/* "In need of:" Section */}
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-bold text-black">In need of:</h3>
                
                {/* Underlined Input for Job Title/Quantity */}
                <div className="relative inline-block w-3/4">
                  <input 
                    type="text" 
                    placeholder="Job Title (Quantity)"
                    value={formData.inNeedOf}
                    onChange={(e) => handleInputChange("inNeedOf", e.target.value)}
                    className="w-full text-center text-gray-600 text-2xl border-b-2 border-gray-300 focus:border-[#ff9d00] focus:outline-none pb-2 font-medium"
                  />
                  {/* Edit Icon */}
                  <span className="absolute right-0 bottom-3 text-gray-400 cursor-pointer hover:text-gray-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Form Fields List */}
              <div className="space-y-5 text-lg font-semibold text-black mt-10 px-8">
                
                {/* Time In */}
                <div className="flex items-center gap-4">
                  <span className="min-w-[100px] text-gray-800">Time in :</span>
                  <input 
                    type="text" 
                    value={formData.timeIn}
                    onChange={(e) => handleInputChange("timeIn", e.target.value)}
                    className="flex-1 border-b-2 border-gray-300 focus:outline-none focus:border-[#ff9d00] py-1 text-gray-700" 
                  />
                </div>

                {/* Time Out */}
                <div className="flex items-center gap-4">
                  <span className="min-w-[100px] text-gray-800">Time out :</span>
                  <input 
                    type="text" 
                    value={formData.timeOut}
                    onChange={(e) => handleInputChange("timeOut", e.target.value)}
                    className="flex-1 border-b-2 border-gray-300 focus:outline-none focus:border-[#ff9d00] py-1 text-gray-700" 
                  />
                </div>

                {/* Salary */}
                <div className="flex items-center gap-4">
                  <span className="min-w-[100px] text-gray-800">Salary :</span>
                  <input 
                    type="text" 
                    value={formData.salary}
                    onChange={(e) => handleInputChange("salary", e.target.value)}
                    className="flex-1 border-b-2 border-gray-300 focus:outline-none focus:border-[#ff9d00] py-1 text-gray-700" 
                  />
                </div>

                {/* Total Work Days */}
                <div className="flex items-center gap-4">
                  <span className="min-w-[160px] text-gray-800">Total Work Days :</span>
                  <input 
                    type="text" 
                    value={formData.workDays}
                    onChange={(e) => handleInputChange("workDays", e.target.value)}
                    className="flex-1 border-b-2 border-gray-300 focus:outline-none focus:border-[#ff9d00] py-1 text-gray-700" 
                  />
                </div>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <span className="min-w-[100px] text-gray-800">Location :</span>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="flex-1 border-b-2 border-gray-300 focus:outline-none focus:border-[#ff9d00] py-1 text-gray-700" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Green "Post!" Button */}
          <button 
            onClick={handleCreateListing}
            className="bg-green-300 text-green-900 font-bold py-3 px-16 rounded-full shadow-lg hover:bg-[#50C878] transition text-xl transform hover:scale-105"
          >
            Post!
          </button>
        </div>
      )}
    </div>
  );
};
