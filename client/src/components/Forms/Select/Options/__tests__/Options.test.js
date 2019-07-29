import Options from "../index";

const handleOptionSelect = jest.fn();

const initProps = {
	handleOptionSelect,
	isVisible: false,
	name: "test",
	selected: "",
	selectOptions: ["option1", "option2"],
};

describe("Options", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Options {...initProps} />);
	});

	it("initally renders nothing when invisible", () => {
		expect(wrapper.find("DropContainer").exists()).toBeFalsy();
	});

	describe("When the options menu is visible", () => {
		beforeEach(() => {
			wrapper.setProps({ isVisible: true });
		});

		it("displays two options", () => {
			expect(
				wrapper
					.find("Option")
					.first()
					.find("div")
					.text(),
			).toContain("option1");
			expect(
				wrapper
					.find("Option")
					.at(2)
					.find("div")
					.text(),
			).toContain("option2");
		});

		it("calls handleOptionSelect when clicked or when enter is pressed", () => {
			const option1 = wrapper.find("Option").first();
			const target = {
				dataset: {
					name: "test",
					value: "option1",
				},
			};

			option1.simulate("click", { target });
			option1.simulate("keypress", { key: "Enter", target });
			option1.simulate("keypress", { key: "Tab", target });

			expect(handleOptionSelect).toHaveBeenCalledTimes(2);
		});

		describe("individual Option", () => {
			let optionNode;
			beforeEach(() => {
				optionNode = () =>
					wrapper
						.find("Option")
						.first()
						.find("div");
			});

			it("initially renders a default option", () => {
				expect(optionNode()).toHaveStyleRule("color", "#282c34");
				expect(optionNode()).toHaveStyleRule("background-color", "#fff");
				expect(optionNode()).toHaveStyleRule("color", "#282c34", {
					modifier: ":hover",
				});
				expect(optionNode()).toHaveStyleRule("color", "#282c34", {
					modifier: ":focus",
				});
			});

			it("highlights the selected option", () => {
				wrapper.setProps({ value: "option1", selected: "option1" });

				expect(optionNode()).toHaveStyleRule("color", "#0f7ae5");
				expect(optionNode()).toHaveStyleRule("background-color", "#f3f3f3");
				expect(optionNode()).toHaveStyleRule("color", "#0f7ae5", {
					modifier: ":hover",
				});
				expect(optionNode()).toHaveStyleRule("color", "#0f7ae5", {
					modifier: ":focus",
				});
			});
		});
	});
});
