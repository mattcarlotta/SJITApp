import { Schema, model } from "mongoose";

// mail
const mailSchema = new Schema({
  to: { type: String, required: true },
  from: {
    type: String,
    default: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
  },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

export default model("Mail", mailSchema);
