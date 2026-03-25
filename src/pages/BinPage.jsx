import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../service/api";

import {
	Card,
	Text,
	Badge,
	Group,
	ActionIcon,
	Stack,
	Divider,
	Flex,
	Loader,
	Title,
} from "@mantine/core";
import { IconPackage, IconTrash, IconEdit } from "@tabler/icons-react";

function BinPage() {
	const [productDeleted, setProductDeleted] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getDataFromDB = () => {
		axios
			.get(`${BASE_URL}/products.json`)
			.then((response) => {
				const dataObj = response.data;

				//Convert Object in Array
				const dataArr = Object.keys(dataObj).map((id) => ({
					id,
					...dataObj[id],
				}));

				const filteredData = dataArr.filter((elmentData) => {
					return elmentData.isDeleted === true;
				});

				setProductDeleted(filteredData);
			})
			.catch((error) => {
				console.error("We have problem with request!", error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		getDataFromDB();
	}, []);

	const getStockColor = (amount) => {
		if (amount < 5) return "red";
		if (amount < 15) return "orange";
		return "green";
	};

	const deleteProduct = (id) => {
		const dataProduct = { isDeleted: true }; // Se envía solo el cambio

		axios
			.delete(`${BASE_URL}/products/${id}.json`, dataProduct)
			.then(() => {
				getDataFromDB();
			})
			.catch((error) => {
				console.error("We can't delete the product", error);
			});
	};

	return (
		<>
			{isLoading && (
				<Flex justify="center" mt="xl">
					<Loader size="lg" />
				</Flex>
			)}

			{!isLoading && productDeleted.length === 0 && (
				<>
					<Flex direction="column" align="center" mt="xl">
						<Title order={3}>No products found!</Title>
						<Text c="dimmed">Your Bin is empty!</Text>
					</Flex>
				</>
			)}

			{!isLoading && productDeleted.length > 0 && (
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
						{productDeleted.map((product) => (
							<Card
								key={product.id}
								shadow="sm"
								padding="lg"
								radius="md"
								withBorder
								miw={250}
							>
								<Stack gap="xs">
									<Group justify="space-between">
										<IconPackage size={32} color="gray" stroke={1.5} />
										<Badge
											color={getStockColor(product.amount)}
											variant="light"
										>
											{product.amount} pcs
										</Badge>
									</Group>

									<Stack gap={2} mt="sm">
										<Text fw={700} size="lg" lineClamp={1}>
											{product.name}
										</Text>
										<Text size="xs" c="dimmed" lineClamp={2} h={32}>
											{product.description || "No description"}
										</Text>
									</Stack>

									<Divider my="sm" variant="dashed" />

									<Group justify="space-between" align="flex-end">
										<Stack gap={0}>
											<Text size="xs" c="dimmed">
												Price
											</Text>
											<Text size="xl" fw={900} c="blue">
												{product.value}€
											</Text>
										</Stack>

										<Group gap={5}>
											<ActionIcon variant="light" color="yellow" size="lg">
												<IconEdit size={18} />
											</ActionIcon>
											<ActionIcon
												onClick={() => {
													deleteProduct(product.id);
												}}
												variant="light"
												color="red"
												size="lg"
											>
												<IconTrash size={18} />
											</ActionIcon>
										</Group>
									</Group>
								</Stack>
							</Card>
						))}
					</Flex>
				</>
			)}
		</>
	);
}

export default BinPage;
