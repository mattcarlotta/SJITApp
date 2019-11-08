import { Event, Form, User } from "models";
import { updateApForm } from "controllers/form";
import { unableToLocateForm, unableToUpdateApForm } from "shared/authErrors";

const getEvent = eventDate => Event.findOne({ eventDate });

const convertDoctoJSON = doc => Array.from(doc).map(d => d.toJSON());

describe("Update AP Form", () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles empty body requests", async () => {
    const emptyBody = {
      _id: "",
      responses: "",
    };
    const req = mockRequest(null, null, emptyBody);

    await updateApForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToUpdateApForm,
    });
  });

  it("handles invalid form ids requests", async () => {
    const invalidId = {
      _id: "5d5b5e952871780ef47480c6",
      responses: "test",
    };
    const req = mockRequest(null, null, invalidId);

    await updateApForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateForm,
    });
  });

  it("handles valid update/create AP form responses requests", async () => {
    const existingUser = await User.findOne({
      email: "scheduledmember@test.com",
    });

    const existingForm = await Form.findOne({ notes: "Form 5" });

    let event1 = await getEvent("2019-10-21T02:30:36.000Z");
    let event2 = await getEvent("2019-10-31T02:30:36.000Z");

    let event1Responses = convertDoctoJSON(event1.employeeResponses);
    let event2Responses = convertDoctoJSON(event2.employeeResponses);

    expect(event1Responses).toEqual([
      {
        _id: existingUser._id,
        response: "I want to work.",
        notes: "",
      },
    ]);

    expect(event2Responses).toEqual([]);

    const session = {
      user: {
        id: existingUser._id,
      },
    };

    const responses = [
      {
        id: event1._id,
        value: "Available to work.",
        notes: "",
        updateEvent: true,
      },
      {
        id: event2._id,
        value: "Not available to work.",
        notes: "Out of town.",
      },
    ];

    const body = {
      _id: existingForm._id,
      responses,
    };

    const req = mockRequest(null, session, body);

    await updateApForm(req, res);

    event1 = await getEvent("2019-10-21T02:30:36.000Z");
    event2 = await getEvent("2019-10-31T02:30:36.000Z");

    event1Responses = convertDoctoJSON(event1.employeeResponses);
    event2Responses = convertDoctoJSON(event2.employeeResponses);

    expect(event1Responses).toEqual([
      {
        _id: existingUser._id,
        response: "Available to work.",
        notes: "",
      },
    ]);

    expect(event2Responses).toEqual([
      {
        _id: existingUser._id,
        response: "Not available to work.",
        notes: "Out of town.",
      },
    ]);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully added your responses to the A/P form!",
    });
  });
});
