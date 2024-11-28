"use server";

import mongoose from "mongoose";
import { contactModel, exerciseModel } from "./model";

// MongoDB Connection
async function mongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
}

// Add Contact Data
export async function addContactData(firstName, lastName, email, message) {
  try {
    await mongoDB();
    const data = await contactModel.create({
      firstName,
      lastName,
      email,
      message,
    });
    console.log(data);
    return { success: true, message: "Contact Form Submitted Successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Database Error" };
  }
}

// Add Exercise Data
export async function addExerciseData(bodypart, name, image, targetedMuscles,instructions) {
  try {
    await mongoDB();
    const data = await exerciseModel.create({
      bodypart,
      name,
      image,
      targetedMuscles,
      instructions,
    });
    console.log(data);
    return { success: true, message: "Exercise Added Successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Database Error" };
  }
}

export async function getAllExercise() {
  try {
    await mongoDB();
    const exercises = await exerciseModel.find({});
    return exercises;
  } catch (error) {
    console.log(error);
  }
}
