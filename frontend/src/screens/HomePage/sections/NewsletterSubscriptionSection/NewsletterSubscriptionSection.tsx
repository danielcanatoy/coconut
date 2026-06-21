import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { useNavigate } from "react-router-dom";

export const NewsletterSubscriptionSection = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-[5%] overflow-hidden">

      {/* Background Image */}
      <div
      className="absolute inset-0 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80  ')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1a1a1a]/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 scale-[95%] origin-center">

        <div className="flex flex-col items-center justify-center gap-6 py-24 border-2 border-white rounded-2xl px-12">
          <h2 className="font-['Jost'] font-semibold text-white text-[42px] tracking-wide leading-tight text-center">
            START BUILDING BETTER OPPORTUNITIES TODAY
          </h2>

          <p className="font-['Jost'] font-normal text-white text-[18px] text-center">
            Construction Co. connects skilled construction workers with trusted companies looking for reliable talent.
            Whether you're searching for job opportunities or building a stronger workforce, our platform makes hiring simpler,
            faster, and more efficient.
          </p>

          <Button
            onClick={() => navigate("/signup")}
            className="w-[180px] h-[47px] bg-[#ff9d00]  hover:bg-white/90 rounded-[60px] [font-family:'Jost',Helvetica] font-extrabold text-white text-base"
          >
            Sign Up Now
          </Button>

        </div>

      </div>
    </section>
  );
};