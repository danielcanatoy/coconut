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
      <div className="relative w-full h-[180px]"> {/* Reduced height further */}
        {/* Background Image */}
        <img
          className="absolute inset-0 w-full h-full object-cover"
          alt="Rectangle"
          src="/rectangle-30.png"
        />

        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 w-full h-full bg-[#00000042]" />

        {/* Left graphic */}
        <img
          className="absolute top-0 left-[20px] w-[280px] h-[170px] object-contain"
          alt="Construct"
          src="/construct-1.png"
        />

        {/* Right graphic */}
        <img
          className="absolute top-[60px] right-[50px] w-[130px] h-[70px] object-contain"
          alt="Group"
          src="/group-11.png"
        />

        {/* Left nav */}
        <nav className="absolute top-[40px] left-[500px] flex flex-col gap-0">
          {leftNavLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className="[font-family:'Jost',Helvetica] font-normal text-black text-lg tracking-[0] leading-[normal] h-[24px] hover:underline"
            >
              {link.text}
            </a>
          ))}
        </nav>

        {/* Right nav */}
        <nav className="absolute top-[40px] left-[700px] flex flex-col gap-0">
          {rightNavLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className="[font-family:'Jost',Helvetica] font-normal text-black text-lg tracking-[0] leading-[normal] h-[24px] hover:underline"
            >
              {link.text}
            </a>
          ))}
        </nav>

        {/* Footer text */}
        <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 [font-family:'Jost',Helvetica] font-normal text-black text-lg tracking-[0] leading-[normal] whitespace-nowrap">
          ©2025 Construction Co. 
        </div>
      </div>
    </footer>
  );
};
