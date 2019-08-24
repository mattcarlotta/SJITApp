import groupBy from "lodash/groupBy";

export default formFields => {
	const { radiogroup, textarea } = groupBy(formFields, "type");

	const updateFormFields = radiogroup.map(field => {
		const eventNote = textarea.find(item => field.id === item.id);
		return { ...field, notes: eventNote.value };
	});

	return updateFormFields;
};
