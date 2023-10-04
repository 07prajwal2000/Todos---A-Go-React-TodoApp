/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style.css";
import Layout from "./common/Layout";
import { NavPageRoutes } from "./common/Constants";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Notfound from "./pages/Notfound";
import { Toaster } from "react-hot-toast";
import useGlobalStore from "./store/global";
import { useEffect } from "react";
import { CheckLoggedIn } from "./api/auth";
import Account from "./pages/account";
import Profile from "./pages/account/profile";
import Settings from "./pages/account/settings";
import AccountLayout from "./pages/account/accountLayout";
import Boards from "./pages/account/boards";
import Billing from "./pages/account/billing";
import Users from "./pages/account/users";
import TodoPage from "./pages/account/todopage";

function App() {
	const { LoadProfile, Tokens, SetLoggedIn } = useGlobalStore();

	useEffect(() => {
		if (Tokens.Access == "") return;
		CheckLoggedIn(Tokens.Access).then(() => {
			LoadProfile(Tokens.Access);
			SetLoggedIn(true);
		});
	}, []);

	useEffect(() => {
		if (Tokens.Access == "") return;
		LoadProfile(Tokens.Access);
	}, [Tokens]);

	return (
		<>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route element={<Home />} path={"/"} />
						<Route element={<Auth />} path={"/auth"} />
						{NavPageRoutes.map((x) => (
							<Route key={x.name} element={x.page} path={x.url} />
						))}
            <Route path="/account" element={<AccountLayout />}>
              <Route element={<Account />} path="" />
              <Route element={<Profile />} path="profile" />
              <Route element={<Settings />} path="settings" />
              <Route element={<Boards />} path="boards" />
              <Route element={<Billing />} path="billing" />
              <Route element={<Users />} path="users" />
              <Route element={<TodoPage />} path="boards/:id" />
            </Route>
						<Route element={<Notfound />} path={"*"} />
					</Routes>
				</Layout>
			</BrowserRouter>
			<Toaster />
		</>
	);
}

export default App;
