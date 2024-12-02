import { useEffect, useState } from "react";
import classes from "./carousel.module.css";
import { Image } from "next/image";

export default function Carousel({ images, interval }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    const slideInterval = setInterval(nextSlide, interval);
    return () => clearInterval(slideInterval);
  }, [images, interval]);

  return (
    <div className={classes.carouselContainer}>
      <div className={classes.carouselSlide}>
        <Image
          className={classes.carouselImage}
          src={images[currentIndex]}
          alt="carousel image"
        />
      </div>
    </div>
  );
}
