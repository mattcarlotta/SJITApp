/* istanbul ignore file */
import {
	FaClock,
	FaFileSignature,
	FaCogs,
	FaUsers,
	FaEnvelope,
	FaMailBulk,
	FaQuestionCircle,
	FaConciergeBell,
	FaUserPlus,
	FaUserFriends,
	FaListAlt,
	FaKey,
	FaFolder,
	FaFolderOpen,
	FaFolderPlus,
} from "react-icons/fa";
import { MdEvent, MdNoteAdd, MdEventNote, MdDashboard } from "react-icons/md";

export const StaffRoutes = [
	{ component: MdDashboard, key: "dashboard", tab: "dashboard" },
	{
		component: MdEvent,
		key: "events",
		tab: "events",
		submenu: [
			{ key: "events/create", component: MdNoteAdd, tab: "Create Event" },
			{ key: "events/viewall", component: MdEventNote, tab: "View Events" },
		],
	},
	{
		component: FaFileSignature,
		key: "forms",
		tab: "forms",
		submenu: [
			{ key: "forms/create", component: MdNoteAdd, tab: "Create Form" },
			{ key: "forms/viewall", component: FaListAlt, tab: "View Forms" },
		],
	},
	{
		component: FaEnvelope,
		key: "mail",
		tab: "mail",
		submenu: [
			{ key: "mail/create", component: MdNoteAdd, tab: "Send Mail" },
			{
				key: "mail/viewall",
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
			{ key: "members/create", component: FaUserPlus, tab: "Create Member" },
			{
				key: "members/authorizations/viewall",
				component: FaKey,
				tab: "View Authorizations",
			},
			{ key: "members/viewall", component: FaUsers, tab: "View Members" },
		],
	},
	{
		component: FaClock,
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
				component: FaFolderPlus,
				tab: "Create Season",
			},
			{ key: "seasons/viewall", component: FaFolderOpen, tab: "View Seasons" },
		],
	},
	{ divider: true, key: "accounting" },
	{ component: FaCogs, key: "settings", tab: "settings" },
	{ component: FaQuestionCircle, key: "help", tab: "help" },
	{ component: FaConciergeBell, key: "contact", tab: "contact us" },
];

export const EmployeeRoutes = [
	{ component: MdDashboard, key: "dashboard", tab: "dashboard" },
	{
		component: FaFileSignature,
		key: "forms/viewall",
		tab: "forms",
	},
	{
		component: FaClock,
		key: "schedule",
		tab: "schedule",
	},
	{ divider: true, key: "accounting" },
	{ component: FaCogs, key: "settings", tab: "settings" },
	{ component: FaQuestionCircle, key: "help", tab: "help" },
	{ component: FaConciergeBell, key: "contact", tab: "contact us" },
];
