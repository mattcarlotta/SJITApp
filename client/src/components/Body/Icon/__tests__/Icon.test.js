import Icon from "../index";

const initProps = {
	className: "",
	type: "",
};

const wrapper = mount(<Icon {...initProps} />);

describe("Icon", () => {
	it("renders without errors", () => {
		expect(wrapper.find("i").exists()).toBeTruthy();
	});

	it("initially displays a bug if missing a type", () => {
		expect(wrapper.find("FaBug").exists()).toBeTruthy();
	});

	it("displays a Font Awesome icon by a string type", () => {
		wrapper.setProps({ type: "calander" });
		expect(wrapper.find("FaCalendarAlt").exists()).toBeTruthy();

		wrapper.setProps({ type: "id" });
		expect(wrapper.find("FaIdCard").exists()).toBeTruthy();

		wrapper.setProps({ type: "key" });
		expect(wrapper.find("FaKey").exists()).toBeTruthy();

		wrapper.setProps({ type: "lock" });
		expect(wrapper.find("FaLock").exists()).toBeTruthy();

		wrapper.setProps({ type: "mail" });
		expect(wrapper.find("FaEnvelope").exists()).toBeTruthy();

		wrapper.setProps({ type: "user" });
		expect(wrapper.find("FaUserCircle").exists()).toBeTruthy();

		wrapper.setProps({ type: "usertag" });
		expect(wrapper.find("FaIdBadge").exists()).toBeTruthy();
	});
});
