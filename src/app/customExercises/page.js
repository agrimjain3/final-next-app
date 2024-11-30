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

  const onKnowMore = async (name) => {
    console.log(name);
    redirect(`/customExercises/${name}`);
  };

  const handleClick = () => {
    redirect("/customExercises/exerciseForm");
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/exercises", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const updatedExercises = exercises.filter(
          (exercise) => exercise.id !== id
        );
        setExercise(updatedExercises);
      } else {
        console.log(response.json().message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-6 uppercase pt-20 ">
        Want to add your own exercises? Click on the button below
      </h2>

      <div className="w-3/4 mx-auto py-6 px-8 rounded-lg shadow-xl bg-gradient-to-r from-blue-500 to-teal-500 mb-8">
        <button
          className="w-full h-full py-4 text-white font-semibold text-lg  hover:bg-blue-700 transition duration-1000 ease-in-out "
          onClick={handleClick}
        >
          Add Your Custom Exercise
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
        Below are the user-made exercises!
      </h2>

      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-5"
        id="exercises"
      >
        {exercises.map((exercise, index) => (
          <li
            key={index}
            className="bg-white rounded-lg shadow-2xl hover:shadow-black p-6"
          >
            <div className="flex flex-col items-center">
              <img
                src={
                  exercise.image ||
                  "https://cdn-exercisedb.vercel.app/api/v1/images/Hy9D21L.gif"
                }
                alt={exercise.name}
                className="w-48 h-48 object-cover rounded-lg shadow-md"
              />
              <p className="text-lg font-bold text-gray-700 mb-2 uppercase">
                {exercise.name}
              </p>
              <div className="flex w-full justify-evenly">
                <button
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded "
                  onClick={() => onKnowMore(exercise.id)}
                >
                  Know More
                </button>
                <button
                  className="bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded "
                  onClick={() => handleDelete(exercise.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
