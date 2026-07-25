import { notFound } from "next/navigation";
import { WORK_PROJECTS } from "@/data/work";
import ProjectHero from "@/components/work/ProjectHero";
import ProjectContent from "@/components/work/ProjectContent";

export function generateStaticParams() {
  return WORK_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = WORK_PROJECTS.find((p) => p.slug === slug);

  if (!project) return {};

  const description = project.summary
    ? project.summary.split("\n\n")[0].slice(0, 160)
    : `${project.title} — a SPKRHED case study.`;

  return {
    title: `${project.title} | SPKRHED Work`,
    description,
    openGraph: {
      title: `${project.title} | SPKRHED Work`,
      description,
      images: project.images[0] ? [project.images[0]] : undefined,
    },
  };
}

export default async function WorkProjectPage({ params }) {
  const { slug } = await params;
  const project = WORK_PROJECTS.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <>
      <ProjectHero project={project} />
      <ProjectContent project={project} />
    </>
  );
}
