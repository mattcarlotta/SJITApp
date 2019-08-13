/* istanbul ignore file */
import { createElement } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { shallow, mount } from "enzyme";
import { store } from "root";

//= =============================================================================//
// CUSTOM TESTING FUNCTIONS                                                       /
//= =============================================================================//

/**
 * Factory function to create a ShallowWrapper for a component
 * @function shallowWrap
 * @param {node} Component - Component to be shallowed
 * @param {object} state - initial state for setup.
 * @returns {ShallowWrapper}
 */
export const shallowWrap = (Component, state = null) => {
	const wrapper = shallow(Component);
	if (state) wrapper.setState(state);
	return wrapper;
};

/**
 * Factory function to create a Mounted MemoryRouter Wrapper for a component
 * @function HOCWrap
 * @param {node} Component - Component to be mounted
 * @param {object} initialProps - Component props specific to this setup.
 * @param {object} state - Component initial state for setup.
 * @param {array} initialEntries - Initial route entries for MemoryRouter.
 * @returns {MountedRouterWrapper}
 */
export const HOCWrap = (
	Component,
	initialProps = {},
	state = null,
	initialEntries = ["/"],
) => {
	const wrapper = mount(
		createElement(
			props => (
				<Provider store={store}>
					<MemoryRouter initialEntries={initialEntries}>
						<Component {...props} />
					</MemoryRouter>
				</Provider>
			),
			initialProps,
		),
	);
	if (state) wrapper.find(Component).setState(state);
	return wrapper;
};
