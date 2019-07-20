import LoadingTable from "../LoadingTable";

const initProps = {
	className: "",
};

describe("Loading Table", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<LoadingTable {...initProps} />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("div")).toHaveLength(3);
	});

	it("accepts a className and applies to a div", () => {
		wrapper.setProps({ className: "loading" });

		expect(wrapper.find("div.loading").exists()).toBeTruthy();
	});
});
