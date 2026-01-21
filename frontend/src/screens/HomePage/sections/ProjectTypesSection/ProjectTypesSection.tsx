

export const ProjectTypesSection = (): JSX.Element => {
  const projectTypes = [
    {
      title: "Building Construction",
      backgroundImage: "/rectangle-1.png",
     
    },
    {
      title: "Renovation & Repair",
      backgroundImage: "/rectangle-2.png",
     
    },
    {
      title: "Commercial Projects",
      backgroundImage: "/rectangle-27.png",
     
    },
    {
      title: "Residential Projects",
      backgroundImage: "/rectangle-28.png",
      
    },
  ];

  return (
    <section className="w-full relative">
      <div className="grid grid-cols-4 gap-0">
        {projectTypes.map((project, index) => (
          <button
            key={index}
            onClick={() => console.log(project.title)}
            className="relative h-[793px] overflow-hidden group cursor-pointer"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out
                         grayscale group-hover:grayscale-0 group-hover:scale-110"
              style={{ backgroundImage: `url(${project.backgroundImage})` }}
            />

            

            {/* Text */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
              <h3 className="[font-family:'Jost',Helvetica] font-normal text-white text-[24px]  text-center whitespace-pre-line transition-transform duration-300 group-hover:scale-105">
                {project.title}
              </h3>

              
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
