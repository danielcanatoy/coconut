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
  certifications: File | null;
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

  const [profilePreview, setProfilePreview] = useState<string>("");

  const handleProfileImageChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setProfilePreview(reader.result as string);
  };
  reader.readAsDataURL(file);
};



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
    certifications: null,
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

  const handleChange = <K extends keyof WorkerFormData>(
    field: K,
    value: WorkerFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toDateInputValue = (value?: string) => {
    if (!value) return "";

    const date = new Date(value);

    // Convert to UTC+8 (8 hours = 8 * 60 * 60 * 1000)
    const utc8Time = date.getTime() + 8 * 60 * 60 * 1000;
    const utc8Date = new Date(utc8Time);

    return utc8Date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const handleSave = async () => {
    const res = await fetch("http://localhost:5000/api/worker/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.created) alert("Profile created!");
    if (data.updated) alert("Profile updated!");

    window.location.reload();
  };

  
  

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="[font-family:'Jost',Helvetica] font-bold text-black text-4xl">
          Edit Profile
        </h1>
        <Button
          onClick={onClose}
          className="bg-white hover:bg-gray-100 text-black rounded-lg h-[44px] px-6 [font-family:'Jost',Helvetica] font-semibold text-base"
        >
          Cancel
        </Button>
      </div>
      

      <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
        <CardContent className="p-8">
<div className="flex justify-center items-start">
  <label className="cursor-pointer">
    <div
      className="
        w-[120px]
        h-[120px]
        rounded-full
        bg-gray-100
        flex
        items-center
        justify-center
        overflow-hidden
        hover:bg-gray-200
      "
    >
      {profilePreview ? (
        <img
          src={profilePreview}
          alt="Profile Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-gray-500 text-sm">
          Upload
        </span>
      )}
    </div>

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleProfileImageChange}
    />
  </label>
</div>

          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                First Name
              </label>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="w-full h-[44px] bg-white px-4
                  [font-family:'Jost',Helvetica] font-normal text-black
                  border border-gray-300 rounded-lg
                  focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
                  />
            </div>

            <div>
              <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                M.I.
              </label>
              <Input
                type="text"
                value={formData.middleInitial}
                onChange={(e) => handleChange("middleInitial", e.target.value)}
                className="w-full h-[44px] bg-white px-4
                [font-family:'Jost',Helvetica] font-normal text-black
                border border-gray-300 rounded-lg
                focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
                />
            </div>

            <div>
              <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                Last Name
              </label>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full h-[44px] bg-white px-4
                  [font-family:'Jost',Helvetica] font-normal text-black
                  border border-gray-300 rounded-lg
                  focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
                  />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                Date of Birth
              </label>
              <Input
                type="date"
                value={toDateInputValue(formData.dateOfBirth)}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                className="w-full h-[44px] bg-white px-4
                  [font-family:'Jost',Helvetica] font-normal text-black
                  border border-gray-300 rounded-lg
                  focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
                  />
            </div>

            <div>
              <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                Gender
              </label>
              <Input
                type="text"
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                 className="w-full h-[44px] bg-white px-4
                  [font-family:'Jost',Helvetica] font-normal text-black
                  border border-gray-300 rounded-lg
                  focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
                  />
            </div>
          </div>

          <h3 className="[font-family:'Jost',Helvetica] font-bold text-black text-lg mb-4">
            Contact Information
          </h3>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                 className="w-full h-[44px] bg-white px-4
                  [font-family:'Jost',Helvetica] font-normal text-black
                  border border-gray-300 rounded-lg
                  focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
                  />
            </div>

            <div>
              <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                Mobile Number
              </label>
              <Input
                type="text"
                value={formData.mobileNumber}
                onChange={(e) => handleChange("mobileNumber", e.target.value)}
                className="w-full h-[44px] bg-white px-4
                  [font-family:'Jost',Helvetica] font-normal text-black
                  border border-gray-300 rounded-lg
                  focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
                  />
            </div>
          </div>

          <h3 className="[font-family:'Jost',Helvetica] font-bold text-black text-lg mb-4">
            Work & Skill (Checkbox)
          </h3>
          
          {/* Skills Checkbox Selection */}
              <div className="col-span-2 mt-4">
              <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                Select Skills
              </label>

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

                          {/* Capability Checkboxes */}
              <div className="col-span-2 mt-4">
                <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                  Capabilities
                </label>

                <label className="flex items-center gap-2 text-sm mb-2">
                  <input
                    type="checkbox"
                    checked={formData.canReadPlans}
                    onChange={(e) =>
                      handleChange("canReadPlans", e.target.checked)
                    }
                  />
                  Can Read Construction Plans
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.canWorkOvertime}
                    onChange={(e) =>
                      handleChange("canWorkOvertime", e.target.checked)
                    }
                  />
                  Can Work Overtime
                </label>
              </div>



          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                Skills
              </label>
              <Input
                type="text"
                value={formData.skills.join(", ")}
                onChange={(e) =>
                  handleChange(
                    "skills",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
              />
            </div>

            <div>
              <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                Experience
              </label>
              <Input
                type="text"
                value={formData.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
                className="w-full h-[44px] bg-white px-4
                  [font-family:'Jost',Helvetica] font-normal text-black
                  border border-gray-300 rounded-lg
                  focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
                  />
            </div>

            <div>
              <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                Certifications
              </label>
              <input
  type="file"
  accept=".pdf,.jpg,.jpeg,.png"
  
  onChange={(e) =>
    handleChange(
      "certifications",
      e.target.files ? e.target.files[0] : null
    )
  
  }
   className="w-full h-[44px] bg-white px-4
                  [font-family:'Jost',Helvetica] font-normal text-black
                  border border-gray-300 rounded-lg
                  focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
                  />


            </div>

            <div>
              <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                Availability & Location
              </label>
              <Input
                type="text"
                value={formData.availability}
                onChange={(e) => handleChange("availability", e.target.value)}
                 className="w-full h-[44px] bg-white px-4
                  [font-family:'Jost',Helvetica] font-normal text-black
                  border border-gray-300 rounded-lg
                  focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
                  />
            </div>

            <div>
              <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                Preferred Wage Location: Willing to travel (5) KM
              </label>
              <Input
                type="text"
                value={formData.preferredWages}
                onChange={(e) => handleChange("preferredWages", e.target.value)}
                className="w-full h-[44px] bg-white px-4
                  [font-family:'Jost',Helvetica] font-normal text-black
                  border border-gray-300 rounded-lg
                  focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
                  />
            </div>

            <div>
              <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                Expected Salary
              </label>
              <Input
                type="text"
                value={formData.workLocation}
                onChange={(e) => handleChange("workLocation", e.target.value)}
                 className="w-full h-[44px] bg-white px-4
                  [font-family:'Jost',Helvetica] font-normal text-black
                  border border-gray-300 rounded-lg
                  focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
                  />
            </div>

            <div>
              <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                Languages
              </label>
              <Input
                type="text"
                value={formData.languages.join(", ")}
                onChange={(e) =>
                  handleChange(
                    "languages",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
                 className="w-full h-[44px] bg-white px-4
                  [font-family:'Jost',Helvetica] font-normal text-black
                  border border-gray-300 rounded-lg
                  focus:border-[#FF9D00] focus:ring-1 focus:ring-[#FF9D00]"
                  />
              
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white rounded-lg h-[44px] px-8 [font-family:'Jost',Helvetica] font-semibold text-base"
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
