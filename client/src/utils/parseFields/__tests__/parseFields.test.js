import parsedFields from "../index";
import moment from "moment";

describe("Parse Fields Helper", () => {
	it("throws an error if missing required parameters", () => {
		const nextFields = parsedFields();
		expect(nextFields).toEqual("Error: You must supply an array of fields!");
	});

	it("parses an array of fields", () => {
		const fields = [
			{
				name: "email",
				type: "text",
				value: "test@example.com",
			},
			{
				name: "password",
				type: "password",
				value: "12345",
			},
			{
				name: "callTime1",
				type: "time",
				value: moment(new Date("2019-12-17T01:00:00")),
			},
			{
				name: "callTime2",
				type: "time",
				value: moment(new Date("2019-12-17T02:00:00")),
			},
			{
				name: "callTime3",
				type: "time",
				value: moment(new Date("2019-12-17T03:00:00")),
			},
		];

		const nextFields = parsedFields(fields);
		expect(nextFields).toEqual(
			expect.objectContaining({
				email: "test@example.com",
				password: "12345",
				callTimes: ["1:00 AM", "2:00 AM", "3:00 AM"],
			}),
		);
	});
});
