import { useEffect, useState } from "react";
import classes from "./carousel.module.css";

export default function Carousel({ images, interval }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, interval);
    return () => clearInterval(slideInterval);
  }, [images, interval]);

  return (
    <div className={classes.carouselContainer}>
      <div className={classes.carouselSlide}>
        <img
          className={classes.carouselImage}
          src={images[currentIndex]}
          alt="carousel image"
        />
      </div>
    </div>
  );
}
