import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import HeaderSearch from "./components/Header/HeaderSearch";
import ProductsList from "./pages/ProductList";
import BinPage from "./pages/BinPage";

function App() {
	return (
		<>
			<MantineProvider>
				<HeaderSearch />

				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/products/:categoryId" element={<ProductsList />} />
					<Route path="/bin" element={<BinPage />} />
				</Routes>
			</MantineProvider>
		</>
	);
}

export default App;
