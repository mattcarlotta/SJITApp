import { getSeason } from "controllers/season";

describe("Get Season Controller", () => {
  it("handles valid get season requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    getSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
