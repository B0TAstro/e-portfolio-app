// types/index.ts

import { PortableTextBlock } from "sanity";

export type HomeType = {
  _id: string;
  nomComplet: string;
  titre: string;
  imageProfile: {
    alt: string;
    image: string;
  };
  bioCourte: string;
  email: string;
  localisation: string;
  bioComplete: PortableTextBlock[];
  cv: string;
  competences: string[];
  experiences: ExperienceType[];
};

export type ExperienceType = {
  nomEntreprise: string;
  poste: string;
  logo: string;
  url: string;
  description: string;
  dateDebut: Date;
  dateFin?: Date;
  enCours?: boolean;
};

export type ProjectType = {
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  projectUrl: string;
  logo: string;
  coverImage: {
    alt: string | null;
    image: string;
  };
  description: PortableTextBlock[];
};