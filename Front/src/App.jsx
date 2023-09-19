import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import Detail from "./components/Detail/Detail";

function App() {
	return (
		<div>
			<Routes>
				<Route
					path="/"
					element={<Landing />}
				/>
				<Route
					path="/home"
					element={<Home />}
				/>
				<Route
					path="/detail/:id"
					element={<Detail />}
				/>
			</Routes>
		</div>
	);
}

export default App;
