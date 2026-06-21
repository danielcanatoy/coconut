import { Card, CardContent } from "../../../../components/ui/card";

export const AboutCompanySection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-white py-[5%] overflow-hidden">

      <div className="container mx-auto px-4 scale-[95%] origin-center">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* LEFT SIDE - IMAGE */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full">

              <img
                className="w-full h-[480px] object-cover rounded-2xl"
                alt="Construction site background"
                src="/rectangle-14.png"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/25 rounded-2xl" />

              {/* Accent Bar */}
              <div className="absolute top-[140px] left-0 w-3.5 h-[240px] bg-[#ff9d00]" />

            </div>
          </div>

          {/* RIGHT SIDE - TEXT */}
          <div className="flex items-stretch justify-center lg:justify-end">

            <Card className="w-full bg-transparent border-none shadow-none">
              <CardContent className="p-0 h-full">

                {/* Content Box */}
                <div className="bg-[#ff9d00] px-8 py-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.35)] h-[480px] flex flex-col justify-center">

                  <h2 className="text-left font-['Jost'] font-semibold text-[#1a1a1a] text-[42px] tracking-wide leading-tight mb-3">
                    ABOUT OUR COMPANY
                  </h2>

                  <h3 className="text-left font-['Jost'] font-medium text-white text-[28px] mb-3">
                    Who We Are
                  </h3>

                  <p className="font-['Jost'] text-[#1a1a1a] text-s leading-6 text-left">
                    We are a digital construction service platform designed to connect trusted construction companies with skilled workers fast, safely, and efficiently. Our goal is to simplify hiring, reduce workforce shortages, and help construction projects move forward without delays.
                    We bridge the gap between employers and workers by providing a reliable and organized system where companies can easily find qualified talent, and workers can discover job opportunities that match their skills and experience.
                    By improving communication and streamlining the hiring process, we aim to reduce downtime in construction projects and eliminate the inefficiencies of traditional recruitment methods. Our platform is built to support both small and large-scale projects, ensuring that the right people are always matched with the right jobs at the right time.
                    Ultimately, we strive to make construction hiring more accessible, efficient, and dependable for everyone involved.
                  </p>

                </div>

              </CardContent>
            </Card>

          </div>

        </div>

      </div>
    </section>
  );
};