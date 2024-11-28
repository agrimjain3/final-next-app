"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function CustomExercisePage() {
  const [exercises, setExercise] = useState([]);

  useEffect(() => {
    async function fetchExercise() {
      try {
        const response = await fetch("api/exercises");
        if (!response.ok) {
          console.error("Failed to fetch exercises");
          return;
        }
        const data = await response.json();
        setExercise(data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    }

    fetchExercise();
  }, []);

  const handleClick = () => {
    redirect("/customExercises/exerciseForm");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Heading for exercise form button */}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-6 uppercase pt-20 ">
        Want to add your own exercises? Click on the button below
      </h2>

      {/* Button to redirect to exercise form */}
      <div className="w-3/4 mx-auto py-6 px-8 rounded-lg shadow-xl bg-gradient-to-r from-blue-500 to-teal-500 mb-8">
        <button
          className="w-full h-full py-4 text-white font-semibold text-lg  hover:bg-blue-700 transition duration-1000 ease-in-out "
          onClick={handleClick}
        >
          Add Your Custom Exercise
        </button>
      </div>

      {/* Heading for list of exercises */}
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
        Below are the user-made exercises!
      </h2>

      {/* Exercises list */}
      <div className="w-3/4 mx-auto shadow-lg rounded-md">
        {exercises.length > 0 ? (
          <ul className="space-y-6">
            {exercises.map((exercise, index) => (
              <li
                key={index} 
                className="border border-gray-300 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <h2 className="text-xl font-semibold mb-4 capitalize text-blue-700">
                  {exercise.name}
                </h2>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex justify-center items-center mb-6 md:mb-0">
                    <img
                      src={
                        exercise.image ||
                        "https://cdn-exercisedb.vercel.app/api/v1/images/Hy9D21L.gif"
                      }
                      alt={exercise.name}
                      className="w-48 h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>

                  <div className="flex flex-col justify-between">
                    <p className="text-md font-semibold mb-2">
                      <strong>Targeted Muscles:</strong>{" "}
                      {exercise.targetedMuscles}
                    </p>
                    <p className="text-md font-semibold mb-4">
                      <strong>Secondary Muscles:</strong>{" "}
                      {exercise.secondaryMuscles?.length > 0
                        ? exercise.secondaryMuscles
                        : "Core"}
                    </p>

                    <h3 className="text-lg font-semibold text-gray-700 mt-4">
                      Instructions:
                    </h3>
                    <ol className="list-decimal list-inside mt-2 space-y-2">
                      {exercise.instructions?.length > 0 ? (
                        exercise.instructions
                      ) : (
                        <li>No instructions provided.</li>
                      )}
                    </ol>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Loading exercises...</p>
        )}
      </div>
    </div>
  );
}
