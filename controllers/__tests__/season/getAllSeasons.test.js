import { getAllSeasons } from "controllers/season";

describe("Get All Seasons Controller", () => {
  it("handles valid get all seasons requests", async () => {
    const res = mockResponse();
    const req = mockRequest();

    await getAllSeasons(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      seasons: expect.any(Array),
    });
  });
});
