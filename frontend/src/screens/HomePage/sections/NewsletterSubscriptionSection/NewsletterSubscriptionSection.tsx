import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

export const NewsletterSubscriptionSection = (): JSX.Element => {
  return (
    <section className="relative w-full py-20">
      <div className="relative w-full max-w-[1280px] mx-auto">
        <img
          className="w-full h-[797px] object-cover rounded-lg"
          alt="Rectangle"
          src="/rectangle.png"
        />

        <img
          className="absolute top-[-164px] right-0 w-[739px] h-[565px] pointer-events-none"
          alt="Vector"
          src="/vector-1.svg"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
          <h2 className="[font-family:'Jost',Helvetica] font-normal text-black text-[64px] tracking-[0] leading-normal text-center">
            Want To Stay Updated?
          </h2>

          <p className="[font-family:'Jost',Helvetica] font-normal text-black text-base tracking-[0] leading-normal text-center">
            Want To Stay Updated?
          </p>

          <div className="flex items-center w-full max-w-[626px] bg-[#d9d9d9] rounded-full overflow-hidden h-[54px]">
            <Input
              type="email"
              placeholder="youremailaddress@email.com"
              className="flex-1 h-full border-0 bg-transparent [font-family:'Jost',Helvetica] font-normal italic text-[#00000066] text-xl px-6 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className="h-full w-[147px] bg-[#ff9d00] hover:bg-[#ff9d00]/90 rounded-l-none rounded-r-full [font-family:'Jost',Helvetica] font-semibold text-white text-xl">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
