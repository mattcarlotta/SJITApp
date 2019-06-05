import { Schema, model } from "mongoose";

const seasonSchema = new Schema({
  season: { type: String, unique: true, lowercase: true },
});

export default model("Season", seasonSchema);
