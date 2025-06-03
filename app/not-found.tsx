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
      description="Oops! This page does not exist. Try to go back to the homepage or check the URL."
    />
  );
}