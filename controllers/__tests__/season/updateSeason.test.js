import { updateSeason } from "controllers/season";

describe("Update Season Controller", () => {
  it("handles valid update season requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    updateSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
