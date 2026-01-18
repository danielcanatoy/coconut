import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const AboutCompanySection = (): JSX.Element => {
  return (
    <section className="relative w-full h-[737px] overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        alt="Construction site background"
        src="/rectangle-14.png"
      />

      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(102,102,102,0.01)_35%)]" />

      <div className="absolute top-[202px] left-0 w-3.5 h-[352px] bg-[#ff9d00]" />

      <div className="relative h-full flex items-center justify-end px-8 md:px-16 lg:px-24">
        <Card className="w-full max-w-[628px] bg-transparent border-none shadow-[0px_4px_4px_#00000040]">
          <CardContent className="p-0">
            <div className="relative">
              <div className="pt-6 px-7">
                <h2 className="[font-family:'Jost',Helvetica] font-normal text-[#ff9d00] text-[64px] tracking-[0] leading-[normal]">
                  About Our Company
                </h2>
              </div>

              <div className="mt-6 bg-[#0c01013d] px-[17px] py-6">
                <h3 className="text-center [-webkit-text-stroke:1px_#0000004c] [font-family:'Jost',Helvetica] font-normal text-white text-4xl tracking-[0] leading-[normal] mb-6">
                  Who We Are
                </h3>

                <p className="[-webkit-text-stroke:1px_#00000026] [font-family:'Jost',Helvetica] font-normal text-[#fcfbfb] text-2xl tracking-[0] leading-[normal]">
                  We are a digital construction service platform designed to
                  connect trusted construction companies with skilled
                  workers—fast, safe, and efficiently. Our goal is to simplify
                  hiring, reduce workforce shortages, and help construction
                  projects move forward without delays.
                </p>
              </div>

              <div className="flex justify-center mt-8">
                <Button className="bg-[#ff9d00] hover:bg-[#ff9d00]/90 text-black rounded-[100px] shadow-[0px_4px_4px_#00000040] h-14 px-10 [font-family:'Jost',Helvetica] font-normal text-2xl">
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
