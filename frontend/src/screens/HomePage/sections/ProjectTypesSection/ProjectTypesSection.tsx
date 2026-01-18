export const ProjectTypesSection = (): JSX.Element => {
  const projectTypes = [
    {
      title: "Building Construction",
      backgroundImage: "/rectangle-1.png",
      gradientClass:
        "bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_64%,rgba(255,157,0,0.4)_100%)]",
    },
    {
      title: "Renovation\n&\nRepair",
      backgroundImage: "/rectangle-2.png",
      gradientClass:
        "bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_64%,rgba(255,157,0,0.4)_100%)]",
    },
    {
      title: "Commercial\nProjects",
      backgroundImage: "/rectangle-27.png",
      gradientClass:
        "bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_63%,rgba(255,157,0,0.4)_100%)]",
    },
    {
      title: "Residential\nProjects",
      backgroundImage: "/rectangle-28.png",
      gradientClass:
        "bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_62%,rgba(255,157,0,0.4)_100%)]",
    },
  ];

  return (
    <section className="w-full relative">
      <div className="grid grid-cols-4">
        {projectTypes.map((project, index) => (
          <div
            key={index}
            className="relative h-[793px] flex bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${project.backgroundImage})` }}
          >
            <div className={`w-full h-full ${project.gradientClass}`}>
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <h3 className="[font-family:'Jost',Helvetica] font-normal text-white text-[32px] text-center tracking-[0] leading-[normal] whitespace-pre-line">
                  {project.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
