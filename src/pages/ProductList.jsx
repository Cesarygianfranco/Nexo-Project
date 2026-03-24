import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../service/api";
import axios from "axios";

const ProductList = () => {
	const { categoryId } = useParams();

	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/products.json`)
			.then((response) => {
				const infoproducts = response.data;

				const filteredArr = infoproducts.filter((product) => {
					return product.categoryId === categoryId;
				});
				setProducts(filteredArr);
			})
			.catch((error) => {
				console.error(
					"we have problem to getting the list of product in this category",
					error,
				);
			});
	}, [categoryId]);

	return (
		<div>
			<h1>Product component</h1>
			{products.map((product) => {})}
		</div>
	);
};

export default ProductList;
