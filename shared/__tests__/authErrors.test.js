import { expiredForm, unableToLocateEvents } from "shared/authErrors";

describe("Auth Errors", () => {
  it("displays an expired form message", () => {
    const expirationDate = "August 27th, 2019";
    const message = expiredForm(expirationDate);
    expect(message).toEqual(
      `The window to view and update this form was closed after ${expirationDate}.`,
    );
  });

  it("displays an event date range error message", () => {
    const startMonth = "11/01/2019";
    const endMonth = "11/29/2019";
    const message = unableToLocateEvents(startMonth, endMonth);

    expect(message).toEqual(
      `Unable to locate any events. Make sure to create events between ${startMonth}-${endMonth} before trying again.`,
    );
  });
});
