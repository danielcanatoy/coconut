
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
                <h3 className="text-center [text-shadow:0_2px_6px_rgba(0,0,0,0.6)] [font-family:'Jost',Helvetica] font-normal text-white text-4xl leading-normal mb-6">
  Who We Are
</h3>


                <p className="[text-shadow:0_2px_4px_rgba(0,0,0,0.55)] [font-family:'Jost',Helvetica] font-normal text-[#fcfbfb] text-2xl leading-relaxed">
  We are a digital construction service platform designed to
  connect trusted construction companies with skilled
  workers—fast, safe, and efficiently. Our goal is to simplify
  hiring, reduce workforce shortages, and help construction
  projects move forward without delays.
</p>

              </div>

             
              
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
