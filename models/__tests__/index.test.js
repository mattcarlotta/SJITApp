import {
  Event, Schedule, Season, Team, Template, Token, User,
} from "models";

describe("Default Model Exports", () => {
  it("exports Event", () => {
    expect(Event).toBeDefined();
  });

  it("exports Schedule", () => {
    expect(Schedule).toBeDefined();
  });

  it("exports Season", () => {
    expect(Season).toBeDefined();
  });

  it("exports Team", () => {
    expect(Team).toBeDefined();
  });

  it("exports Template", () => {
    expect(Template).toBeDefined();
  });

  it("exports Token", () => {
    expect(Token).toBeDefined();
  });

  it("exports User", () => {
    expect(User).toBeDefined();
  });
});
