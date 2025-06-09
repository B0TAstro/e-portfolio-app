// app/perso-pro/page.tsx

import Link from "next/link";
import Image from "next/image";
import { getPersoProData, getProjectsByCategory } from "@/lib/sanity.query";
import type { PersoProType, ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import { HiUser, HiClock } from "react-icons/hi";

export default async function PersoProPage() {
  const persoProData: PersoProType = await getPersoProData();
  const projects: ProjectType[] = await getProjectsByCategory("perso-pro");

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 mb-16">
      <section className="grid lg:grid-cols-1 gap-12 mb-16">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            {persoProData?.titre || "Projets Personnels & Professionnels"}
          </h1>

          {persoProData?.sousTitre && (
            <h2 className="text-xl text-zinc-300 mb-6">
              {persoProData.sousTitre}
            </h2>
          )}

          {persoProData?.description && (
            <div className="text-base text-zinc-400 leading-relaxed prose prose-invert max-w-none mb-8">
              <PortableText value={persoProData.description} />
            </div>
          )}
        </div>
      </section>

      <section>
        <span className="text-zinc-400 text-sm mb-4 block">
          {projects.length} projet{projects.length > 1 ? 's' : ''}
        </span>

        {projects.length > 0 ? (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                href={`/perso-pro/${project.slug}`}
                key={project._id}
                className="group bg-[#1d1d20] border border-zinc-800 hover:border-green-500/30 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex"
              >
                <div className="flex-shrink-0 mr-4">
                  {project.logo?.image ? (
                    <Image
                      src={project.logo.image}
                      width={60}
                      height={60}
                      alt={project.name}
                      className="dark:bg-zinc-800 bg-zinc-100 rounded-md p-1"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {project.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-green-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-zinc-400 line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-5 text-xs text-zinc-500 mt-4">
                    {project.contexte && (
                      <div className="flex items-center gap-2">
                        <HiUser className="flex-shrink-0 text-green-400" />
                        <span>
                          {project.contexte === 'sae' ? 'SAE' :
                            project.contexte === 'ressource' ? 'Ressource pédagogique' :
                              project.contexte === 'entreprise' ? 'Mission en entreprise' :
                                project.contexte === 'personnel' ? 'Projet personnel' :
                                  project.contexte === 'freelance' ? 'Freelance' :
                                    project.contexte}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <HiClock className="flex-shrink-0 text-green-400" />
                      <span>{project.duree}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <HiUser className="mx-auto text-6xl text-zinc-600 mb-4" />
            <h3 className="text-xl font-semibold text-zinc-400 mb-2">
              Aucun projet Perso/Pro pour le moment
            </h3>
            <p className="text-zinc-500">
              Les projets personnels et professionnels apparaîtront ici une fois ajoutés dans Sanity.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}