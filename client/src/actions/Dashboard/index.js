import isEmpty from "lodash/isEmpty";
import * as types from "types";

/**
 * Fetches event distribution by month.
 *
 * @function fetchEventDistribution
 * @param {object} - startDate and endDate
 * @returns {object}
 */
export const fetchEventDistribution = params => ({
	type: types.DASHBOARD_FETCH_EVENT_DISTRIBUTION,
	params,
});

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
 * Sets event distribution to redux state
 *
 * @function setEventDistribution
 * @param {array} data - contains events data ([name, Event Count]).
 * @returns {object}
 */
export const setEventDistribution = data => ({
	type: types.DASHBOARD_SET_EVENT_DISTRIBUTION,
	payload: !isEmpty(data) ? data : [],
});

/**
 * Sets events to redux state
 *
 * @function setEvents
 * @param {array} data - contains events data ([_id, eventType,location,callTimes, uniform,	seasonId, eventDate, notes, scheduledEmployees]).
 * @returns {object}
 */
export const setEvents = data => ({
	type: types.DASHBOARD_SET_EVENTS,
	payload: !isEmpty(data) ? data : [],
});
