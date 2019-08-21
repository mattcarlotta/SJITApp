import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  eventType: { type: String, default: "Game", required: true },
  eventDate: { type: Date, required: true },
  location: { type: String, default: "SAP Center at San Jose" },
  employeeResponses: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      response: { type: String, required: true },
      notes: String,
    },
  ],
  scheduledEmployees: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  seasonId: { type: String, required: true },
  team: { type: String, required: true },
  opponent: String,
  callTimes: { type: Array, of: Date, required: true },
  uniform: { type: String, default: "Teal Jersey" },
  notes: String,
});

export default model("Event", eventSchema);
