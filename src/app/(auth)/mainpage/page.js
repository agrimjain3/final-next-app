"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [bodyParts, setBodyParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null); // Error state

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

  const fetchBodyPartData = async (bodyPart) => {
    const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5b98d952bdmsha36c0cdc1e57ec6p1ded4djsn14e6dd61ce5c",
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setExercises(data);
      console.log(data);
    } catch (error) {
      setError("Failed to load exercises. Please try again.");
    }
  };

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

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div>
        <ul className="flex flex-col gap-2 w-full justify-center items-center">
          {bodyParts.map((bodypart, index) => (
            <li key={index}>
              <button
                className="button bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => changePage(bodypart)}
              >
                {bodypart}
              </button>
            </li>
          ))}
        </ul>
        {exercises.length > 0 && (
          <div className="mt-4">
            <h2 className="text-center text-lg font-semibold">Exercises</h2>
            <ul className="flex flex-col gap-2 w-full justify-center items-center">
              {exercises.map((exercise, index) => (
                <li
                  key={index}
                  className="border-b border-gray-300 p-2 w-full text-center"
                >
                  {exercise.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
