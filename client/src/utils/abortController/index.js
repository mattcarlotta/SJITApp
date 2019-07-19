const abortController = () => {
	const controller = new AbortController();
	const { signal } = controller;

	return {
		controller,
		signal,
	};
};

export default abortController;
