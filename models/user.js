import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String
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
    if (!salt) throw new Error("Unable to generate password salt!");

    const newPassword = await bcrypt.hash(password, salt, null);
    if (!newPassword) throw new Error("Unable to generate a secure password!");

    return newPassword;
  } catch (err) {
    throw new Error(err);
  }
};

// Set a compare password method on the model
userSchema.methods.comparePassword = async function compare(incomingPassword) {
  try {
    const isMatch = await bcrypt.compare(incomingPassword, this.password);
    if (!isMatch) throw new Error(badCredentials);

    return isMatch;
  } catch (err) {
    throw new Error(err);
  }
};

export default model("user", userSchema);
