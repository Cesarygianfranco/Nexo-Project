import { useState, useEffect } from "react";
import {
	Drawer,
	TextInput,
	Textarea,
	Button,
	Stack,
	Text,
	Select,
	Group,
} from "@mantine/core";
import classes from "./CreateForm.module.css";
import axios from "axios";
import { BASE_URL } from "../../../service/api";
import laptop from "../../assets/laptop.jpg";
import discoduro from "../../assets/discoduro.jpg";
import memoriaRam from "../../assets/memoriaRam.jpg";
import monitor from "../../assets/monitor.jpg";
import mouse from "../../assets/mouse.jpg";
import packsPC from "../../assets/packsPC.jpg";
import pc from "../../assets/pc.jpg";
import penDrives from "../../assets/penDrives.jpg";
import procesador from "../../assets/procesador.jpg";
import tarjetaGrafica from "../../assets/tarjetaGrafica.jpg";
import teclado from "../../assets/teclado.jpg";

export function EditForm({ opened, close, onEdit, categoryData }) {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		icon: "IconBox",
		lastActivity: new Date().toISOString().split("T")[0],
	});

	const [error, setError] = useState("");

	useEffect(() => {
		if (categoryData) {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			setFormData({
				name: categoryData.name || "",
				description: categoryData.description || "",
				icon: categoryData.icon || "IconBox",
			});
		}
	}, [categoryData]);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (formData.name.length < 3) {
			setError("Name is too short");
			return;
		}

		const updatedCategory = {
			...formData,
			lastActivity: new Date().toISOString().split("T")[0],
		};

		axios
			.patch(`${BASE_URL}/categories/${categoryData.id}.json`, updatedCategory)
			.then(() => {
				onEdit(); // Refrescar lista en la HomePage
				close(); // Cerrar el Drawer
			})
			.catch((err) => {
				console.error("Error al editar:", err);
			});
	};

	return (
		<Drawer
			opened={opened}
			onClose={close}
			position="left"
			size="md"
			title={
				<Text fw={700} size="xl" className={classes.drawerTitle}>
					Edit Category
				</Text>
			}
			padding="xl"
			className={classes.drawer}
			overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
		>
			<form onSubmit={handleSubmit}>
				<Stack gap="lg">
					<TextInput
						label="Name"
						placeholder="E.g: Laptops"
						required
						size="md"
						value={formData.name}
						error={error}
						onChange={(event) => {
							setFormData({ ...formData, name: event.currentTarget.value });
							if (error) setError("");
						}}
					/>

					<Textarea
						label="Description"
						placeholder="Describe brevemente los productos"
						minRows={3}
						size="md"
						value={formData.description}
						onChange={(event) =>
							setFormData({
								...formData,
								description: event.currentTarget.value,
							})
						}
					/>

					<Select
						label="Icon"
						placeholder="Selecciona un icono"
						data={[
							{ value: laptop, label: "Laptop" },
							{ value: discoduro, label: "Disco Duro" },
							{ value: memoriaRam, label: "Memoria RAM" },
							{ value: monitor, label: "Monitor" },
							{ value: mouse, label: "Mouse" },
							{ value: packsPC, label: "Ordenadores" },
							{ value: pc, label: "Torres" },
							{ value: penDrives, label: "PenDrives" },
							{ value: procesador, label: "Procesadores" },
							{
								value: tarjetaGrafica,
								label: "Tarjetas Graficas",
							},
							{
								value: teclado,
								label: "Teclado",
							},
						]}
						size="md"
						value={formData.icon}
						onChange={(value) =>
							setFormData({ ...formData, icon: value || "IconBox" })
						}
					/>

					<Group justify="flex-end" mt="xl">
						<Button variant="subtle" color="gray" onClick={close} size="md">
							Cancel
						</Button>
						<Button
							type="submit"
							className={classes.submitBtn}
							size="md"
							color="yellow"
						>
							Save Changes
						</Button>
					</Group>
				</Stack>
			</form>
		</Drawer>
	);
}
