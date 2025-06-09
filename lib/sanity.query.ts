// lib/sanity.query.ts

import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getHomeData() {
  return client.fetch(
    groq`*[_type == "home"][0]{
      _id,
      nomComplet,
      titre,
      imageProfile {alt, "image": asset->url},
      bioCourte,
      localisation,
      bioComplete,
      email,
      "cv": cv.asset->url,
      competences,
      experiences[]{
        nomEntreprise,
        poste,
        "logo": logo.asset->url,
        url,
        description,
        dateDebut,
        dateFin,
        enCours
      }
    }`
  );
}

export async function getIUTData() {
  return client.fetch(
    groq`*[_type == "iut"][0]{
      _id,
      titre,
      sousTitre,
      description
    }`
  );
}

export async function getAlternanceData() {
  return client.fetch(
    groq`*[_type == "alternance"][0]{
      _id,
      titre,
      sousTitre,
      description,
      entreprise,
      logoEntreprise {
        alt,
        "image": asset->url
      },
      poste,
      periode,
      slider[]{
        "image": asset->url,
        alt
      }
    }`
  );
}

export async function getPersoProData() {
  return client.fetch(
    groq`*[_type == "persoPro"][0]{
      _id,
      titre,
      sousTitre,
      description
    }`
  );
}

export async function getProjectsByCategory(category: string) {
  return client.fetch(
    groq`*[_type == "project" && categorie == $category] | order(_createdAt desc){
      _id, 
      name,
      "slug": slug.current,
      categorie,
      competences,
      contexte,
      duree,
      periode,
      coverImage {
        alt,
        "image": asset->url
      },
      description,
      logo {
        alt,
        "image": asset->url
      },
      tagline
    }`,
    { category }
  );
}

export async function getProjects() {
  return client.fetch(
    groq`*[_type == "project"] | order(_createdAt desc){
      _id, 
      name,
      "slug": slug.current,
      categorie,
      competences,
      coverImage {
        alt,
        "image": asset->url
      },
      logo {
        alt,
        "image": asset->url
      }
    }`
  );
}

export async function getSingleProject(slug: string) {
  return await client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      name,
      "slug": slug.current,
      description,
      projectUrl,
      categorie,
      competences,
      contexte,
      duree,
      periode,
      demarches,
      resultats,
      ressourcesMobilisees,
      coverImage {
        alt,
        "image": asset->url
      },
      galerie[]{
        "image": asset->url,
        alt,
        caption
      },
      logo {
        alt,
        "image": asset->url
      },
      tagline
    }`,
    { slug }
  );
}

export async function getProjectsByCompetence(competence: string) {
  return client.fetch(
    groq`*[_type == "project" && $competence in competences] | order(_createdAt desc){
      _id, 
      name,
      "slug": slug.current,
      categorie,
      competences,
      contexte,
      coverImage {
        alt,
        "image": asset->url
      },
      logo {
        alt,
        "image": asset->url
      }
    }`,
    { competence }
  );
}