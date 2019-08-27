import { expiredForm } from "shared/authErrors";

describe("Auth Errors", () => {
  it("displays an expired form message", () => {
    const expirationDate = "August 27th, 2019";
    const message = expiredForm(expirationDate);
    expect(message).toEqual(
      `The window to view and update this form was closed after ${expirationDate}.`,
    );
  });
});
