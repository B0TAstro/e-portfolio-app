// app/not-found.tsx

import { Metadata } from "next";
import NotFoundComponent from "./components/shared/NotFound";

export const metadata: Metadata = {
  title: "Error 404",
};

export default function NotFound() {
  return (
    <NotFoundComponent
      title="Error 404!"
      description="Oups! Cette page n'existe pas. Essayez de retourner à la Home ou de l'URL."
    />
  );
}