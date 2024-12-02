"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Carousel from "../../../components/carousel/carousel";
import Image from "next/image";

export default function MainPage() {
  const [bodyParts, setBodyParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchBodyParts = async () => {
      const url = "https://exercisedb-api.vercel.app/api/v1/bodyparts";
      const options = { method: "GET" };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const bodyPartNames = result.data.map((item) => item.name);
        setBodyParts(bodyPartNames);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBodyParts();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/getCarouselImages");
        const data = await response.json();
        setImages(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  const changePage = async (bodypart) => {
    redirect(`/mainpage/${bodypart}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-12 sm:pt-8" id="home">
      <Carousel images={images} interval={3000} />

      <div className="container mx-auto py-10">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-8 uppercase">
          Choose a Body Part
        </h1>
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-5"
          id="exercises"
        >
          {bodyParts.map((bodypart, index) => (
            <li
              key={index}
              className="bg-white rounded-lg  shadow-2xl hover:shadow-black p-6"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={`/images/${bodypart}.jpg`}
                  alt={bodypart}
                  className="rounded-lg mb-4 w-full object-cover h-48"
                />
                <p className="text-lg font-bold text-gray-700 mb-2 uppercase">
                  {bodypart}
                </p>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition"
                  onClick={() => changePage(bodypart)}
                >
                  Get Exercises
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
