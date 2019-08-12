import { requireAuth } from "services/strategies";
import { badCredentials } from "shared/authErrors";

const next = jest.fn();

describe("Require Authentication Middleware", () => {
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

  it("handles missing login sessions", async done => {
    const req = mockRequest();

    await requireAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ err: badCredentials });
    done();
  });

  it("handles valid login sessions", async done => {
    const session = {
      user: {
        id: "88",
        email: "test@example.com",
        firstName: "Beta",
        lastName: "Tester",
        role: "staff",
      },
    };

    const req = mockRequest(null, session);

    await requireAuth(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    done();
  });
});
