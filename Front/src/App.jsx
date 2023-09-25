import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import Detail from "./components/Detail/Detail";
import AddForm from "./components/AddForm/AddForm";
import { useState } from "react";

// import { useEffect } from "react";

function App() {
	const [showButton, setShowButton] = useState(true);
	// Función para mostrar mensajes del servidor
	const toggleButton = () => {
		setShowButton(!showButton);
	};

	return (
		<div>
			<div
				style={{ display: showButton ? "none" : "block" }}
				id="serverMessage"
				className="alert">
					<p>Server message</p>
				<button
					type="button"
					className="close"
					data-dismiss="alert"
					aria-hidden="true"
					onClick={toggleButton}>
					&times;
				</button>
			</div>
			<Routes>
				<Route
					path="/"
					element={<Landing />}
				/>
				<Route
					path="/home/:pagenumber?"
					element={<Home />}
				/>
				<Route
					path="/home"
					element={<Home />}
				/>
				<Route
					path="/detail/:param"
					element={<Detail />}
				/>
				<Route
					path="/add"
					element={<AddForm />}
				/>
			</Routes>
		</div>
	);
}

export default App;
