import { Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../components/CategoryCard";

const HomePage = () => {
	const baseURL =
		"https://nexo-882cd-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

	const [categoriesArr, setCategoriesArr] = useState([]);

	useEffect(() => {
		axios
			.get(`${baseURL}`)
			.then((response) => {
				let infoObj = response.data;
				//Conver the Object to Array
				const arr = Object.keys(infoObj).map((id) => ({
					id,
					...infoObj[id],
				}));
				setCategoriesArr(arr);
			})
			.catch((error) => {
				console.log(
					"Ops! we have problem to getting the list of categories",
					error,
				);
			});
	}, []);

	return (
		<Flex
			mih={70}
			gap="xl"
			justify="center"
			align="flex-start"
			direction="row"
			wrap="wrap"
		>
			{categoriesArr.map((category) => {
				return <CategoryCard categoryObj={category} key={category.id} />;
			})}
		</Flex>
	);
};

export default HomePage;
