import { BanknotesIcon, ClipboardDocumentIcon, Cog6ToothIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const sidebarItems = [
  {
    icon: <ClipboardDocumentIcon />,
    text: 'Todo Boards',
    url: '/account'
  },
  {
    icon: <BanknotesIcon />,
    text: 'Billing',
    url: '/account#bill'
  },
  {
    icon: <UserGroupIcon />,
    text: 'Users',
    url: '/account#users'
  },
];

const Sidebar = () => {
	return (
		<div className="position-fixed sidebar border border-dark-subtle bg-white shadow shadow-sm">
			{sidebarItems.map(x => <SidebarItem key={x.text} url={x.url} icon={x.icon} text={x.text} />)}
      <div className="my-5"></div>
			<SidebarItem icon={<Cog6ToothIcon />} url="/account/settings" text="Settings" />
		</div>
	);
};

const SidebarItem = ({icon, text, url}: {icon: React.ReactNode, text: string, url: string}) => {
	const [hidden, setHidden] = useState(true);

	return (
		<Link to={url} className="position-relative text-black-50">
			<div
				onMouseEnter={() => setHidden(false)}
				onMouseLeave={() => setHidden(true)}
        style={{transition: 'all 120ms ease-in-out', width: '60%'}}
				className={`mx-auto my-2 p-2 rounded-2 border ${hidden ? 'bg-primary-subtle' : 'bg-primary text-white'}`}
			>
				{icon}
			</div>
			{!hidden && <div className="position-absolute rounded-2 bg-info-subtle px-3 py-2" style={{top: '12%', left: '90%'}}>
        <h5 style={{fontSize: '1rem'}} className="text-nowrap my-auto">{text}</h5>
        </div>}
		</Link>
	);
};

export default Sidebar;
