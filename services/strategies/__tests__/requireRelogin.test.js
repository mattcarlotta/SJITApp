import { requireRelogin } from "services/strategies";

const next = jest.fn();

describe("Require Relogin Authentication Middleware", () => {
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

  it("handles expired loggedin sessions", async done => {
    const req = mockRequest();

    await requireRelogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.clearCookie).toHaveBeenCalledWith("SJSITApp", { path: "/" });
    expect(res.json).toHaveBeenCalledWith({ role: "guest" });
    done();
  });

  it("handles valid loggedin sessions", async done => {
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

    await requireRelogin(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    done();
  });
});
