// app/alternance/page.tsx

import Link from "next/link";
import Image from "next/image";
import { getAlternanceData, getProjectsByCategory } from "@/lib/sanity.query";
import type { AlternanceType, ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import { HiBriefcase, HiClock } from "react-icons/hi";
import ImageSlider from "@/app/components/assets/ImageSlider";

export default async function AlternancePage() {
  const alternanceData: AlternanceType = await getAlternanceData();
  const projects: ProjectType[] = await getProjectsByCategory("alternance");

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 mb-16">
      <section className="grid lg:grid-cols-1 gap-12 mb-16">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            {alternanceData?.titre || "Projets en Alternance"}
          </h1>

          {alternanceData?.sousTitre && (
            <h2 className="text-xl text-zinc-300 mb-6">
              {alternanceData.sousTitre}
            </h2>
          )}

          {alternanceData.slider && alternanceData.slider.length > 0 && (
            <ImageSlider
              images={alternanceData.slider}
              autoPlay={true}
              autoPlayDelay={5000}
            />
          )}

          <div className="bg-[#1a1a1d] border border-zinc-800 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-400 mb-4">À propos de La Sasson</h3>
            <div className="text-base text-zinc-300 leading-relaxed space-y-4">
              <p>
                La Sasson est une association loi 1901 implantée à Chambéry, en Savoie. Elle œuvre pour l&apos;accès au logement des personnes en difficulté, en proposant à la fois des logements sociaux, un accompagnement social personnalisé, et un soutien dans les démarches administratives.
              </p>
              <p>
                Elle gère aujourd&apos;hui plus de <span className="text-green-400 font-semibold">200 logements</span>, répartis entre résidences sociales, logements temporaires, colocations solidaires et dispositifs d&apos;urgence, avec un objectif fort d&apos;inclusion sociale.
              </p>
              <p>
                La structure compte une <span className="text-green-400 font-semibold">centaine de salariés</span>, répartis entre plusieurs pôles et les travailleurs sociaux, qui œuvrent au quotidien pour accompagner les personnes dans leur parcours résidentiel et social :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Le pôle social, qui accompagne les locataires</li>
                <li>Le pôle immobilier, qui gère les biens et les travaux</li>
                <li>Le pôle administratif et RH, qui assure le bon fonctionnement interne</li>
              </ul>
              <p>
                L&apos;association travaille en collaboration avec des bailleurs sociaux, collectivités locales, associations partenaires et propriétaires privés.
              </p>
            </div>
          </div>

          {alternanceData?.entreprise && (
            <div className="bg-[#1d1d20] border border-zinc-800 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                {alternanceData.logoEntreprise?.image && (
                  <Image
                    src={alternanceData.logoEntreprise.image}
                    width={60}
                    height={60}
                    alt={alternanceData.logoEntreprise.alt || alternanceData.entreprise}
                    className="rounded-lg bg-white p-2"
                  />
                )}
                <div>
                  <p className="text-xl font-bold text-green-400">{alternanceData.entreprise}</p>
                  {alternanceData.poste && (
                    <h3 className="text-zinc-300">{alternanceData.poste}</h3>
                  )}
                </div>
              </div>
              {alternanceData.periode && (
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <HiClock className="text-green-400" />
                  <span>{alternanceData.periode}</span>
                </div>
              )}
            </div>
          )}

          {alternanceData?.description && (
            <div className="text-base text-zinc-400 leading-relaxed prose prose-invert max-w-none mb-8">
              <PortableText value={alternanceData.description} />
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
                href={`/alternance/${project.slug}`}
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
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-yellow-500 rounded-lg flex items-center justify-center">
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
                        <HiBriefcase className="flex-shrink-0 text-green-400" />
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
            <HiBriefcase className="mx-auto text-6xl text-zinc-600 mb-4" />
            <h3 className="text-xl font-semibold text-zinc-400 mb-2">
              Aucun projet d&apos;alternance pour le moment
            </h3>
            <p className="text-zinc-500">
              Les projets réalisés en entreprise apparaîtront ici une fois ajoutés dans Sanity.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}