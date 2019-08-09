import isEmpty from "lodash/isEmpty";
import * as types from "types";

/**
 * Creates a new member.
 *
 * @function createEvent
 * @param {object} props - props contain league, eventType, location, timeSlots, uniform, start date and time, and seasonId.
 * @returns {object}
 */
export const createEvent = props => ({
	type: types.EVENTS_CREATE,
	props,
});

/**
 * Deletes a new event.
 *
 * @function deleteEvent
 * @param {string} eventId
 * @returns {object}
 */
export const deleteEvent = eventId => ({
	type: types.EVENTS_DELETE,
	eventId,
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
 * @param {object} data - contains events data ([_id, league, eventType,location,	callTimes, uniform,		seasonId, eventDate, notes, employeeResponses, scheduledEmployees]).
 * @returns {object}
 */
export const setEvents = data => ({
	type: types.EVENTS_SET,
	payload: !isEmpty(data) ? data : [],
});
