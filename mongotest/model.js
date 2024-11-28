import mongoose from "mongoose";

// ContactDB Schema
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const contactModel =
  mongoose.models.contactDB || mongoose.model("contactDB", contactSchema);

// ExerciseDB Schema
const exerciseSchema = new mongoose.Schema({
  bodypart: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  targetedMuscles: { type: String, required: true },
  instructions: { type: String, required: true },
});

const exerciseModel =
  mongoose.models.exerciseDB || mongoose.model("exerciseDB", exerciseSchema);

export { contactModel, exerciseModel };
