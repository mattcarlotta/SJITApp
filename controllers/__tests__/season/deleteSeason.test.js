import { deleteSeason } from "controllers/season";

describe("Delete Season Controller", () => {
  it("handles valid delete season requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    deleteSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
