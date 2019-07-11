import { connectDatabase } from "database";
import { Types } from "mongoose";

jest.mock("@sendgrid/mail");

global.ObjectId = Types.ObjectId;
global.connectDatabase = connectDatabase;
