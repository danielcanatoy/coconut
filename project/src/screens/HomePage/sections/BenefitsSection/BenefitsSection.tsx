import { Card, CardContent } from "../../../../components/ui/card";

const benefitItems = [
  {
    title: "Manpower\nShortages",
    isActive: true,
  },
  {
    title: "Job\nOpportunities",
    isActive: false,
  },
  {
    title: "Efficient\nHiring",
    isActive: false,
  },
];

export const BenefitsSection = (): JSX.Element => {
  return (
    <section className="relative w-full py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col">
            <div className="mb-8">
              <p className="[font-family:'Jost',Helvetica] font-medium text-black text-xl text-center lg:text-left tracking-[0] leading-[normal] mb-2">
                Why choose us?
              </p>
              <h2 className="[font-family:'Jost',Helvetica] font-medium text-[#ff9d00] text-[64px] text-center lg:text-left tracking-[0] leading-[normal]">
                BENEFITS
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {benefitItems.map((item, index) => (
                <Card
                  key={index}
                  className={`relative border border-solid border-[#cdb7b7] rounded-none ${
                    item.isActive ? "border-l-[6px] border-l-[#ff9d00]" : ""
                  }`}
                >
                  <CardContent className="p-6 flex items-center gap-2">
                    {item.isActive && (
                      <img
                        className="w-[22px] h-[27px]"
                        alt="Polygon"
                        src="/polygon-1.svg"
                      />
                    )}
                    <h3 className="[font-family:'Jost',Helvetica] font-medium text-black text-[40px] tracking-[0] leading-[normal] whitespace-pre-line">
                      {item.title}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col items-center lg:items-end">
            <div className="relative w-full max-w-[764px]">
              <img
                className="w-full h-auto object-cover"
                alt="Vector"
                src="/vector.png"
              />
              <Card className="absolute bottom-0 left-1/2 transform -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 w-full max-w-[376px] bg-[#ff9d00] border-none rounded-none">
                <CardContent className="p-4">
                  <p className="[font-family:'Jost',Helvetica] font-medium text-black text-2xl text-center tracking-[0] leading-[normal]">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                    Dolor sit amet consectetur adipiscing elit quisque faucibus.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="hidden lg:block absolute top-0 right-0 w-3.5 h-[352px] bg-[#ff9d00]" />
          </div>
        </div>
      </div>
    </section>
  );
};
