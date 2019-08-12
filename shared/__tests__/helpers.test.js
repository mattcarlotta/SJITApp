import {
  beginofMonth,
  convertDateToISO,
  createRandomToken,
  createSignupToken,
  createUniqueTemplateName,
  currentDate,
  endofMonth,
  sendError,
} from "shared/helpers";

describe("Helpers", () => {
  it("returns a beginning of month Date object", () => {
    expect(beginofMonth("july")).toEqual(expect.any(Object));
  });

  it("returns a Date with a PST time zone", () => {
    const date = new Date(2019, 3, 21);
    const isoDate = convertDateToISO(date);
    expect(isoDate).toEqual("2019-04-21T00:00:00.000-07:00");
  });

  it("creates a random 64 character string", () => {
    const token = createRandomToken();
    expect(token).toEqual(expect.any(String));
    expect(token.length).toEqual(64);
  });

  it("creates a random 32 character string", () => {
    const signupToken = createSignupToken();
    expect(signupToken).toEqual(expect.any(String));
    expect(signupToken.length).toEqual(32);
  });

  it("creates a unique snake-cased template string", () => {
    const template = createUniqueTemplateName("Employee Newsletter");
    expect(template).toEqual("employee-newsletter");
  });

  it("creates a current Date string", () => {
    expect(currentDate()).toEqual(expect.any(String));
  });

  it("returns a end of month Date object", () => {
    expect(endofMonth("july")).toEqual(expect.any(Object));
  });

  it("sends an error to the client", () => {
    const res = mockResponse();
    const err = "Invalid request.";

    sendError(err, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err });
  });
});
