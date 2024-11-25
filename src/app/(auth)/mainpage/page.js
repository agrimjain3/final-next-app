"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "./page.module.css";
import Carousel from "../../../../components/carousel";

export default function MainPage() {
  const [bodyParts, setBodyParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBodyParts = async () => {
      const url = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "5b98d952bdmsha36c0cdc1e57ec6p1ded4djsn14e6dd61ce5c",
          "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setBodyParts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBodyParts();
  }, []);

  const changePage = async (bodypart) => {
    redirect(`/${bodypart}`);
  };

  if (loading) {
    return (
      <>
        <div>LOADING...</div>
      </>
    );
  }

  // if (error) {
  //   return <div className="text-red-500">{error}</div>;
  // }

  const images = bodyParts.map((bodypart) => {
    const path = `/images/${bodypart}.jpg`;
    console.log("Image path:", path); // Debugging line
    return path;
  });

  return (
    <>
      <Carousel images={images} interval={3000}/>

      <div>
        <ul className="flex flex-col gap-2 w-full justify-center items-center">
          {bodyParts.map((bodypart, index) => (
            <li key={index}>
              <div className="flex flex-col items-center justify-center border-2 border-gray-500 p-5">
                <div className={classes.imgCont}>
                  <img
                    src={`/images/${bodypart}.jpg`}
                    alt="image"
                    className=""
                  />
                </div>
                <button
                  className="button bg-blue-500 text-white px-4 py-2 rounded uppercase w-full"
                  onClick={() => changePage(bodypart)}
                >
                  {bodypart}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
