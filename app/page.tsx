// app/page.tsx

import Image from "next/image";
import { getHomeData } from "@/lib/sanity.query";
import type { HomeType } from "@/types";
import HeroSvg from "./components/assets/HeroSvg";
import { Slide } from "./components/assets/Slide";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiFile, BiCalendar } from "react-icons/bi";

export default async function Home() {
  const homeData: HomeType = await getHomeData();

  // Fonction pour formater les dates
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <main className="max-w-7xl mx-auto lg:px-16 px-6">
      {/* Section Hero */}
      <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 lg:mt-32 mt-20 mb-16">
        <div className="lg:max-w-2xl max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
            {homeData.titre}
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed mb-8">
            {homeData.bioCourtе}
          </p>
          
          {/* Réseaux sociaux */}
          <ul className="flex items-center gap-x-6 my-10">
            {Object.entries(homeData.reseauxSociaux || {})
              .filter(([key, value]) => value)
              .map(([key, value], id) => (
                <li key={id}>
                  <a
                    href={value}
                    target="_blank"
                    rel="noreferer noopener"
                    className="flex items-center gap-x-3 mb-5 hover:text-purple-400 duration-300"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </a>
                </li>
              ))}
          </ul>
        </div>
        
        <Slide delay={0.14}>
          <HeroSvg />
        </Slide>
      </section>

      {/* Section Expériences */}
      <section className="mt-32">
        <div className="mb-16">
          <h2 className="font-semibold text-4xl mb-4">Expériences Professionnelles</h2>
          <p className="text-zinc-400 max-w-lg">
            Mon parcours professionnel et les expériences qui m'ont formé.
          </p>
        </div>

        <div className="flex flex-col gap-y-12">
          {homeData.experiences?.map((experience, index) => (
            <div
              key={index}
              className="flex items-start lg:gap-x-6 gap-x-4 max-w-2xl relative before:absolute before:bottom-0 before:top-[4.5rem] before:left-7 before:w-[1px] before:h-[calc(100%-50px)] before:bg-zinc-800"
            >
              <a
                href={experience.url}
                target="_blank"
                rel="noreferrer noopener"
                className="min-h-[60px] min-w-[60px] rounded-md overflow-clip relative"
              >
                <Image
                  src={experience.logo}
                  className="object-cover"
                  alt={`${experience.nomEntreprise} logo`}
                  fill
                />
              </a>
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-bold">{experience.nomEntreprise}</h3>
                <p className="text-purple-400">{experience.poste}</p>
                <div className="flex items-center gap-x-2 text-sm text-zinc-500 mt-2 tracking-widest uppercase">
                  <BiCalendar className="text-base" />
                  {formatDate(experience.dateDebut)} - {
                    experience.enCours 
                      ? "Actuellement" 
                      : experience.dateFin 
                        ? formatDate(experience.dateFin)
                        : "Fin non spécifiée"
                  }
                </div>
                <p className="text-base text-zinc-400 my-4">{experience.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section À propos */}
      <section className="mt-32">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-6 justify-items-center">
          <div className="order-2 lg:order-none">
            <h2 className="lg:text-4xl text-3xl font-bold mb-8">
              À propos de moi
            </h2>
            <p className="text-lg text-zinc-300 mb-6">
              Je suis {homeData.nomComplet}, basé à {homeData.localisation}.
            </p>

            <div className="flex flex-col gap-y-3 text-zinc-400 leading-relaxed">
              <PortableText value={homeData.bioComplete} />
            </div>
          </div>

          <div className="flex flex-col lg:justify-self-center justify-self-start gap-y-8 lg:order-1 order-none mb-12">
            <div>
              <Image
                className="rounded-2xl mb-4 object-cover max-h-96 min-h-96 bg-top bg-[#1d1d20]"
                src={homeData.imageProfile.image}
                width={400}
                height={400}
                quality={100}
                alt={homeData.imageProfile.alt}
              />

              <a
                href={`${homeData.cv}?dl=${homeData.nomComplet}_CV`}
                className="flex items-center justify-center gap-x-2 bg-[#1d1d20] border border-transparent hover:border-zinc-700 rounded-md duration-200 py-2 text-center cursor-pointer font-medium mb-4"
              >
                <BiFile className="text-base" /> Télécharger mon CV
              </a>
            </div>

            <ul>
              <li>
                <a
                  href={`mailto:${homeData.email}`}
                  className="flex items-center gap-x-2 hover:text-purple-400 duration-300"
                >
                  <BiEnvelope className="text-lg" />
                  {homeData.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section Compétences */}
      <section className="mt-24 max-w-2xl">
        <h2 className="font-semibold text-4xl mb-4">Compétences</h2>
        <p className="text-zinc-400 max-w-lg mb-8">
          Les technologies et outils que je maîtrise.
        </p>

        <ul className="flex flex-wrap items-center gap-3">
          {homeData.competences?.map((competence, id) => (
            <li
              key={id}
              className="bg-[#1d1d20] border border-transparent hover:border-zinc-700 rounded-md px-3 py-2 text-sm"
            >
              {competence}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}