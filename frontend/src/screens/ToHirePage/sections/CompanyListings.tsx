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
        }
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
          <Button onClick={() => setShowCreateForm(false)}>
            Your Listings
          </Button>
          <Button onClick={() => setShowCreateForm(true)}>
            Create New Listing
          </Button>
        </div>
      </div>

      {/* LISTINGS */}
      {!showCreateForm ? (
        <div className="grid grid-cols-2 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="bg-[#ff9d00]">
              <CardContent className="p-6">
                <h3 className="font-bold">{listing.company}</h3>
                <p>{listing.inNeedOf}</p>
                <p>Salary: {listing.salary}</p>
                <p>Location: {listing.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* CREATE FORM */
        <Card>
          <CardContent className="p-8">
            <Input
              placeholder="Project Name"
              value={formData.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
            />
            {/* keep your other inputs */}
            <Button onClick={handleCreateListing}>Create Listing</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
