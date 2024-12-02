"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { addExerciseData } from "../../../../mongotest/server";
import {Image} from 'next/image';


export default function ExerciseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null); // State to store the image preview

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const submitHandler = async (data) => {
    const { bodyPart, name, targetedMuscles, instructions } = data;

    const res = await addExerciseData(
      bodyPart,
      name,
      imagePreview,
      targetedMuscles,
      instructions
    );

    console.log(res);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (res.success) {
      alert(res.message);
    } else {
      alert(res.message);
    }
    redirect("/customExercises");
  };

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-gradient-to-br m-5"
        style={{ paddingTop: "4rem" }}
      >
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8 space-y-6"
        >
          <h1 className="text-xl font-bold text-gray-800 text-center">
            Add New Exercise
          </h1>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600 capitalize">
              Exercise Name
            </label>
            <input
              {...register("name", { required: "Exercise Name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              type="text"
              placeholder="Push-up"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600 capitalize">
              Body Part
            </label>
            <input
              {...register("bodyPart", { required: "Body Part is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              type="text"
              placeholder="Chest"
            />
            {errors.bodyPart && (
              <p className="text-red-500">{errors.bodyPart.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600 capitalize">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600 capitalize">
              Targeted Muscles
            </label>
            <input
              {...register("targetedMuscles", {
                required: "Targeted Muscles is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              type="text"
              placeholder="Chest, Shoulders"
            />
            {errors.targatedMuscles && (
              <p className="text-red-500">{errors.targatedMuscles.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600 capitalize">
              Instructions
            </label>
            <textarea
              {...register("instructions", {
                required: "Instructions are required",
              })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              placeholder="How to perform this exercise?"
            />
            {errors.instructions && (
              <p className="text-red-500">{errors.instructions.message}</p>
            )}
          </div>

          <input
            type="submit"
            disabled={isSubmitting}
            className={
              isSubmitting
                ? "w-full py-3 text-white bg-blue-400 rounded-lg"
                : "w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-500"
            }
            value={isSubmitting ? "Submitting" : "Submit"}
          />
        </form>
      </div>
    </>
  );
}
