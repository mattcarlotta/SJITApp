import { getAllSeasons } from "controllers/season";

describe("Get All Seasons Controller", () => {
  it("handles valid get all seasons requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    getAllSeasons(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
