import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
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
  position: string;
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
  const [formData, setFormData] = useState<NewListing>({
    position: "",
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
        },
      ).then((r) => r.json());

      setListings(updated);
      setShowCreateForm(false);

      // reset form
      setFormData({
        position: "",
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
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="bg-[#ff9d00] rounded-full px-6 py-2">
          <p className="font-bold text-black text-lg">Hello User!</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowCreateForm(false)}>
            Your Listings
          </Button>
          <Button
            className="bg-[#ff9d00]"
            onClick={() => setShowCreateForm(true)}
          >
            Create New Listing
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      {!showCreateForm ? (
        /* ===================== LISTINGS ===================== */
        <div className="grid grid-cols-2 gap-8">
          {listings.map((listing) => (
            <Card
              key={listing.id}
              className="bg-[#f6b14a] border-none shadow-md p-3"
            >
              <CardContent className="p-0">
                <div className="bg-white rounded-xl p-6 space-y-3">
                  {/* TITLE */}
                  <h3 className="text-center font-bold text-sm">
                    {listing.position}
                  </h3>

                  {/* IN NEED OF */}
                  <div className="text-sm">
                    <p className="font-semibold">In need of :</p>
                    <p className="text-[#ff8c00] font-bold">
                      {listing.inNeedOf}
                    </p>
                  </div>

                  {/* DETAILS */}
                  <div className="text-xs space-y-1 text-gray-700">
                    <p>
                      Time in :{" "}
                      <span className="font-semibold">{listing.timeIn}</span>
                    </p>
                    <p>
                      Time out :{" "}
                      <span className="font-semibold">{listing.timeOut}</span>
                    </p>
                    <p>
                      Salary :{" "}
                      <span className="font-semibold">{listing.salary}</span>
                    </p>
                    <p>
                      Total Work Days :{" "}
                      <span className="font-semibold">{listing.workDays}</span>
                    </p>
                    <p>
                      Location :{" "}
                      <span className="font-semibold">{listing.location}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* ===================== CREATE FORM ===================== */
        <Card className="max-w-md mx-auto bg-[#f6b14a] border-none shadow-lg p-3">
          <CardContent className="p-0">
            <div className="bg-white rounded-xl p-6 space-y-4">
              <h2 className="text-center font-bold text-sm">
                Create Job Listing
              </h2>

              <Input
                placeholder="Project Title"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
              />

              <Input
                placeholder="In need of (e.g. Carpenter)"
                value={formData.inNeedOf}
                onChange={(e) => handleInputChange("inNeedOf", e.target.value)}
              />

              <Input
                placeholder="Quantity needed"
                value={formData.count}
                onChange={(e) => handleInputChange("count", e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Time in"
                  value={formData.timeIn}
                  onChange={(e) => handleInputChange("timeIn", e.target.value)}
                />
                <Input
                  placeholder="Time out"
                  value={formData.timeOut}
                  onChange={(e) => handleInputChange("timeOut", e.target.value)}
                />
              </div>

              <Input
                placeholder="Salary per day"
                value={formData.salary}
                onChange={(e) => handleInputChange("salary", e.target.value)}
              />

              <Input
                placeholder="Total work days"
                value={formData.workDays}
                onChange={(e) => handleInputChange("workDays", e.target.value)}
              />

              <Input
                placeholder="Location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />

              <Button
                className="w-full bg-[#ff9d00]"
                onClick={handleCreateListing}
              >
                Post
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
