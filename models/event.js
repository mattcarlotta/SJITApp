import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  date: Date,
  event: { type: String, default: "game" },
  endTime: Date,
  location: { type: String, default: "SAP Center at San Jose" },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  season: { type: Schema.Types.ObjectId, ref: "Season" },
  startTime: Date,
  team: String,
  type: { type: String, default: "regular" },
  timeslots: [Date],
  uniform: { type: String, default: "Teal Jersey" },
});

export default model("Event", eventSchema);
