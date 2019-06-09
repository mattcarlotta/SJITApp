import { Schema, model } from "mongoose";

// current season year
const seasonSchema = new Schema({
  season: { type: String, unique: true, lowercase: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

seasonSchema.statics.addUser = async function AddUser(_id, userId) {
  try {
    await this.updateOne({ _id }, { $addToSet: { members: userId } });
  } catch (error) {
    throw new Error(error);
  }
};

export default model("Season", seasonSchema);
