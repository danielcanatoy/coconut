import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

export const HeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-[832px]">
      <div className="relative w-full h-full flex bg-[url(/rectangle-3.png)] bg-cover bg-center">
        <div className="w-full h-full bg-[linear-gradient(180deg,rgba(255,227,188,0.3)_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      <img
        className="absolute top-3.5 left-[22px] w-[174px] h-[174px] object-cover"
        alt="Construct"
        src="/construct-1-1.png"
      />

      <div className="absolute top-[200px] left-[109px] w-[467px] [font-family:'Jost',Helvetica] font-extrabold text-white text-[40px] tracking-[0] leading-[normal]">
        Connecting Skilled Construction Workers with Trusted Companies
      </div>

      <div className="absolute top-[374px] left-[115px] w-[316px] [font-family:'Jost',Helvetica] font-extrabold text-[#ffe2bb] text-base tracking-[0] leading-[normal]">
        Hire faster. Work smarter. Build better.
      </div>

      <div className="absolute top-[420px] left-[109px] flex gap-[9px]">
        <Button className="w-[143px] h-[47px] bg-[#12000066] hover:bg-[#12000099] rounded-[60px] [font-family:'Jost',Helvetica] font-extrabold text-[#ff9d00] text-base">
          Hire Workers
        </Button>

        <Button className="w-[143px] h-[47px] bg-[#12000066] hover:bg-[#12000099] rounded-[60px] [font-family:'Jost',Helvetica] font-extrabold text-[#ff9d00] text-base">
          Find Work
        </Button>
      </div>

      <Input
        type="email"
        defaultValue="danielcanatoy@gmail.com"
        className="absolute top-[479px] left-[109px] w-[367px] h-[47px] bg-[#d9d9d9] rounded-[60px] px-[18px] [font-family:'Jost',Helvetica] font-normal italic text-[#00000066] text-base border-0"
      />

      <img
        className="absolute top-64 left-[1266px] w-3.5 h-[352px]"
        alt="Rectangle"
        src="/rectangle-39.svg"
      />
    </section>
  );
};
