/* istanbul ignore file */
import {
	FaBalanceScale,
	FaCalendar,
	FaCalendarPlus,
	FaCopyright,
	FaFileSignature,
	FaCogs,
	FaUsers,
	FaEnvelope,
	FaMailBulk,
	FaPaperPlane,
	FaQuestionCircle,
	FaConciergeBell,
	FaUserPlus,
	FaUserFriends,
	FaFileAlt,
	FaKey,
	FaFolder,
	FaFolderOpen,
	FaFolderPlus,
} from "react-icons/fa";
import { MdEvent, MdNoteAdd, MdEventNote, MdDashboard } from "react-icons/md";

export const StaffRoutes = [
	{
		component: MdDashboard,
		key: "dashboard",
		value: "dashboard",
		tab: "dashboard",
	},
	{
		component: MdEvent,
		key: "events",
		tab: "events",
		submenu: [
			{
				key: "events/create",
				value: "events/create",
				component: FaCalendarPlus,
				tab: "Create Event",
			},
			{
				key: "events/viewall",
				value: "events/viewall?page=1",
				component: MdEventNote,
				tab: "View Events",
			},
		],
	},
	{
		component: FaFileSignature,
		key: "forms",
		tab: "forms",
		submenu: [
			{
				key: "forms/create",
				value: "forms/create",
				component: MdNoteAdd,
				tab: "Create Form",
			},
			{
				key: "forms/viewall",
				value: "forms/viewall?page=1",
				component: FaFileAlt,
				tab: "View Forms",
			},
		],
	},
	{
		component: FaEnvelope,
		key: "mail",
		tab: "mail",
		submenu: [
			{
				key: "mail/create",
				value: "mail/create",
				component: FaPaperPlane,
				tab: "Send Mail",
			},
			{
				key: "mail/viewall",
				value: "mail/viewall?page=1",
				component: FaMailBulk,
				tab: "View Mail",
			},
		],
	},
	{
		component: FaUserFriends,
		key: "members",
		tab: "members",
		submenu: [
			{
				key: "members/create",
				value: "members/create",
				component: FaUserPlus,
				tab: "Create Member",
			},
			{
				key: "members/authorizations/viewall",
				value: "members/authorizations/viewall?page=1",
				component: FaKey,
				tab: "View Authorizations",
			},
			{
				key: "members/viewall",
				value: "members/viewall?page=1",
				component: FaUsers,
				tab: "View Members",
			},
		],
	},
	{
		component: FaCalendar,
		key: "schedule",
		tab: "schedule",
	},
	{
		component: FaFolder,
		key: "seasons",
		tab: "seasons",
		submenu: [
			{
				key: "seasons/create",
				value: "seasons/create",
				component: FaFolderPlus,
				tab: "Create Season",
			},
			{
				key: "seasons/viewall",
				value: "seasons/viewall?page=1",
				component: FaFolderOpen,
				tab: "View Seasons",
			},
		],
	},
	{ divider: true, key: "accounting" },
	{ component: FaCogs, key: "settings", value: "settings", tab: "settings" },
	{ component: FaQuestionCircle, key: "help", value: "help", tab: "help" },
	{
		component: FaConciergeBell,
		key: "contact-us",
		value: "contact-us",
		tab: "contact us",
	},
	{
		component: FaBalanceScale,
		key: "privacy",
		value: "privacy",
		tab: "privacy policy",
	},
	{
		component: FaCopyright,
		key: "licensing",
		value: "licensing",
		tab: "licensing",
	},
];

export const EmployeeRoutes = [
	{ component: MdDashboard, key: "dashboard", tab: "dashboard" },
	{
		component: FaCalendar,
		key: "schedule",
		tab: "schedule",
	},
	{ divider: true, key: "accounting" },
	{ component: FaCogs, key: "settings", tab: "settings" },
	{ component: FaQuestionCircle, key: "help", tab: "help" },
	{ component: FaConciergeBell, key: "contact-us", tab: "contact us" },
	{ component: FaBalanceScale, key: "privacy", tab: "privacy policy" },
	{ component: FaCopyright, key: "licensing", tab: "licensing" },
];
