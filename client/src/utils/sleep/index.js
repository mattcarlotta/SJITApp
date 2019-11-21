/* istanbul ignore file */
/**
 * A helper function to delay an action.
 *
 * @function
 * @async
 * @param {number} ms - a number in miliseconds.
 */
export default async ms => {
	await new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
};
