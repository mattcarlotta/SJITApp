import { User, Form } from "models";
import { viewApForm } from "controllers/form";
import {
  expiredForm,
  missingFormId,
  unableToLocateForm,
} from "shared/authErrors";

describe("View AP Form", () => {
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

  it("handles empty params requests", async () => {
    const emptyParams = {
      id: "",
    };

    const session = {
      user: {
        id: "",
      },
    };

    const req = mockRequest(null, session, null, null, emptyParams);

    await viewApForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingFormId,
    });
  });

  it("handles invalid form ids requests", async () => {
    const invalidId = {
      id: "5d5dc7c28b96ca09a35c872c",
    };

    const session = {
      user: {
        id: "",
      },
    };

    const req = mockRequest(null, session, null, null, invalidId);

    await viewApForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateForm,
    });
  });

  it("handles expired form ids requests", async () => {
    const existingForm = await Form.findOne({ notes: "Form 1" });

    const params = {
      id: existingForm._id,
    };

    const session = {
      user: {
        id: "",
      },
    };

    const req = mockRequest(null, session, null, null, params);

    await viewApForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: expiredForm("August 10th, 2000 @ 12:00am"),
    });
  });

  it("handles valid view AP form requests", async () => {
    const existingUser = await User.findOne({
      email: "carlotta.matt@gmail.com",
    });
    const existingForm = await Form.findOne({ notes: "Form 4" });

    const params = {
      id: existingForm._id,
    };

    const session = {
      user: {
        id: existingUser._id,
      },
    };

    const req = mockRequest(null, session, null, null, params);

    await viewApForm(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      eventResponses: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          notes: expect.any(String),
          response: expect.any(String),
        }),
      ]),
      events: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          eventDate: expect.any(Date),
          eventType: expect.any(String),
          location: expect.any(String),
          opponent: expect.any(String),
          team: expect.any(String),
        }),
      ]),
      form: expect.objectContaining({
        _id: expect.any(ObjectId),
        endMonth: expect.any(Date),
        expirationDate: expect.any(Date),
        notes: expect.any(String),
        startMonth: expect.any(Date),
      }),
    });
  });

  it("handles valid yet empty view AP form requests", async () => {
    const existingUser = await User.findOne({
      email: "carlotta.matt@gmail.com",
    });
    const existingForm = await Form.findOne({ notes: "Form 5" });

    const params = {
      id: existingForm._id,
    };

    const session = {
      user: {
        id: existingUser._id,
      },
    };

    const req = mockRequest(null, session, null, null, params);

    await viewApForm(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      eventResponses: [],
      events: [],
      form: expect.objectContaining({
        _id: expect.any(ObjectId),
        endMonth: expect.any(Date),
        expirationDate: expect.any(Date),
        notes: expect.any(String),
        startMonth: expect.any(Date),
      }),
    });
  });
});
