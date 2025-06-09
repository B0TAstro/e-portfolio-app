// app/components/assets/ImageSlider.tsx

'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface SlideImage {
    image: string;
    alt?: string;
}

interface ImageSliderProps {
    images: SlideImage[];
    autoPlay?: boolean;
    autoPlayDelay?: number;
}

export default function ImageSlider({
    images,
    autoPlay = true,
    autoPlayDelay = 5000
}: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const goToPrevious = () =>
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    useEffect(() => {
        if (!autoPlay || isHovered) return;
        const interval = setInterval(goToNext, autoPlayDelay);
        return () => clearInterval(interval);
    }, [autoPlay, autoPlayDelay, isHovered, goToNext]);

    return (
        <div
            className="relative mb-8 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`absolute top-4 left-4 z-20 text-sm px-3 py-1 rounded-full bg-black/60 text-white font-semibold transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                {currentIndex + 1} / {images.length}
            </div>

            <div className="relative aspect-[16/9] min-h-[200px] w-full overflow-hidden rounded-xl">
                {images.map((img, index) => (
                    <Image
                        key={index}
                        src={img.image}
                        alt={img.alt || `Slide ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                        className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                        priority={index === 0}
                    />
                ))}
            </div>

            <button
                onClick={goToPrevious}
                className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                aria-label="Précédent"
            >
                <HiChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={goToNext}
                className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                aria-label="Suivant"
            >
                <HiChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition ${index === currentIndex
                            ? 'bg-green-400 scale-110'
                            : 'bg-zinc-500 hover:bg-zinc-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}