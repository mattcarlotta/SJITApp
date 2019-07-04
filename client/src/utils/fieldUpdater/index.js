export default (fields, name, value) =>
	fields.map(field =>
		field.name === name ? { ...field, value, errors: "" } : field,
	);
