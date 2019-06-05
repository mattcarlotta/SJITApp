import { Schema, model } from "mongoose";

const teamSchema = new Schema({
  icon: String,
  team: { type: String, unique: true, lowercase: true },
});

export default model("Team", teamSchema);
