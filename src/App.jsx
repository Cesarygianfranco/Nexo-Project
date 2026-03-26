import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import "./App.css";
import HeaderSearch from "./components/Header/HeaderSearch";
import ProductsList from "./pages/ProductsList";
import BinPage from "./pages/BinPage";
import EditProductPage from "./pages/EditProductPage";
import ValuationPage from "./pages/ValuationPage";


const theme = createTheme({

});

function App() {
	return (
		<>
			<MantineProvider theme={theme} defaultColorScheme="light">
				<HeaderSearch />

				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/products/:categoryId" element={<ProductsList />} />
					<Route
						path="/productsDetails/:productId"
						element={<EditProductPage />}
					/>
					<Route path="/bin" element={<BinPage />} />
					<Route path="/valuation" element={<ValuationPage />} />
				</Routes>
			</MantineProvider>
		</>
	);
}

export default App;
