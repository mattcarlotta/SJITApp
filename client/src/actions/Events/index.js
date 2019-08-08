import isEmpty from "lodash/isEmpty";
import * as types from "types";

/**
 * Creates a new member.
 *
 * @function createEvent
 * @param {object} props - props contain league, eventType, location, timeSlots, uniform, start/end dates and times, and seasonId.
 * @returns {object}
 */
export const createEvent = props => ({
	type: types.EVENTS_CREATE,
	props,
});

/**
 * Fetches all events.
 *
 * @function fetchEvents
 * @returns {object}
 */
export const fetchEvents = () => ({
	type: types.EVENTS_FETCH,
});

/**
 * Sets any members from API to redux state
 *
 * @function setEvents
 * @param {object} data - contains events data ([_id, league, eventType,	location,	callTimes, uniform,		seasonId, startDate, endDate, notes, employeeResponses, scheduledEmployees]).
 * @returns {object}
 */
export const setEvents = data => ({
	type: types.EVENTS_SET,
	payload: !isEmpty(data) ? data : [],
});
