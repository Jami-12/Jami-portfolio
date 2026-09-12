import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectById, projects } from "@/lib/projects";
import ProjectDetail from "@/components/projects/ProjectDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return projects.map((project) => ({ id: String(project.id) }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Mujaddid Ahmed Jami`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}