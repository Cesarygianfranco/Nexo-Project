import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import HeaderSearch from "./components/Header/HeaderSearch";
import ProductList from "./pages/ProductList";

function App() {
	return (
		<>
			<MantineProvider>
				<HeaderSearch />

				<Routes>
					<Route path={"/"} element={<HomePage />} />
					<Route path={"/products/:categoryId "} element={<ProductList />} />
				</Routes>
			</MantineProvider>
		</>
	);
}

export default App;
