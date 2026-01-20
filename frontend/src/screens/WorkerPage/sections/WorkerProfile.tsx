import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface WorkerFormData {
  firstName: string;
  middleInitial: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  mobileNumber: string;
  password: string;
  skills: string[];
  canReadPlans: boolean;
  canWorkOvertime: boolean;
  experience: string;
  certifications: string;
  availability: string;
  preferredWages: string;
  workLocation: string;
  languages: string[];
  role: string | null;
}

interface WorkerProfileProps {
  onClose: () => void;
}

export const WorkerProfile = ({ onClose }: WorkerProfileProps): JSX.Element => {
  const location = useLocation();
  const { email, password, userType } = location.state || {};
  
  const skillOptions = [
    "Carpenter",
    "Mason",
    "Welder",
    "Painter",
    "Electrician",
    "Plumber",
    "Heavy Equipment Operator",
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<WorkerFormData>({
    firstName: "",
    middleInitial: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: email || "",
    mobileNumber: "",
    password: password || "",
    skills: [],
    canReadPlans: false,
    canWorkOvertime: false,
    experience: "",
    certifications: "",
    availability: "",
    preferredWages: "",
    workLocation: "",
    languages: [],
    role: userType,
  });

  useEffect(() => {
    if (!email) return;

    fetch(`http://localhost:5000/api/worker/profile?email=${email}`)
      .then((res) => {
        if (res.status === 404) return null;
        return res.json();
      })
      .then((data) => {
        if (data?.exists) {
          setFormData((prev) => ({
            ...prev,
            ...data.data,
            dateOfBirth: toDateInputValue(data.data.dateOfBirth),
          }));
        }
      })
      .catch((err) => console.error("Failed to load worker profile", err));
  }, [email]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toDateInputValue = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    const utc8Time = date.getTime() + 8 * 60 * 60 * 1000;
    const utc8Date = new Date(utc8Time);
    return utc8Date.toISOString().split("T")[0];
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, skill]
        : prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleAction = async () => {
    if (isEditing) {
      const res = await fetch("http://localhost:5000/api/worker/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.created || data.updated) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const inputClass = isEditing
    ? "bg-white border border-gray-300 shadow-sm focus:border-[#ff9d00] focus:ring-1 focus:ring-[#ff9d00] px-4"
    : "bg-white border-b border-gray-300 rounded-none px-2 font-medium text-black shadow-none disabled:opacity-100 disabled:cursor-text";

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-300">
      <div className="flex items-center justify-between">
        <h1 className="[font-family:'Jost',Helvetica] font-bold text-black text-4xl">
          Worker Profile
        </h1>
        <Button
          onClick={onClose}
          className="bg-white hover:bg-gray-100 text-black rounded-lg h-[44px] px-6 border border-gray-200 shadow-sm [font-family:'Jost',Helvetica] font-semibold text-base"
        >
          Cancel
        </Button>
      </div>

      <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
        <CardContent className="p-10">
          <div className="grid grid-cols-3 gap-12 mb-8">
            <div className="col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    First Name
                  </label>
                  <Input
                    type="text"
                    disabled={!isEditing}
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className={`w-full h-[44px] text-lg transition-all ${inputClass}`}
                  />
                </div>
                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    M.I.
                  </label>
                  <Input
                    type="text"
                    disabled={!isEditing}
                    value={formData.middleInitial}
                    onChange={(e) => handleChange("middleInitial", e.target.value)}
                    className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                  />
                </div>
                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    disabled={!isEditing}
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className={`w-full h-[44px] text-lg transition-all ${inputClass}`}
                  />
                </div>
              </div>

              {/* Date of Birth & Gender */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    disabled={!isEditing}
                    value={toDateInputValue(formData.dateOfBirth)}
                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                  />
                </div>
                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    Gender
                  </label>
                  <Input
                    type="text"
                    disabled={!isEditing}
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    disabled={!isEditing}
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                  />
                </div>
                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    Mobile Number
                  </label>
                  <Input
                    type="text"
                    disabled={!isEditing}
                    value={formData.mobileNumber}
                    onChange={(e) => handleChange("mobileNumber", e.target.value)}
                    className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                  />
                </div>
              </div>

              {/* Skills & Capabilities - Native HTML checkboxes */}
              {isEditing && (
                <>
                  <div>
                    <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-4 uppercase tracking-wide">
                      Select Skills
                    </label>
                    <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      {skillOptions.map((skill) => (
                        <label key={skill} className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-[#ff9d00] bg-gray-100 border-gray-300 rounded focus:ring-[#ff9d00] focus:ring-2"
                            checked={formData.skills.includes(skill)}
                            onChange={(e) => handleSkillChange(skill, e.target.checked)}
                          />
                          <span className="[font-family:'Jost',Helvetica] text-sm font-medium text-gray-700">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-4 uppercase tracking-wide">
                      Capabilities
                    </label>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                      <label className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[#ff9d00] bg-gray-100 border-gray-300 rounded focus:ring-[#ff9d00] focus:ring-2"
                          checked={formData.canReadPlans}
                          onChange={(e) => handleChange("canReadPlans", e.target.checked)}
                        />
                        <span className="[font-family:'Jost',Helvetica] text-sm font-medium text-gray-700">Can Read Construction Plans</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[#ff9d00] bg-gray-100 border-gray-300 rounded focus:ring-[#ff9d00] focus:ring-2"
                          checked={formData.canWorkOvertime}
                          onChange={(e) => handleChange("canWorkOvertime", e.target.checked)}
                        />
                        <span className="[font-family:'Jost',Helvetica] text-sm font-medium text-gray-700">Can Work Overtime</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* View mode summaries */}
              {!isEditing && (
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-2 uppercase tracking-wide">
                        Skills
                      </label>
                      <div className="bg-white p-4 rounded-lg border border-gray-200 min-h-[80px] flex items-center">
                        <span className="text-gray-700 font-medium">
                          {formData.skills.length > 0 ? formData.skills.join(", ") : "No skills selected"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-2 uppercase tracking-wide">
                        Capabilities
                      </label>
                      <div className="bg-white p-4 rounded-lg border border-gray-200 min-h-[80px] flex items-center">
                        <span className="text-gray-700 font-medium">
                          {formData.canReadPlans ? "✓ Can read plans" : "✗"} |{" "}
                          {formData.canWorkOvertime ? "✓ Can work overtime" : "✗ No overtime"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Experience & Wages */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    Experience
                  </label>
                  <Input
                    type="text"
                    disabled={!isEditing}
                    value={formData.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                  />
                </div>
                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    Preferred Wages
                  </label>
                  <Input
                    type="text"
                    disabled={!isEditing}
                    value={formData.preferredWages}
                    onChange={(e) => handleChange("preferredWages", e.target.value)}
                    className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                  />
                </div>
                <div>
    <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
      Certifications
    </label>
    <Input
      type="text"
      disabled={!isEditing}
      value={formData.certifications as string || ""}
      onChange={(e) => handleChange("certifications", e.target.value)}
      className={`w-full h-[44px] text-base transition-all ${inputClass}`}
    />
  </div>

              </div>
            </div>

            {/* Profile Image Section */}
            <div className="flex flex-col items-center justify-start pt-2">
              <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full shadow-xl flex items-center justify-center overflow-hidden border-4 border-gray-50 ring-2 ring-gray-200 hover:ring-[#ff9d00] transition-all duration-300">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Worker Profile"
                    className="w-full h-full object-cover rounded-full transition-transform duration-200"
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#ff9d00] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                      <span className="text-white text-xl font-bold">W</span>
                    </div>
                    <span className="text-gray-500 text-xs font-medium block">Worker Photo</span>
                  </div>
                )}
              </div>

              {isEditing && (
                <label className="mt-6 cursor-pointer w-full flex justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="bg-white hover:bg-gray-50 text-black border border-gray-300 rounded-lg h-[44px] px-8 [font-family:'Jost',Helvetica] font-semibold text-sm shadow-sm transition-transform hover:scale-105 flex items-center justify-center">
                    Change Profile Picture
                  </div>
                </label>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100 mt-4">
            <Button
              onClick={handleAction}
              className={`rounded-lg h-[50px] px-10 [font-family:'Jost',Helvetica] font-bold text-lg shadow-md transition-all hover:scale-105 ${
                isEditing
                  ? "bg-green-500 hover:bg-green-600 text-white shadow-green-200"
                  : "bg-[#ff9d00] hover:bg-[#ff8f00] text-white shadow-orange-200"
              }`}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
