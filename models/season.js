import { Schema, model } from "mongoose";

// current season year
const seasonSchema = new Schema({
  seasonId: { type: String, unique: true, lowercase: true },
  startDate: Date,
  endDate: Date,
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

seasonSchema.statics.addUser = async function AddUser(_id, userId) {
  await this.updateOne({ _id }, { $addToSet: { members: userId } });
};

export default model("Season", seasonSchema);
