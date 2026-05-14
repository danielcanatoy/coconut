import { Card, CardContent } from "../../../../components/ui/card";
import { useState } from "react";

const benefitItemsData = [
  {
    title: "Manpower\nShortages",
    description:
      "We help you manage manpower shortages efficiently with our system.",
    image: "/vector.png",
  },
  {
    title: "Job\nOpportunities",
    description:
      "Workers can discover new job opportunities tailored to their skills.",
    image: "/Rectangle 131.png",
  },
  {
    title: "Efficient\nHiring",
    description: "Companies can hire qualified workers faster and smarter.",
    image: "/Rectangle 132.png",
  },
];

export const BenefitsSection = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full py-16 scale-[95%] origin-top">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Buttons */}
          <div className="flex flex-col">
            <div className="mb-8">
              <p className="[font-family:'Jost',Helvetica] font-medium text-black text-xl text-center lg:text-left tracking-[0] leading-[normal] mb-2">
                Why choose us?
              </p>
              <h2 className="[font-family:'Jost',Helvetica] font-medium text-[#ff9d00] text-[61px] text-center lg:text-left tracking-[0] leading-[normal]">
                BENEFITS
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {benefitItemsData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative text-left p-4 rounded-lg border border-solid border-[#cdb7b7] transition-all duration-200 flex items-center gap-2 ${
                    activeIndex === index
                      ? "border-l-[6px] border-l-[#ff9d00] bg-[#fff7eb] shadow-md"
                      : "hover:border-l-[6px] hover:border-l-[#ff9d00] hover:bg-[#fff7eb]"
                  }`}
                >
                  {activeIndex === index && (
                    <img
                      className="w-max-[22px] h-max-[27px]"
                      alt="Polygon"
                      src="/polygon-1.svg"
                    />
                  )}
                  <h3 className="[font-family:'Jost',Helvetica] font-medium text-black text-[30px] tracking-[0] leading-[normal] whitespace-pre-line">
                    {item.title}
                  </h3>
                </button>
              ))}
            </div>
          </div>

          {/* Right Image and Card */}
          <div className="flex flex-col items-center lg:items-end justify-center">
            <div className="relative w-full max-w-[725px] flex flex-col items-center lg:items-end">
              <img
                className="w-full max-h-[420px] object-cover mt-40"
                alt={benefitItemsData[activeIndex].title}
                src={benefitItemsData[activeIndex].image}
              />

              <Card className="absolute bottom-0 left-1/2 transform -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 w-full max-w-[356px] bg-[#ff9d00] border-none rounded-none p-4">
                <CardContent>
                  <p className="[font-family:'Jost',Helvetica] font-medium text-black text-[1.5rem] text-center tracking-[0] leading-[normal]">
                    {benefitItemsData[activeIndex].description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
