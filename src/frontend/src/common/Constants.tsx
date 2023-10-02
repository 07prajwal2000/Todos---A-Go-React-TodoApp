import About from "../pages/about";
import Features from "../pages/features";
import Pricing from "../pages/pricing";

const NavPageRoutes = [
	{
		name: "Features",
		url: "/features",
		page: <Features />
	},
	{
		name: "About",
		url: "/about",
		page: <About />
	},
	{
		name: "Pricing",
		url: "/pricing",
		page: <Pricing />
	},
];

export {NavPageRoutes};