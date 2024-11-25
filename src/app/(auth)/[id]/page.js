"use client";

import { useEffect, useState } from "react";
import classes from "./page.module.css";

export default function BodyPartPage({ params: initialParams }) {
  const [exercises, setExercises] = useState([]); // State to store the fetched exercises
  const [id, setId] = useState(null); // State to store the resolved `id`

  useEffect(() => {
    // Unwrap `params` if it's a Promise
    (async () => {
      const resolvedParams = await initialParams; // Await the params promise
      setId(resolvedParams.id); // Extract and set `id`
    })();
  }, [initialParams]);

  useEffect(() => {
    if (!id) return; // Wait until `id` is resolved

    const fetchTarget = async () => {
      const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${id}`; // Use resolved id
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "5b98d952bdmsha36c0cdc1e57ec6p1ded4djsn14e6dd61ce5c",
          "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        setExercises(result); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTarget();
  }, [id]); // Fetch exercises when `id` changes

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Exercises for Body Part: {id || "Loading..."}
      </h1>
      <ul className="flex flex-col gap-6">
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <li key={exercise.id || index} className="border p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2 capitalize">{exercise.name}</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center justify-center">
                  <img
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    className={`${classes.image} w-48 h-48 object-cover`}
                  />
                </div>
                <div>
                  <p>
                    <strong>Targeted Muscles:</strong> {exercise.target}
                  </p>
                  <p>
                    <strong>Secondary Muscles:</strong>{" "}
                    {exercise.secondaryMuscles ? exercise.secondaryMuscles.join(", ") : "None"}
                  </p>
                  <h3 className="text-md font-semibold mt-4">Instructions:</h3>
                  <ol className="list-decimal list-inside mt-2">
                    {exercise.instructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">Loading exercises...</li>
        )}
      </ul>
    </div>
  );
}
