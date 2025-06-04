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

export type IUTType = {
  _id: string;
  titre: string;
  sousTitre?: string;
  description: PortableTextBlock[];
};

export type ProjectType = {
  _id: string;
  name: string;
  slug: string;
  projectUrl?: string;
  categorie: 'iut' | 'alternance' | 'perso-pro';
  competences: string[];
  contexte?: string;
  duree?: string;
  periode?: string;
  demarches?: PortableTextBlock[];
  resultats?: PortableTextBlock[];
  ressourcesMobilisees?: string[];
  coverImage?: {
    alt: string | null;
    image: string;
  };
  description: PortableTextBlock[];
  galerie?: {
    image: string;
    alt: string;
    caption?: string;
  }[];
};

export type CategoryType = 'iut' | 'alternance' | 'perso-pro';
export type CompetenceType = 'developper' | 'entreprendre' | 'concevoir' | 'exprimer' | 'comprendre';