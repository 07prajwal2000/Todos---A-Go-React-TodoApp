import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style.css";
import Layout from "./common/Layout";
import { NavPageRoutes } from "./common/Constants";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Notfound from "./pages/Notfound";
import { Toaster } from "react-hot-toast";

function App() {
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
        </Layout>
			</BrowserRouter>
      <Toaster />
		</>
	);
}

export default App;
