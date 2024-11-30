import mongoose from "mongoose";
import { exerciseModel } from "../../../../mongotest/model";
import backButtonClick from "./backButtonClick";

export default async function DetailedPage({ params }) {
  const { id } = params;

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">Failed to connect to database.</p>
        </div>
      );
    }
  }

  let exerciseDetails = null;
  try {
    exerciseDetails = await exerciseModel.find({ id });
    if (!exerciseDetails || exerciseDetails.length === 0) {
      throw new Error("No exercises found");
    }
  } catch (error) {
    console.error("Error fetching exercise details:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load exercise details.</p>
      </div>
    );
  }

  return (
    <div className="w-full pt-20 ">
      <h1 className="text-2xl font-bold text-center mb-6">
        {exerciseDetails.name}
      </h1>
      <ul className="flex flex-col gap-6">
        {exerciseDetails.length > 0 ? (
          exerciseDetails.map((exercise, index) => (
            <li
              key={exercise._id || index}
              className="border p-4 rounded-md shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2 capitalize">
                {exercise.name}
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center justify-center">
                  <img
                    src={
                      exercise.image ||
                      "https://cdn-exercisedb.vercel.app/api/v1/images/Hy9D21L.gif"
                    }
                    alt={exercise.name}
                    className="w-48 h-48 object-cover"
                  />
                </div>
                <div>
                  <p>
                    <strong>Targeted Muscles:</strong>{" "}
                    {exercise.targetedMuscles || "N/A"}
                  </p>

                  <h3 className="text-md font-semibold mt-4">Instructions:</h3>
                  <ol className="list-decimal list-inside mt-2">
                    {exercise.instructions}
                  </ol>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <button
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded"
                  onClick={backButtonClick}
                >
                  Back
                </button>
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
