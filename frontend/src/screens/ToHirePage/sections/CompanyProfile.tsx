import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { useState } from "react";

interface CompanyProfileProps {
  onClose: () => void;
}

export const CompanyProfile = ({ onClose }: CompanyProfileProps): JSX.Element => {
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

  const handleSave = () => {
    console.log("Profile saved:", formData);
    onClose();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="[font-family:'Jost',Helvetica] font-bold text-black text-4xl">
          Company Profile
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
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="col-span-2">
              <div className="space-y-4">
                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                    Company Name
                  </label>
                  <Input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                    className="w-full h-[44px] bg-gray-100 rounded-lg px-4 [font-family:'Jost',Helvetica] font-normal text-black border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                      Business Type
                    </label>
                    <Input
                      type="text"
                      value={formData.businessType}
                      onChange={(e) => handleChange("businessType", e.target.value)}
                      className="w-full h-[44px] bg-gray-100 rounded-lg px-4 [font-family:'Jost',Helvetica] font-normal text-black border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                      Registration Number
                    </label>
                    <Input
                      type="text"
                      value={formData.registrationNumber}
                      onChange={(e) => handleChange("registrationNumber", e.target.value)}
                      className="w-full h-[44px] bg-gray-100 rounded-lg px-4 [font-family:'Jost',Helvetica] font-normal text-black border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                    Year Established
                  </label>
                  <Input
                    type="text"
                    value={formData.yearEstablished}
                    onChange={(e) => handleChange("yearEstablished", e.target.value)}
                    className="w-full h-[44px] bg-gray-100 rounded-lg px-4 [font-family:'Jost',Helvetica] font-normal text-black border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                      Company Address
                    </label>
                    <Input
                      type="text"
                      value={formData.companyAddress}
                      onChange={(e) => handleChange("companyAddress", e.target.value)}
                      className="w-full h-[44px] bg-gray-100 rounded-lg px-4 [font-family:'Jost',Helvetica] font-normal text-black border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>

                  <div>
                    <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                      Contact Number
                    </label>
                    <Input
                      type="text"
                      value={formData.contactNumber}
                      onChange={(e) => handleChange("contactNumber", e.target.value)}
                      className="w-full h-[44px] bg-gray-100 rounded-lg px-4 [font-family:'Jost',Helvetica] font-normal text-black border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block [font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-2">
                    Company Email Address
                  </label>
                  <Input
                    type="email"
                    value={formData.companyEmail}
                    onChange={(e) => handleChange("companyEmail", e.target.value)}
                    className="w-full h-[44px] bg-gray-100 rounded-lg px-4 [font-family:'Jost',Helvetica] font-normal text-black border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-black rounded-full mb-4" />
              <Button className="bg-white hover:bg-gray-100 text-black rounded-lg h-[44px] px-6 [font-family:'Jost',Helvetica] font-semibold text-sm">
                Change Profile Picture
              </Button>
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
