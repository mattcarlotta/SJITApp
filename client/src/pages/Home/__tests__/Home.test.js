import Home from "../index";

const wrapper = shallow(<Home />);

describe("Home Page", () => {
  it("renders without errors", () => {
    expect(wrapper.find("Home").exists).toBeTruthy();
  });
})
