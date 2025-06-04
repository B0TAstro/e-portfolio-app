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
  HiAcademicCap,
  HiClock,
  HiCalendar,
  HiLightBulb,
  HiChartBar
} from "react-icons/hi";
import { BiCode, BiPalette, BiBrain } from "react-icons/bi";
import { HiSpeakerphone } from "react-icons/hi";

type Props = {
  params: Promise<{ project: string }>;
};

const competenceConfig = {
  developper: { icon: BiCode, color: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "Développer" },
  entreprendre: { icon: HiLightBulb, color: "bg-green-500/10 text-green-400 border-green-500/20", label: "Entreprendre" },
  concevoir: { icon: BiPalette, color: "bg-purple-500/10 text-purple-400 border-purple-500/20", label: "Concevoir" },
  exprimer: { icon: HiSpeakerphone, color: "bg-orange-500/10 text-orange-400 border-orange-500/20", label: "Exprimer" },
  comprendre: { icon: BiBrain, color: "bg-red-500/10 text-red-400 border-red-500/20", label: "Comprendre" },
};

const contexteLabels = {
  sae: "SAE (Situation d'Apprentissage et d'Évaluation)",
  ressource: "Ressource pédagogique",
  entreprise: "Mission en entreprise",
  personnel: "Projet personnel",
  freelance: "Freelance/Auto-entrepreneur"
};

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
  return {
    title: `${project.name} | Projet IUT`,
    description: (project.description as any)?.[0]?.children?.[0]?.text || project.name,
    openGraph: {
      images: project.coverImage?.image ? [project.coverImage.image] : [],
      title: project.name,
      description: (project.description as any)?.[0]?.children?.[0]?.text || project.name,
    },
  };
};

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.project;
  const project: ProjectType = await getSingleProject(slug);

  if (!project) {
    return (
      <main className="max-w-6xl mx-auto lg:px-16 px-8 mb-16">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-zinc-400 mb-4">
            Projet non trouvé
          </h1>
          <p className="text-zinc-500 mb-8">
            Ce projet n'existe pas ou a été supprimé.
          </p>
          <Link
            href="/iut"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
          >
            <HiArrowLeft />
            Retour aux projets IUT
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto lg:px-16 px-8 mb-16">
      {/* Navigation */}
      <Link
        href="/iut"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-green-400 transition-colors mb-8 group"
      >
        <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Retour aux projets IUT
      </Link>

      {/* Header */}
      <div className="max-w-4xl mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <HiAcademicCap className="text-green-400" />
              <span className="text-sm font-mono text-zinc-400 uppercase tracking-wider">
                Projet IUT
              </span>
            </div>

            <h1 className="font-bold lg:text-5xl text-3xl lg:leading-tight mb-4">
              {project.name}
            </h1>
          </div>

          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white border border-transparent rounded-lg px-6 py-3 transition-colors duration-300 font-medium"
            >
              <HiExternalLink />
              Voir le projet
            </a>
          )}
        </div>

        {/* Métadonnées */}
        <div className="flex flex-wrap gap-6 text-sm text-zinc-400 mb-6">
          {project.contexte && (
            <div className="flex items-center gap-2">
              <HiAcademicCap className="text-green-400" />
              <span>{contexteLabels[project.contexte as keyof typeof contexteLabels] || project.contexte}</span>
            </div>
          )}
          {project.duree && (
            <div className="flex items-center gap-2">
              <HiClock className="text-green-400" />
              <span>{project.duree}</span>
            </div>
          )}
          {project.periode && (
            <div className="flex items-center gap-2">
              <HiCalendar className="text-green-400" />
              <span>{project.periode}</span>
            </div>
          )}
        </div>

        {/* Compétences */}
        {project.competences && project.competences.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {project.competences.map((competence, index) => {
              const config = competenceConfig[competence as keyof typeof competenceConfig];
              if (!config) return null;

              const IconComponent = config.icon;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border ${config.color}`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{config.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Image de couverture */}
      {project.coverImage && (
        <div className="mb-12">
          <Image
            src={project.coverImage.image}
            width={1200}
            height={600}
            alt={project.coverImage.alt || project.name}
            className="w-full h-96 object-cover rounded-xl border border-zinc-800"
          />
        </div>
      )}

      {/* Contenu du projet */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Contenu principal */}
        <div className="lg:col-span-2 space-y-12">
          {/* Description */}
          {project.description && project.description.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                Description du projet
              </h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <PortableText value={project.description} />
              </div>
            </section>
          )}

          {/* Démarches */}
          {project.demarches && project.demarches.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <HiLightBulb className="text-green-400" />
                Démarches
              </h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <PortableText value={project.demarches} />
              </div>
            </section>
          )}

          {/* Résultats */}
          {project.resultats && project.resultats.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <HiChartBar className="text-green-400" />
                Résultats
              </h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <PortableText value={project.resultats} />
              </div>
            </section>
          )}

          {/* Galerie */}
          {project.galerie && project.galerie.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Galerie</h2>
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
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Ressources mobilisées */}
          {project.ressourcesMobilisees && project.ressourcesMobilisees.length > 0 && (
            <section className="bg-[#1d1d20] border border-zinc-800 rounded-xl p-6">
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
            </section>
          )}

          {/* Informations du projet */}
          <section className="bg-[#1d1d20] border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4">Informations</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Catégorie</span>
                <span className="text-zinc-300 capitalize">{project.categorie}</span>
              </div>
              {project.contexte && (
                <div className="flex justify-between">
                  <span className="text-zinc-400">Contexte</span>
                  <span className="text-zinc-300">
                    {contexteLabels[project.contexte as keyof typeof contexteLabels] || project.contexte}
                  </span>
                </div>
              )}
              {project.duree && (
                <div className="flex justify-between">
                  <span className="text-zinc-400">Durée</span>
                  <span className="text-zinc-300">{project.duree}</span>
                </div>
              )}
              {project.periode && (
                <div className="flex justify-between">
                  <span className="text-zinc-400">Période</span>
                  <span className="text-zinc-300">{project.periode}</span>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}