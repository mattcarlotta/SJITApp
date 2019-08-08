import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  league: { type: String, default: "NHL", required: true },
  eventType: { type: String, default: "Game", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, default: "SAP Center at San Jose", required: true },
  employees: [
    {
      id: { type: Schema.Types.ObjectId, ref: "User" },
      response: { type: String, required: true },
      notes: String,
    },
  ],
  seasonId: { type: String, required: true },
  team: String,
  timeSlots: { type: Array, of: Date, required: true },
  uniform: { type: String, default: "Teal Jersey" },
});

export default model("Event", eventSchema);
