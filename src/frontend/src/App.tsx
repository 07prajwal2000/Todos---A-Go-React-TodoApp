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

function App() {
  const { LoadProfile, Tokens, SetLoggedIn } = useGlobalStore();
  
  useEffect(() => {
    if (Tokens.Access == "") return;
    CheckLoggedIn(Tokens.Access)
      .then(() => {
        LoadProfile(Tokens.Access);
        SetLoggedIn(true);
      });
  }, [])
  
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
            {
              NavPageRoutes.map(x => (
                <Route key={x.name} element={x.page} path={x.url} />
                ))
              }
              <Route element={<Notfound />} path={"*"} />
          </Routes>
          <Routes>
            <Route element={<Account />} path="/account" />
            <Route element={<Profile />} path="/account/profile" />
          </Routes>
        </Layout>
			</BrowserRouter>
      <Toaster />
		</>
	);
}

export default App;
