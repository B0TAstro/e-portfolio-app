// app/page.tsx

import Image from "next/image";
import { getHomeData } from "@/lib/sanity.query";
import type { HomeType } from "@/types";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiFile, BiCalendar } from "react-icons/bi";
import RiveAvatar from "./components/assets/RiveAvatar";
import Social from "./components/shared/Social";

export default async function Home() {
  const homeData: HomeType = await getHomeData();

  // Fonction mise en forme des dates
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric'
    });
  };

  // console.log(homeData);

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <section className="flex xl:flex-row flex-col items-center justify-between mb-16 overflow-hidden">
        <div className="xl:max-w-2xl w-full">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4 leading-tight lg:min-w-[700px] min-w-full">
            {homeData.titre}
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed mb-8">
            {homeData.bioCourte}
          </p>
          <Social type="social" />
        </div>
        <div>
          <RiveAvatar />
        </div>
      </section>

      <section className="grid lg:grid-cols-2 grid-cols-1 justify-items-center mb-8">
        <div>
          <h2 className="lg:text-4xl text-3xl font-bold mb-4">
            À propos de moi
          </h2>
          <p className="text-lg text-zinc-300 mb-8">
            Je suis {homeData.nomComplet}, basé à {homeData.localisation}.
          </p>

          <div className="flex flex-col gap-2 text-zinc-400 leading-relaxed">
            <PortableText value={homeData.bioComplete} />
          </div>
        </div>

        <div className="flex flex-col lg:justify-self-end justify-self-center lg:mt-0 mt-8">
          <div>
            {homeData.imageProfile?.image && (
              <Image
                className="rounded-2xl mb-4 object-cover max-h-96 min-h-96 bg-top bg-[#1d1d20]"
                src={homeData.imageProfile.image}
                width={400}
                height={400}
                quality={100}
                alt={homeData.imageProfile.alt || "Image de profil"}
              />
            )}
            <a
              href={`${homeData.cv}?dl=${homeData.nomComplet}_CV`}
              className="flex items-center justify-center gap-x-2 bg-[#1d1d20] border border-transparent hover:border-zinc-700 rounded-md duration-200 py-2 text-center cursor-pointer font-medium mb-4"
            >
              <BiFile className="text-base" /> Télécharger mon CV
            </a>
          </div>
          <a
            href={`mailto:${homeData.email}`}
            className="flex items-center justify-center gap-x-3 hover:text-green-400 duration-300"
          >
            <BiEnvelope className="text-lg" />
            {homeData.email}
          </a>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="font-semibold text-4xl mb-4">Compétences & Technologies</h2>
        <p className="text-zinc-400 w-1/2 mb-8">
          Les compétences, soft skills et technologies/outils que j&apos;ai appris et que je maîtrise :
        </p>

        <ul className="flex flex-wrap items-center gap-4">
          {homeData.competences?.map((competence, id) => (
            <li
              key={id}
              className="bg-[#1d1d20] border border-zinc-700 rounded-md px-3 py-2 text-sm hover:text-green-400 hover:scale-103 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {competence}
            </li>
          ))}
        </ul>
      </section >

      <section>
        <div className="mb-8">
          <h2 className="font-semibold text-4xl mb-4">Expériences Professionnelles</h2>
          <p className="text-zinc-400">
            Mon parcours professionnel et les expériences qui m&apos;ont formé
          </p>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12">
          {homeData.experiences?.map((experience, index) => (
            <div
              key={index}
              className="flex items-start lg:gap-x-6 gap-x-4 max-w-2xl relative before:absolute before:bottom-0 before:top-[5rem] before:left-9 before:w-[1px] before:h-[calc(100%-70px)] dark:before:bg-zinc-800 before:bg-zinc-200"
            >
              <a
                href={experience.url}
                target="_blank"
                rel="noreferrer noopener"
                className="grid place-items-center dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 min-h-[80px] min-w-[80px] p-2 rounded-md overflow-clip relative"
              >
                <Image
                  src={experience.logo}
                  className="object-cover duration-300"
                  alt={`${experience.nomEntreprise} logo`}
                  width={50}
                  height={50}
                />
              </a>
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-bold">{experience.nomEntreprise}</h3>
                <p>{experience.poste}</p>
                <time className="flex items-center gap-x-2 text-sm text-zinc-500 mt-2 tracking-widest uppercase">
                  <BiCalendar className="text-base" />
                  {formatDate(experience.dateDebut)} - {
                    experience.enCours
                      ? <span className="text-green-400">Actuellement</span>
                      : experience.dateFin
                        ? formatDate(experience.dateFin)
                        : "Fin non spécifiée"
                  }
                </time>
                <p className="tracking-tight dark:text-zinc-400 text-zinc-600 my-4">{experience.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}