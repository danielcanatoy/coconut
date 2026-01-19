import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { useState } from "react";

interface CompanyProfileProps {
  onClose: () => void;
}

export const CompanyProfile = ({ onClose }: CompanyProfileProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "LUXURY",
    businessType: "Construction",
    registrationNumber: "REG-2024-001",
    yearEstablished: "2020",
    companyAddress: "123 Main St, City, Province",
    contactNumber: "+63 123 456 7890",
    companyEmail: "company@example.com",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAction = () => {
    if (isEditing) {
      console.log("Profile saved:", formData);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  // Added 'px-3' (padding-left/right) to view mode for spacing
  const inputClass = isEditing
    ? "bg-white border border-gray-300 shadow-sm focus:border-[#ff9d00] focus:ring-1 focus:ring-[#ff9d00] px-4" 
    : "bg-white border-b border-gray-300 rounded-none px-2 font-medium text-black shadow-none disabled:opacity-100 disabled:cursor-text"; 

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-300">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="[font-family:'Jost',Helvetica] font-bold text-black text-4xl">
          Company Profile
        </h1>
        <Button
          onClick={onClose}
          className="bg-white hover:bg-gray-100 text-black rounded-lg h-[44px] px-6 border border-gray-200 shadow-sm [font-family:'Jost',Helvetica] font-semibold text-base"
        >
          Cancel
        </Button>
      </div>

      {/* MAIN CARD */}
      <Card className="bg-white border-none rounded-[20px] shadow-[0px_4px_12px_#00000020]">
        <CardContent className="p-10">
          <div className="grid grid-cols-3 gap-12 mb-8">
            
            {/* LEFT COLUMN: FORM FIELDS */}
            <div className="col-span-2 space-y-6">
              
              {/* Company Name */}
              <div>
                <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
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

              {/* Row: Business Type & Reg Number */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    Business Type
                  </label>
                  <Input
                    type="text"
                    disabled={!isEditing}
                    value={formData.businessType}
                    onChange={(e) => handleChange("businessType", e.target.value)}
                    className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                  />
                </div>
                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    Registration Number
                  </label>
                  <Input
                    type="text"
                    disabled={!isEditing}
                    value={formData.registrationNumber}
                    onChange={(e) => handleChange("registrationNumber", e.target.value)}
                    className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                  />
                </div>
              </div>

              {/* Year Est */}
              <div>
                <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                  Year Established
                </label>
                <Input
                  type="text"
                  disabled={!isEditing}
                  value={formData.yearEstablished}
                  onChange={(e) => handleChange("yearEstablished", e.target.value)}
                  className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                />
              </div>

              {/* Row: Address & Contact */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    Company Address
                  </label>
                  <Input
                    type="text"
                    disabled={!isEditing}
                    value={formData.companyAddress}
                    onChange={(e) => handleChange("companyAddress", e.target.value)}
                    className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                  />
                </div>
                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
                    Contact Number
                  </label>
                  <Input
                    type="text"
                    disabled={!isEditing}
                    value={formData.contactNumber}
                    onChange={(e) => handleChange("contactNumber", e.target.value)}
                    className={`w-full h-[44px] text-base transition-all ${inputClass}`}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block [font-family:'Jost',Helvetica] font-bold text-gray-500 text-sm mb-1 uppercase tracking-wide">
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

            {/* RIGHT COLUMN: PROFILE PICTURE */}
            <div className="flex flex-col items-center justify-start pt-2">
              <div className="w-48 h-48 bg-black rounded-full mb-6 shadow-xl flex items-center justify-center overflow-hidden border-4 border-gray-50 ring-1 ring-gray-200">
                 <span className="text-white text-xs opacity-50">Logo</span>
              </div>
              
              {isEditing && (
                <Button className="bg-white hover:bg-gray-50 text-black border border-gray-300 rounded-lg h-[44px] px-6 [font-family:'Jost',Helvetica] font-semibold text-sm shadow-sm transition-transform hover:scale-105">
                  Change Profile Picture
                </Button>
              )}
            </div>
          </div>

          {/* ACTION BUTTON */}
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
