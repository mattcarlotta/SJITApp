import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  date: { type: Date, required: true },
  league: { type: String, default: "NHL", required: true },
  event: { type: String, default: "Game", required: true },
  endTime: Date,
  location: { type: String, default: "SAP Center at San Jose", required: true },
  members: [
    {
      id: { type: Schema.Types.ObjectId, ref: "User" },
      response: { type: String, required: true },
      notes: String,
    },
  ],
  season: { type: Schema.Types.ObjectId, ref: "Season" },
  startTime: { type: Date, required: true },
  team: String,
  type: { type: String, default: "Regular" },
  timeslots: [Date],
  uniform: { type: String, default: "Teal Jersey" },
});

export default model("Event", eventSchema);
