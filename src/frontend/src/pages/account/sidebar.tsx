import {
	BanknotesIcon,
	ClipboardDocumentIcon,
	Cog6ToothIcon,
	UserCircleIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalStore, { PageEnum } from "../../store/global";

const sidebarItems = [
	{
		icon: <UserCircleIcon />,
		text: "Account",
		url: "/account",
		pageEnum: PageEnum.Account,
	},
	{
		icon: <ClipboardDocumentIcon />,
		text: "Todo Boards",
		url: "/account/boards",
		pageEnum: PageEnum.TodoBoard,
	},
	{
		icon: <BanknotesIcon />,
		text: "Billing",
		url: "/account/billing",
		pageEnum: PageEnum.Billing,
	},
	{
		icon: <UserGroupIcon />,
		text: "Users",
		url: "/account/users",
		pageEnum: PageEnum.Users,
	},
];

const Sidebar = () => {
	return (
		<div className="position-fixed d-flex flex-column sidebar border border-dark-subtle bg-white shadow shadow-sm">
			{sidebarItems.map((x) => (
				<SidebarItem
					pageEnum={x.pageEnum}
					key={x.text}
					url={x.url}
					icon={x.icon}
					text={x.text}
				/>
			))}
			<div className="my-5"></div>
			<SidebarItem
				icon={<Cog6ToothIcon />}
				pageEnum={PageEnum.Settings}
				url="/account/settings"
				text="Settings"
			/>
		</div>
	);
};

const SidebarItem = ({
	icon,
	text,
	url,
	pageEnum,
}: {
	icon: React.ReactNode;
	text: string;
	url: string;
	pageEnum: PageEnum;
}) => {
	const [hidden, setHidden] = useState(true);
	const { SetCurrentPage, CurrentPage } = useGlobalStore();

	const isCurrent = CurrentPage == pageEnum;

	return (
		<Link
			to={url}
			onClick={() => SetCurrentPage(pageEnum)}
			className="position-relative text-black-50 z-3"
		>
			<div
				onMouseEnter={() => setHidden(false)}
				onMouseLeave={() => setHidden(true)}
				style={{ transition: "all 120ms ease-in-out", width: "60%", zIndex: '1000' }}
				className={`mx-auto my-2 p-2 rounded-2 border ${
					hidden
						? `${
								isCurrent
									? "bg-primary text-white"
									: "bg-primary-subtle"
						  }`
						: "bg-primary text-white"
				}`}
			>
				{icon}
			</div>
			{!hidden && (
				<div
					className="position-absolute rounded-2 bg-info-subtle px-3 py-2"
					style={{ top: "12%", left: "90%" }}
				>
					<h5
						style={{ fontSize: "1rem", zIndex: '200' }}
						className="text-nowrap my-auto"
					>
						{text}
					</h5>
				</div>
			)}
		</Link>
	);
};

export default Sidebar;
