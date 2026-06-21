import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[600px] bg-[url(/rectangle-3.png)] bg-cover bg-center bg-fixed flex items-center">

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,227,188,0.3)_0%,rgba(0,0,0,0.3)_100%)]" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Logo */}
      <img
        className="absolute top-3.5 left-[22px] w-[174px] h-[174px] object-cover z-10"
        alt="Construct"
        src="/construct-1-1.png"
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 scale-[95%] origin-center z-10">
        <h1 className="max-w-[567px] [font-family:'Jost',Helvetica] font-extrabold text-white text-[56px] tracking-[0] leading-tight">
          Connecting Skilled Construction Workers with Trusted Companies
        </h1>

        <div className="mt-6 max-w-[316px] [font-family:'Jost',Helvetica] font-extrabold text-[#ffe2bb] text-base tracking-[0] leading-[normal]">
          Hire faster. Work smarter. Build better.
        </div>

        <div className="mt-6 flex gap-[9px]">
          <Button
            onClick={() => navigate("/signup")}
            className="w-[143px] h-[47px] bg-white hover:bg-white/90 rounded-[60px] [font-family:'Jost',Helvetica] font-extrabold text-[#ff9d00] text-base"
          >
            Hire Workers
          </Button>

          <Button
            onClick={() => navigate("/signup")}
            className="w-[143px] h-[47px] bg-transparent hover:bg-white/10 border-2 border-white rounded-[60px] [font-family:'Jost',Helvetica] font-extrabold text-white text-base"
          >
            Find Work
          </Button>
        </div>
      </div>

    </section>
  );
};