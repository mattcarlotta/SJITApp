import { getAllTemplates } from "controllers/template";

describe("Get All Templates Controller", () => {
  it("handles valid get all templates requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    getAllTemplates(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
