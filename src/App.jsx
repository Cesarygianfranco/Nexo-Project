import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import HeaderSearch from "./components/Header/HeaderSearch";
import ProductsList from "./pages/ProductsList";

function App() {
	return (
		<>
			<MantineProvider>
				<HeaderSearch />

				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/products/:categoryId" element={<ProductsList />} />
				</Routes>
			</MantineProvider>
		</>
	);
}

export default App;
