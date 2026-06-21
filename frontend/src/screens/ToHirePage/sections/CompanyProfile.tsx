import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { useState, useEffect, useCallback } from "react";

interface CompanyProfileProps {
  onClose: () => void;
  onProfileImageChange?: (image: string | null) => void;
}

interface FormData {
  companyName: string;
  businessType: string;
  registrationNumber: string;
  yearEstablished: string;
  companyAddress: string;
  contactNumber: string;
  companyEmail: string;
  profileImage: string | null;
}

export const CompanyProfile = ({
  onClose,
  onProfileImageChange,
}: CompanyProfileProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    businessType: "",
    registrationNumber: "",
    yearEstablished: "",
    companyAddress: "",
    contactNumber: "",
    companyEmail: "",
    profileImage: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const API_BASE = "http://localhost:5000";

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/api/company/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load profile");
      const data = await res.json();

      setFormData({
        companyName: data.companyName ?? "",
        businessType: data.businessType ?? "",
        registrationNumber: data.registrationNumber ?? "",
        yearEstablished: data.yearEstablished ?? "",
        companyAddress: data.companyAddress ?? "",
        contactNumber: data.contactNumber ?? "",
        companyEmail: data.companyEmail ?? "",
        profileImage: data.profileImage ?? null,
      });

      // ✅ Update sidebar image
      if (onProfileImageChange && data.profileImage) {
        onProfileImageChange(data.profileImage);
      }

      setIsEditing(false);
    } catch (e: any) {
      setError(e?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (field: keyof FormData, value: string) => {
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

  const handleAction = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const res = await fetch(`${API_BASE}/api/company/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      // ✅ Update sidebar image immediately
      if (onProfileImageChange) {
        onProfileImageChange(formData.profileImage);
      }

      alert("Profile saved successfully!");
      setIsEditing(false);
      onClose();
    } catch (e: any) {
      setError(e?.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = isEditing
    ? "bg-white border border-gray-300 shadow-sm focus:border-[#ff9d00] focus:ring-1 focus:ring-[#ff9d00] px-4"
    : "bg-white border-b border-gray-300 rounded-none px-2 font-medium text-black shadow-none disabled:opacity-100 disabled:cursor-text";

  if (loading) return <div className="p-10">Loading profile...</div>;

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-300">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="[font-family:'Jost',Helvetica] font-bold text-black text-4xl">
          Company Profile
        </h1>
        <Button
          onClick={onClose}
          className="bg-white hover:bg-gray-100 text-black rounded-lg h-[44px] px-6 border border-gray-200 shadow-sm"
        >
          Cancel
        </Button>
      </div>

      <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
        <CardContent className="p-10">
          <div className="grid grid-cols-3 gap-12 mb-8">
            <div className="col-span-2 space-y-6">
              <div>
                <label className="block font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                  Company Name
                </label>
                <Input
                  type="text"
                  disabled={!isEditing}
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  className={`w-full h-[44px] text-lg transition-all ${inputClass}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    Business Type
                  </label>
                  <Input
                    type="text"
                    disabled={!isEditing}
                    value={formData.businessType}
                    onChange={(e) =>
                      handleChange("businessType", e.target.value)
                    }
                    className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    Registration Number
                  </label>
                  <Input
                    type="text"
                    disabled={!isEditing}
                    value={formData.registrationNumber}
                    onChange={(e) =>
                      handleChange("registrationNumber", e.target.value)
                    }
                    className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                  Year Established
                </label>
                <Input
                  type="text"
                  disabled={!isEditing}
                  value={formData.yearEstablished}
                  onChange={(e) =>
                    handleChange("yearEstablished", e.target.value)
                  }
                  className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    Company Address
                  </label>
                  <Input
                    type="text"
                    disabled={!isEditing}
                    value={formData.companyAddress}
                    onChange={(e) =>
                      handleChange("companyAddress", e.target.value)
                    }
                    className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    Contact Number
                  </label>
                  <Input
                    type="text"
                    disabled={!isEditing}
                    value={formData.contactNumber}
                    onChange={(e) =>
                      handleChange("contactNumber", e.target.value)
                    }
                    className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                  Company Email Address
                </label>
                <Input
                  type="email"
                  disabled={!isEditing}
                  value={formData.companyEmail}
                  onChange={(e) => handleChange("companyEmail", e.target.value)}
                  className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                />
              </div>
            </div>

            {/* ✅ Profile Image Section */}
            <div className="flex flex-col items-center justify-start pt-2">
              <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full shadow-xl flex items-center justify-center overflow-hidden border-4 border-gray-50 ring-2 ring-gray-200">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Company Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#ff9d00] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                      <span className="text-white text-3xl font-bold">
                        {formData.companyName
                          ? formData.companyName[0].toUpperCase()
                          : "C"}
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs font-medium block">
                      Company Logo
                    </span>
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
                  <div className="bg-white hover:bg-gray-50 text-black border border-gray-300 rounded-lg h-[44px] px-8 font-semibold text-sm shadow-sm flex items-center justify-center">
                    Change Profile Picture
                  </div>
                </label>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100 mt-4">
            <Button
              onClick={handleAction}
              disabled={saving}
              className={`rounded-lg h-[50px] px-10 font-bold text-lg shadow-md transition-all ${
                isEditing
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-[#ff9d00] hover:bg-[#ff8f00] text-white"
              }`}
            >
              {saving
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Edit Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
