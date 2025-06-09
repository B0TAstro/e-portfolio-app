// app/iut/[project]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getSingleProject } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import {
  HiArrowLeft,
  HiExternalLink,
  HiBriefcase,
  HiClock,
  HiCalendar,
  HiLightBulb,
  HiChartBar,
  HiChatAlt
} from "react-icons/hi";
import { notFound } from "next/navigation";
import CompetenceItem from "@/app/components/shared/CompetenceItem";

type Props = {
  params: Promise<{ project: string }>;
};

const contexteLabels = {
  sae: "SAE (Situation d'Apprentissage et d'Évaluation)",
  ressource: "Ressource pédagogique",
  entreprise: "Mission en entreprise",
  personnel: "Projet personnel",
  freelance: "Freelance/Auto-entrepreneur"
};

// Interface pour typer la description Sanity
interface SanityBlock {
  children?: Array<{
    text?: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.project;
  const project: ProjectType = await getSingleProject(slug);

  if (!project) {
    return {
      title: "Projet non trouvé",
      description: "Ce projet n'existe pas ou a été supprimé."
    };
  }
  
  // Typage correct pour la description Sanity
  const description = Array.isArray(project.description) && project.description.length > 0
    ? (project.description[0] as SanityBlock)?.children?.[0]?.text || project.name
    : project.name;

  return {
    title: `${project.name} | Projet Alternance`,
    description,
    openGraph: {
      images: project.coverImage?.image ? [project.coverImage.image] : [],
      title: project.name,
      description,
    },
  };
};

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.project;
  const project: ProjectType = await getSingleProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto lg:px-16 px-8 mb-16">
      <Link
        href="/alternance"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-green-400 transition-colors mb-8 group"
      >
        <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Retour aux projets Alternance
      </Link>

      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-4">
          <h1 className="font-bold lg:text-5xl text-3xl lg:leading-tight">
            {project.name}
          </h1>
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center gap-2 bg-[#1d1d20] border border-zinc-700 rounded-md px-3 py-2 text-base hover:text-green-400 hover:scale-103 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <HiExternalLink />
            Voir le projet
          </a>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-8 text-sm text-zinc-400 mb-8">
          <div className="flex items-center gap-2">
            <HiBriefcase className="text-green-400" />
            <span>{contexteLabels[project.contexte as keyof typeof contexteLabels] || project.contexte}</span>
          </div>
          <div className="flex items-center gap-2">
            <HiClock className="text-green-400" />
            <span>{project.duree}</span>
          </div>
          <div className="flex items-center gap-2">
            <HiCalendar className="text-green-400" />
            <span>{project.periode}</span>
          </div>
        </div>

        {project.coverImage && (
          <div className="mb-8">
            <Image
              src={project.coverImage.image}
              width={1920}
              height={1080}
              alt={project.coverImage.alt || project.name}
              className="w-full h-150 object-cover rounded-xl border border-zinc-800"
            />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-8">
            {project.description && project.description.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <HiChatAlt className="text-green-400" />
                  Description du projet
                </h2>
                <div className="prose prose-invert prose-lg max-w-none break-words">
                  <PortableText value={project.description} />
                </div>
              </div>
            )}

            {project.demarches && project.demarches.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <HiLightBulb className="text-green-400" />
                  Démarches
                </h2>
                <div className="prose prose-invert prose-lg max-w-none break-words">
                  <PortableText value={project.demarches} />
                </div>
              </div>
            )}

            {project.resultats && project.resultats.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <HiChartBar className="text-green-400" />
                  Résultats
                </h2>
                <div className="prose prose-invert prose-lg max-w-none break-words">
                  <PortableText value={project.resultats} />
                </div>
              </div>
            )}

            {project.galerie && project.galerie.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Galerie</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.galerie.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <Image
                        src={image.image}
                        width={600}
                        height={400}
                        alt={image.alt || `Image ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg border border-zinc-800"
                      />
                      {image.caption && (
                        <p className="text-sm text-zinc-400 italic">{image.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-y-4">
            {project.competences && project.competences.length > 0 && (
              <div className="bg-[#1d1d20] border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Compétences utilisées</h3>
                <div className="flex flex-wrap gap-3">
                  {project.competences.map((competence, index) => (
                    <CompetenceItem key={index} competence={competence} />
                  ))}
                </div>
              </div>
            )}

            {project.ressourcesMobilisees && project.ressourcesMobilisees.length > 0 && (
              <div className="bg-[#1d1d20] border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Ressources mobilisées</h3>
                <div className="flex flex-wrap gap-2">
                  {project.ressourcesMobilisees.map((ressource, index) => (
                    <span
                      key={index}
                      className="bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1 text-sm text-zinc-300"
                    >
                      {ressource}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}