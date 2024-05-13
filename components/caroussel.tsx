"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cardImages } from "@/constants";
import Image from "next/image";
import { useEffect } from "react";

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export default function HeaderCaroussel() {
  useEffect(() => {
    const intervalRef = setInterval(() => {}, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {cardImages.map((image, index) => {
          return (
            <CarouselItem key={index}>
              <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
                <Image
                  src={image.src}
                  className="block w-full md:h-[90vh] h-auto"
                  alt={image.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-gray-50">
                  <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                    {image.title}
                  </h2>
                  <p className="mt-4 max-w-md text-lg md:text-xl">
                    {image.paraph}
                  </p>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2" />
      <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2" />
    </Carousel>
  );
}
