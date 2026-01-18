export const FooterSection = (): JSX.Element => {
  const leftNavLinks = [
    { text: "Home" },
    { text: "About us" },
    { text: "Find Work" },
    { text: "Hire Workers" },
  ];

  const rightNavLinks = [
    { text: "Support" },
    { text: "FAQs" },
    { text: "Give Feedback" },
    { text: "Contact us" },
  ];

  return (
    <footer className="relative w-full">
      <div className="relative w-full h-[269px]">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          alt="Rectangle"
          src="/rectangle-30.png"
        />

        <div className="absolute inset-0 w-full h-full bg-[#00000042]" />

        <img
          className="absolute top-0 left-[30px] w-[346px] h-[267px] object-contain"
          alt="Construct"
          src="/construct-1.png"
        />

        <img
          className="absolute top-[97px] right-[79px] w-[164px] h-[89px] object-contain"
          alt="Group"
          src="/group-11.png"
        />

        <nav className="absolute top-[77px] left-[610px] flex flex-col gap-0">
          {leftNavLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className="[font-family:'Jost',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal] h-[29px] hover:underline"
            >
              {link.text}
            </a>
          ))}
        </nav>

        <nav className="absolute top-[77px] left-[817px] flex flex-col gap-0">
          {rightNavLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className="[font-family:'Jost',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal] h-[29px] hover:underline"
            >
              {link.text}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-[34px] left-1/2 -translate-x-1/2 [font-family:'Jost',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal] whitespace-nowrap">
          ©2025 Construction Co. All rights para kay Piga
        </div>
      </div>
    </footer>
  );
};
