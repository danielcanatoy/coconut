import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { useState, useEffect } from "react";

interface WorkerFormData {
  firstName: string;
  middleInitial: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  mobileNumber: string;
  skills: string[];
  experience: string;
  certifications: string;
  availability: string;
  preferredWages: string;
  workLocation: string;
  languages: string[];
  profileImage: string | null;
}

interface WorkerProfileProps {
  onClose: () => void;
  onProfileImageChange?: (image: string | null) => void;
}

const skillOptions = [
  "Carpenter",
  "Mason",
  "Welder",
  "Painter",
  "Electrician",
  "Plumber",
  "Heavy Equipment Operator",
];

const toDateInputValue = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  const utc8Time = date.getTime() + 8 * 60 * 60 * 1000;
  return new Date(utc8Time).toISOString().split("T")[0];
};

export const WorkerProfile = ({
  onClose,
  onProfileImageChange,
}: WorkerProfileProps): JSX.Element => {
  const [formData, setFormData] = useState<WorkerFormData>({
    firstName: "",
    middleInitial: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    mobileNumber: "",
    skills: [],
    experience: "",
    certifications: "",
    availability: "",
    preferredWages: "",
    workLocation: "",
    languages: [],
    profileImage: null,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/worker/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.exists && data?.data) {
          setFormData({
            firstName: data.data.firstName || "",
            middleInitial: data.data.middleInitial || "",
            lastName: data.data.lastName || "",
            dateOfBirth: toDateInputValue(data.data.dateOfBirth),
            gender: data.data.gender || "",
            email: data.data.email || "",
            mobileNumber: data.data.mobileNumber || "",
            skills: Array.isArray(data.data.skills) ? data.data.skills : [],
            experience: data.data.experience || "",
            certifications: data.data.certifications || "",
            availability: data.data.availability || "",
            preferredWages: data.data.preferredWages || "",
            workLocation: data.data.workLocation || "",
            languages: Array.isArray(data.data.languages)
              ? data.data.languages
              : [],
            profileImage: data.data.profileImage || null,
          });

          // ✅ Update sidebar image
          if (onProfileImageChange) {
            onProfileImageChange(data.data.profileImage || null);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load worker profile", err);
        setLoading(false);
      });
  }, [token]);

  const handleChange = <K extends keyof WorkerFormData>(
    field: K,
    value: WorkerFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Convert image to base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setFormData((prev) => ({ ...prev, profileImage: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/worker/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save");

      // ✅ Update sidebar image
      if (onProfileImageChange) {
        onProfileImageChange(formData.profileImage);
      }

      alert("Profile saved successfully!");
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10">Loading profile...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="[font-family:'Jost',Helvetica] font-bold text-black text-4xl">
          Edit Profile
        </h1>
        <Button
          onClick={onClose}
          className="bg-white hover:bg-gray-100 text-black rounded-lg h-[44px] px-6"
        >
          Cancel
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
        <CardContent className="p-8 space-y-8">
          {/* ✅ Profile Image Upload */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-4 border-gray-200 shadow-lg mb-4">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-4xl font-bold">
                  {formData.firstName
                    ? formData.firstName[0].toUpperCase()
                    : "?"}
                </span>
              )}
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <div className="bg-[#FF9D00] hover:bg-[#ff8f00] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md">
                Upload Photo
              </div>
            </label>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block font-semibold text-black text-sm mb-2">
                First Name
              </label>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="w-full h-[44px] bg-white px-4 border border-gray-300 rounded-lg focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
              />
            </div>
            <div>
              <label className="block font-semibold text-black text-sm mb-2">
                Middle Initial
              </label>
              <Input
                type="text"
                value={formData.middleInitial}
                onChange={(e) => handleChange("middleInitial", e.target.value)}
                className="w-full h-[44px] bg-white px-4 border border-gray-300 rounded-lg focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
              />
            </div>
            <div>
              <label className="block font-semibold text-black text-sm mb-2">
                Last Name
              </label>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full h-[44px] bg-white px-4 border border-gray-300 rounded-lg focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-black text-sm mb-2">
                Date of Birth
              </label>
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                className="w-full h-[44px] bg-white px-4 border border-gray-300 rounded-lg focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
              />
            </div>
            <div>
              <label className="block font-semibold text-black text-sm mb-2">
                Gender
              </label>
              <Input
                type="text"
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full h-[44px] bg-white px-4 border border-gray-300 rounded-lg focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
              />
            </div>
          </div>

          <h3 className="font-bold text-black text-lg">Contact Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-black text-sm mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={formData.email}
                disabled
                className="w-full h-[44px] bg-gray-100 px-4 border border-gray-300 rounded-lg opacity-70"
              />
            </div>
            <div>
              <label className="block font-semibold text-black text-sm mb-2">
                Mobile Number
              </label>
              <Input
                type="text"
                value={formData.mobileNumber}
                onChange={(e) => handleChange("mobileNumber", e.target.value)}
                className="w-full h-[44px] bg-white px-4 border border-gray-300 rounded-lg focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
              />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-black text-lg mb-4">Skills</h3>
            <div className="grid grid-cols-2 gap-3">
              {skillOptions.map((skill) => (
                <label key={skill} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        skills: e.target.checked
                          ? [...prev.skills, skill]
                          : prev.skills.filter((s) => s !== skill),
                      }));
                    }}
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          <h3 className="font-bold text-black text-lg">Work Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-black text-sm mb-2">
                Experience
              </label>
              <Input
                type="text"
                value={formData.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
                className="w-full h-[44px] bg-white px-4 border border-gray-300 rounded-lg focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
              />
            </div>
            <div>
              <label className="block font-semibold text-black text-sm mb-2">
                Certifications
              </label>
              <Input
                type="text"
                value={formData.certifications}
                onChange={(e) => handleChange("certifications", e.target.value)}
                className="w-full h-[44px] bg-white px-4 border border-gray-300 rounded-lg focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
              />
            </div>
            <div>
              <label className="block font-semibold text-black text-sm mb-2">
                Availability
              </label>
              <Input
                type="text"
                value={formData.availability}
                onChange={(e) => handleChange("availability", e.target.value)}
                className="w-full h-[44px] bg-white px-4 border border-gray-300 rounded-lg focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
              />
            </div>
            <div>
              <label className="block font-semibold text-black text-sm mb-2">
                Preferred Wage
              </label>
              <Input
                type="text"
                value={formData.preferredWages}
                onChange={(e) => handleChange("preferredWages", e.target.value)}
                className="w-full h-[44px] bg-white px-4 border border-gray-300 rounded-lg focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
              />
            </div>
            <div>
              <label className="block font-semibold text-black text-sm mb-2">
                Location
              </label>
              <Input
                type="text"
                value={formData.workLocation}
                onChange={(e) => handleChange("workLocation", e.target.value)}
                className="w-full h-[44px] bg-white px-4 border border-gray-300 rounded-lg focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
              />
            </div>
            <div>
              <label className="block font-semibold text-black text-sm mb-2">
                Languages (comma separated)
              </label>
              <Input
                type="text"
                value={formData.languages.join(", ")}
                onChange={(e) =>
                  handleChange(
                    "languages",
                    e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  )
                }
                className="w-full h-[44px] bg-white px-4 border border-gray-300 rounded-lg focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-500 hover:bg-green-600 text-white rounded-lg h-[44px] px-8 font-semibold text-base"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
