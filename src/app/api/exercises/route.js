// src/app/api/exercises/route.js
 // Adjust the import path as needed
import mongoose from 'mongoose';
import { exerciseModel } from '../../../../mongotest/model';

// Handle GET requests
export async function GET() {
  try {
    // Log to check connection status
    if (mongoose.connection.readyState === 0) {
      console.log("MongoDB is not connected");
      await mongoose.connect(process.env.MONGO_URI); // Ensure to use the correct connection string
      console.log("MongoDB connected successfully");
    }

    const exercises = await exerciseModel.find({});
    return new Response(JSON.stringify(exercises), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching exercises:", error);  // Log the error
    return new Response(JSON.stringify({ error: "Failed to fetch exercises" }), {
      status: 500,
    });
  }
}
