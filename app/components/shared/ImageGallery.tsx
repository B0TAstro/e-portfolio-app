// app/components/shared/ImageGallery.tsx

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface GalleryImage {
  image: string;
  alt?: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export default function ImageGallery({ images, className = "" }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Fermer la modale avec Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (event.key === "Escape") {
          setSelectedImageIndex(null);
        } else if (event.key === "ArrowLeft") {
          navigateImage("prev");
        } else if (event.key === "ArrowRight") {
          navigateImage("next");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  // Bloquer le scroll du body quand la modale est ouverte
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImageIndex]);

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImageIndex === null) return;

    if (direction === "prev") {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1
      );
    } else {
      setSelectedImageIndex(
        selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1
      );
    }
  };

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Galerie */}
      <div className={`grid md:grid-cols-2 gap-4 ${className}`}>
        {images.map((image, index) => (
          <div key={index} className="space-y-2">
            <div
              className="relative cursor-pointer group overflow-hidden rounded-lg border border-zinc-800 transition-all duration-300 hover:border-green-400/50"
              onClick={() => openModal(index)}
            >
              <Image
                src={image.image}
                width={600}
                height={400}
                alt={image.alt || `Image ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay au hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                  Cliquer pour agrandir
                </div>
              </div>
            </div>
            {image.caption && (
              <p className="text-sm text-zinc-400 italic">{image.caption}</p>
            )}
          </div>
        ))}
      </div>

      {/* Modale */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Contenu de la modale */}
          <div className="relative z-10 max-w-7xl max-h-[90vh] mx-4 flex flex-col">
            {/* Bouton fermer */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-20"
              aria-label="Fermer"
            >
              <HiX size={32} />
            </button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage("prev")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-20 bg-black/30 rounded-full p-2 backdrop-blur-sm"
                  aria-label="Image précédente"
                >
                  <HiChevronLeft size={24} />
                </button>
                <button
                  onClick={() => navigateImage("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-20 bg-black/30 rounded-full p-2 backdrop-blur-sm"
                  aria-label="Image suivante"
                >
                  <HiChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image principale */}
            <div className="relative">
              <Image
                src={images[selectedImageIndex].image}
                width={1920}
                height={1080}
                alt={images[selectedImageIndex].alt || `Image ${selectedImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                priority
              />
            </div>

            {/* Légende */}
            {images[selectedImageIndex].caption && (
              <div className="mt-4 text-center">
                <p className="text-white/90 text-sm max-w-2xl mx-auto">
                  {images[selectedImageIndex].caption}
                </p>
              </div>
            )}

            {/* Indicateur de position */}
            {images.length > 1 && (
              <div className="mt-4 text-center">
                <p className="text-white/60 text-sm">
                  {selectedImageIndex + 1} / {images.length}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}