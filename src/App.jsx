import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import "./App.css";

function App() {
	return (
		<>
			<h1>Nexo-Project</h1>

			<Routes>
				<Route path={"/"} element={<HomePage />} />
			</Routes>
		</>
	);
}

export default App;
