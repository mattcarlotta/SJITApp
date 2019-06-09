import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { badCredentials } from "shared/authErrors";
import { convertDateToISO } from "shared/helpers";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  role: { type: String, default: "member" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  registered: { type: Date, default: convertDateToISO(Date.now()) },
  schedule: [{ type: Schema.Types.ObjectId, ref: "Schedule" }],
  token: { type: String, unique: true },
  timesAvailable: Number,
  timesUnavailable: Number,
  verified: { type: Boolean, default: false },
});

userSchema.statics.createUser = async function newUser(user) {
  if (!user) throw new Error("User required!");

  try {
    return await this.create(user);
  } catch (err) {
    throw new Error(err);
  }
};

// // Generate a salt, password, then run callback
userSchema.statics.createPassword = async function createNewPassword(password) {
  try {
    const salt = await bcrypt.genSalt(12);
    if (!salt) throw "Unable to generate password salt!";

    const newPassword = await bcrypt.hash(password, salt, null);
    if (!newPassword) throw "Unable to generate a secure password!";

    return newPassword;
  } catch (err) {
    throw new Error(err);
  }
};

// Set a compare password method on the model
userSchema.methods.comparePassword = async function compare(incomingPassword) {
  try {
    const isMatch = await bcrypt.compare(incomingPassword, this.password);
    if (!isMatch) throw badCredentials;

    return isMatch;
  } catch (err) {
    throw new Error(err);
  }
};

export default model("User", userSchema);
