import { requireStaffRole } from "services/strategies";
import { badCredentials } from "shared/authErrors";

const next = jest.fn();

describe("Require Staff Role Authentication Middleware", () => {
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

  it("handles invalid requests requiring staff privileges", async done => {
    const req = mockRequest();

    await requireStaffRole(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ err: badCredentials });
    done();
  });

  it("handles valid requests requiring staff privileges", async done => {
    const session = {
      user: {
        id: "88",
        email: "test@example.com",
        firstName: "Beta",
        lastName: "Tester",
        role: "supervisor",
      },
    };

    const req = mockRequest(null, session);

    await requireStaffRole(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    done();
  });
});
