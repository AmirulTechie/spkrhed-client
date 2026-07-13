import Image from "next/image";

const PROJECTS = [
  {
    category: "/ Marketing Agency",
    name: "Breez Banner System",
    services: "UI/UX, Development, Marketing",
    image: "/images/Home/project-thubmnails/project-01.png",
  },
  {
    category: "/ Agency",
    name: "BQS Website",
    services: "UI/UX, Development, Marketing",
    image: "/images/Home/project-thubmnails/project-02.png",
  },
  {
    category: "/ Fashion",
    name: "Tuft & Stitch",
    services: "Branding, Marketing, Website",
    image: "/images/Home/project-thubmnails/project-03.png",
  },
  {
    category: "/ Healthcare",
    name: "Concord Medical",
    services: "UI/UX, Development, Marketing",
    image: "/images/Home/project-thubmnails/project-04.png",
  },
];

function ProjectRow({ project }) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-poppins text-[clamp(14px,1.3889vw,20px)] leading-[0.97] text-[#b7b7b7]">
          {project.category}
        </p>
        <h3 className="mt-[clamp(8px,2.2917vw,33px)] font-anton-sc text-[clamp(28px,3.4722vw,50px)] uppercase leading-[0.97] text-white">
          {project.name}
        </h3>
        <p className="mt-[clamp(24px,8.125vw,117px)] font-poppins text-[clamp(14px,1.3889vw,20px)] leading-[0.97] text-[#b7b7b7]">
          {project.services}
        </p>
      </div>

      <div className="relative aspect-544/362 w-full overflow-hidden rounded-[30px] sm:w-[clamp(280px,37.7778vw,544px)] sm:shrink-0">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(min-width: 640px) 544px, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="relative overflow-hidden py-[clamp(64px,9.7222vw,140px)]">
      <div className="relative mx-auto max-w-325 px-[clamp(24px,5.5556vw,80px)]">
        <div className="flex items-center gap-3">
          <Image
            src="/images/Home/banner-bullet.png"
            alt=""
            width={20}
            height={20}
            className="h-[clamp(10px,0.8333vw,15px)] w-[clamp(10px,0.8333vw,15px)]"
          />
          <span className="font-poppins text-[clamp(14px,1.6667vw,24px)] font-semibold uppercase text-[#b7b7b7]">
            Selected Projects
          </span>
        </div>

        <div className="mt-[clamp(16px,2.7778vw,40px)] flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <h2 className="font-anton-sc text-[clamp(32px,6.0417vw,87px)] uppercase leading-[0.97] text-white">
            <span className="block">A Curated</span>
            <span className="block">Collection</span>
            <span className="block">
              Of <span className="text-[#AC40FF]">Projects</span>
            </span>
          </h2>

          <p className="font-poppins text-[clamp(16px,1.5278vw,22px)] font-medium leading-[1.05] text-[#b7b7b7] lg:max-w-[clamp(300px,29.2361vw,421px)]">
            Projects across brand strategy, visual identity, web design,
            development, and visual content. Each project here represents a
            specific brief, a specific challenge, and a specific outcome.
          </p>
        </div>

        <div className="mt-[clamp(48px,6.9444vw,100px)] flex flex-col gap-[clamp(32px,6.9444vw,100px)]">
          {PROJECTS.map((project) => (
            <ProjectRow key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
