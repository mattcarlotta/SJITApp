import parsedFields from "../index";

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
		];

		const nextFields = parsedFields(fields);
		expect(nextFields).toEqual(
			expect.objectContaining({
				email: "test@example.com",
				password: "12345",
			}),
		);
	});
});
