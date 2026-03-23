import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import HeaderSearch from "./components/HeaderSearch";

function App() {
	return (
		<>
			<MantineProvider>
				<HeaderSearch />

				<Routes>
					<Route path={"/"} element={<HomePage />} />
				</Routes>
			</MantineProvider>
		</>
	);
}

export default App;
