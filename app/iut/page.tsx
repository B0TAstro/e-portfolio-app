// app/iut/page.tsx

import Image from "next/image";
import Link from "next/link";
import { getIUTData, getProjectsByCategory } from "@/lib/sanity.query";
import type { IUTType, ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import { HiAcademicCap, HiClock, HiCalendar } from "react-icons/hi";
import { BiCode, BiPalette, BiBrain } from "react-icons/bi";
import { HiSpeakerphone, HiLightBulb } from "react-icons/hi";

const competenceIcons = {
  developper: BiCode,
  entreprendre: HiLightBulb,
  concevoir: BiPalette,
  exprimer: HiSpeakerphone,
  comprendre: BiBrain,
};

const competenceColors = {
  developper: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  entreprendre: "bg-green-500/10 text-green-400 border-green-500/20",
  concevoir: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  exprimer: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  comprendre: "bg-red-500/10 text-red-400 border-red-500/20",
};

const competenceLabels = {
  developper: "Développer",
  entreprendre: "Entreprendre",
  concevoir: "Concevoir",
  exprimer: "Exprimer",
  comprendre: "Comprendre",
};

export default async function IUTPage() {
  const iutData: IUTType = await getIUTData();
  const projects: ProjectType[] = await getProjectsByCategory("iut");

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 mb-16">
      {/* Header Section */}
      <section className="grid lg:grid-cols-1 gap-12 mb-16">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <HiAcademicCap className="text-3xl text-green-400" />
            <span className="text-sm font-mono text-zinc-400 uppercase tracking-wider">
              Formation académique
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            {iutData?.titre || "Projets IUT"}
          </h1>

          {iutData?.sousTitre && (
            <p className="text-xl text-zinc-300 mb-6">
              {iutData.sousTitre}
            </p>
          )}

          {iutData?.description && (
            <div className="text-base text-zinc-400 leading-relaxed prose prose-invert max-w-none">
              <PortableText value={iutData.description} />
            </div>
          )}
        </div>
      </section>

      {/* Projets IUT */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Mes projets IUT</h2>
          <span className="text-zinc-400 text-sm">
            {projects.length} projet{projects.length > 1 ? 's' : ''}
          </span>
        </div>

        {projects.length > 0 ? (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                href={`/iut/${project.slug}`}
                key={project._id}
                className="group bg-[#1d1d20] border border-zinc-800 hover:border-green-500/30 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                {/* Image de couverture */}
                {project.coverImage && (
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={project.coverImage.image}
                      width={400}
                      height={200}
                      alt={project.coverImage.alt || project.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Header du projet */}
                <div className="mb-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-green-400 transition-colors">
                    {project.name}
                    {project.description && Array.isArray(project.description) && project.description.length > 0 && (
                      <p className="text-zinc-400 text-sm line-clamp-2">
                        {/* Affichage simple du premier bloc de texte */}
                        {(project.description as any)[0]?.children?.[0]?.text || ""}
                      </p>
                    )}
                  </h3>
                </div>

                {/* Métadonnées */}
                <div className="space-y-2 mb-4">
                  {project.contexte && (
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <HiAcademicCap className="flex-shrink-0" />
                      <span className="capitalize">
                        {project.contexte === 'sae' ? 'SAE' :
                          project.contexte === 'ressource' ? 'Ressource pédagogique' :
                            project.contexte === 'entreprise' ? 'Mission en entreprise' :
                              project.contexte === 'personnel' ? 'Projet personnel' :
                                project.contexte === 'freelance' ? 'Freelance/Auto-entrepreneur' :
                                  project.contexte}
                      </span>
                    </div>
                  )}
                  {project.duree && (
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <HiClock className="flex-shrink-0" />
                      <span>{project.duree}</span>
                    </div>
                  )}
                  {project.periode && (
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <HiCalendar className="flex-shrink-0" />
                      <span>{project.periode}</span>
                    </div>
                  )}
                </div>

                {/* Compétences */}
                {project.competences && project.competences.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.competences.map((competence, index) => {
                      const IconComponent = competenceIcons[competence as keyof typeof competenceIcons];
                      const colorClass = competenceColors[competence as keyof typeof competenceColors];
                      const label = competenceLabels[competence as keyof typeof competenceLabels];

                      return (
                        <div
                          key={index}
                          className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs border ${colorClass || 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}
                        >
                          {IconComponent && <IconComponent className="w-3 h-3" />}
                          <span>{label || competence}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <HiAcademicCap className="mx-auto text-6xl text-zinc-600 mb-4" />
            <h3 className="text-xl font-semibold text-zinc-400 mb-2">
              Aucun projet IUT pour le moment
            </h3>
            <p className="text-zinc-500">
              Les projets académiques apparaîtront ici une fois ajoutés dans Sanity.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}