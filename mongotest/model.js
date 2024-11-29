import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

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
  id: { type: String, default: () => uuidv4() },
  bodypart: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  targetedMuscles: { type: String, required: true },
  instructions: {
    type: String,
    required: true,
    default: "No instructions provided",
  },
});

const exerciseModel =
  mongoose.models.exerciseDB || mongoose.model("exerciseDB", exerciseSchema);

export { contactModel, exerciseModel };
