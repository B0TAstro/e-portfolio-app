// lib/sanity.query.ts

import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getHomeData() {
  return client.fetch(
    groq`*[_type == "home"]{
      _id,
      nomComplet,
      titre,
      imageProfile {alt, "image": asset->url},
      bioCourtе,
      localisation,
      bioComplete,
      email,
      "cv": cv.asset->url,
      reseauxSociaux,
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

export async function getProjects() {
  return client.fetch(
    groq`*[_type == "project"]{
      _id, 
      name,
      "slug": slug.current,
      tagline,
      "logo": logo.asset->url,
    }`
  );
}

export async function getSingleProject(slug: string) {
  return await client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      name,
      tagline,
      description,
      projectUrl,
      coverImage {
        alt,
        "image": asset->url
      }
    }`,
    { slug }
  );
}