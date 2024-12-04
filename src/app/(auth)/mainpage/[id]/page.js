"use client";

import { useEffect, useState } from "react";
import classes from "./page.module.css";

export default function BodyPartPage({ params: initialParams }) {
  const [exercises, setExercises] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    (async () => {
      const resolvedParams = await initialParams;
      const id = await resolvedParams.id;
      setId(id);
    })();
  }, [initialParams]);

  useEffect(() => {
    if (!id) return;

    const fetchTarget = async () => {
      const url = `https://exercisedb-api.vercel.app/api/v1/bodyparts/${id}/exercises`;

      const options = { method: "GET" };
      try {
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result);
        setExercises(result.data.exercises);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTarget();
  }, [id]);

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Exercises for Body Part: {id || "Loading..."}
      </h1>
      <ul className="flex flex-col gap-6">
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <li
              key={exercise.exerciseId || index}
              className="border p-4 rounded-md shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2 capitalize">
                {exercise.name}
              </h2>
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
                    <strong>Targeted Muscles:</strong>{" "}
                    {exercise.targetMuscles.join(", ")}
                  </p>
                  <p>
                    <strong>Secondary Muscles:</strong>{" "}
                    {exercise.secondaryMuscles.length > 0
                      ? exercise.secondaryMuscles.join(", ")
                      : "None"}
                  </p>
                  <h3 className="text-md font-semibold mt-4">Instructions:</h3>
                  <ol className="list-decimal list-inside mt-2">
                    {exercise.instructions?.length > 0 ? (
                      exercise.instructions.map((instruction, idx) => (
                        <li key={idx}>{instruction}</li>
                      ))
                    ) : (
                      <li>No instructions provided.</li>
                    )}
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
