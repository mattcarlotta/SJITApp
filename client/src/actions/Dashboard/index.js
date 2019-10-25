import isEmpty from "lodash/isEmpty";
import * as types from "types";

/**
 * Fetches current or upcoming event.
 *
 * @function fetchEvents
 * @param {string} selectedEvent
 * @returns {object}
 */
export const fetchEvents = selectedEvent => ({
	type: types.DASHBOARD_FETCH_EVENTS,
	selectedEvent: selectedEvent.toLowerCase(),
});

/**
 * Sets an event to redux state
 *
 * @function setEvents
 * @param {array} data - contains events data ([_id, eventType,location,callTimes, uniform,	seasonId, eventDate, notes, scheduledEmployees]).
 * @returns {object}
 */
export const setEvents = data => ({
	type: types.DASHBOARD_SET_EVENTS,
	payload: !isEmpty(data) ? data : [],
});
