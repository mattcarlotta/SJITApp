import { Schema, model } from "mongoose";

// token templates
const tokenSchema = new Schema({
  seasonId: { type: String, lowercase: true },
  token: { type: String, required: true, unique: true },
  authorized: { type: String, lowercase: true, unique: true },
  email: { type: String, lowercase: true, unique: true },
  role: { type: String, required: true },
});

export default model("Token", tokenSchema);
