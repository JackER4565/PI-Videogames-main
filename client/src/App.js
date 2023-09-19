import "./App.css";
// import Landing from "./components/LandingPage/Landing";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";

import Landing from "./components/Landing/Landing";

function App() {
	return (
		<div>
			<Landing />
      <Routes>
        <Route exact path="/" component={Home} />
      </Routes>
		</div>
	);
}

export default App;
