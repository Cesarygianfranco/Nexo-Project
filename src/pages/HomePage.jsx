import {
	Flex,
	Loader,
	Title,
	Text,
	Input,
	Modal,
	useModalsStack,
	Group,
	Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../components/CategoryCard";
import { BASE_URL } from "../../service/api";
import FormButton from "../components/CategoryForms/FormButton";
import "../components/SearchBar.css";
import { EditForm } from "../components/CategoryForms/EditForm";

const HomePage = () => {
	const [categoriesArr, setCategoriesArr] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [inputValue, setInputValue] = useState("");
	const [opened, { open, close }] = useDisclosure(false);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const stack = useModalsStack(["delete-page"]);

	function getData() {
		// eslint-disable-next-line react-hooks/exhaustive-deps
		setIsLoading(true);
		axios
			.get(`${BASE_URL}/categories.json`)
			.then((response) => {
				const infoObj = response.data;

				if (infoObj) {
					const arr = Object.keys(infoObj).map((id) => ({
						id,
						...infoObj[id],
					}));
					setCategoriesArr(arr);
				} else {
					setCategoriesArr([]);
				}
			})
			.catch((error) => {
				console.error("Error al obtener categorías:", error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	const openDeleteModal = (category) => {
		setSelectedCategory(category);
		stack.open("delete-page");
	};

	function deleteCategory(categoryId) {
		axios
			.get(`${BASE_URL}/products.json`)
			.then((response) => {
				const products = response.data;
				if (products) {
					const productsToDelete = Object.keys(products).filter(
						(key) => products[key].categoryId === categoryId,
					);

					const deletePromises = productsToDelete.map((prodId) =>
						axios.delete(`${BASE_URL}/products/${prodId}.json`),
					);

					return Promise.all(deletePromises);
				}
			})
			.then(() => {
				return axios.delete(`${BASE_URL}/categories/${categoryId}.json`);
			})
			.then(() => {
				getData();
				stack.closeAll();
			})
			.catch((err) => {
				console.error("Error en el borrado en cascada:", err);
			});
	}

	const handleEditClick = (category) => {
		setSelectedCategory(category);
		open();
	};

	useEffect(() => {
		getData();
	}, []);

	const filteredArr = categoriesArr.filter((element) => {
		return element.name.toLowerCase().includes(inputValue.toLowerCase());
	});

	return (
		<>
			<Modal {...stack.register("delete-page")} title="Delete this page?">
				Are you sure you want to delete this page? This action cannot be undone.
				<Group mt="lg" justify="flex-end">
					<Button onClick={stack.closeAll} variant="default">
						Cancel
					</Button>

					<Button
						onClick={() => {
							deleteCategory(selectedCategory);
							stack.closeAll();
						}}
						color="red"
					>
						Delete
					</Button>
				</Group>
			</Modal>

			<FormButton onCreate={getData} />
			<div className="searchbar-container">
				<Input
					variant="unstyled"
					size="md"
					radius="md"
					placeholder="Search"
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
				/>
			</div>
			{isLoading && (
				<Flex justify="center" mt="xl">
					<Loader size="lg" />
				</Flex>
			)}
			{!isLoading && categoriesArr.length === 0 && (
				<Flex direction="column" align="center" mt="xl">
					<Title order={3}>No categories yet!</Title>
					<Text c="dimmed">
						Click on the top left button to create a new category
					</Text>
				</Flex>
			)}
			{!isLoading && categoriesArr.length > 0 && (
				<>
					<Flex
						mih={70}
						gap="xl"
						justify="center"
						align="flex-start"
						direction="row"
						wrap="wrap"
						mt="xl"
					>
						{filteredArr.map((category) => (
							<CategoryCard
								onDelete={() => openDeleteModal(category.id)}
								onEdit={() => handleEditClick(category)}
								categoryObj={category}
								key={category.id}
							/>
						))}
					</Flex>

					<EditForm
						onEdit={getData}
						opened={opened}
						close={close}
						categoryData={selectedCategory}
					/>
				</>
			)}
		</>
	);
};

export default HomePage;
