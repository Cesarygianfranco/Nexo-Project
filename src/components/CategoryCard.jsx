import {
	Card,
	Image,
	Text,
	Badge,
	ActionIcon,
	Group,
	Stack,
	Box,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconEdit, IconTrash } from "@tabler/icons-react";

const CategoryCard = ({ categoryObj, onEdit, onDelete }) => {
	const { id, name, description, icon, lastActivity } = categoryObj;

	return (
		<Card
			shadow="md"
			radius="lg"
			withBorder
			maw={350}
			style={{
				transition: "transform 0.2s ease, box-shadow 0.2s ease",
				cursor: "pointer",
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.transform = "translateY(-4px)";
				e.currentTarget.style.boxShadow = "var(--mantine-shadow-xl)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.transform = "translateY(0)";
				e.currentTarget.style.boxShadow = "var(--mantine-shadow-md)";
			}}
		>
			<Card.Section style={{ position: "relative" }}>
				<Link to={`/products/${id}`}>
					<Image
						src={icon}
						height={180}
						alt={name}
						fallbackSrc="https://placehold.co/600x400?text=Sin+Imagen"
					/>
				</Link>

				{lastActivity && (
					<Badge
						variant="filled"
						color="var(--mantine-color-blue-9)"
						size="sm"
						style={{
							position: "absolute",
							top: 12,
							left: 12,
							pointerEvents: "none",
						}}
					>
						{lastActivity}
					</Badge>
				)}

				<Group gap={8} style={{ position: "absolute", top: 12, right: 12 }}>
					<ActionIcon
						onClick={(e) => {
							e.preventDefault();
							onEdit();
						}}
						variant="white"
						color="yellow"
						size="lg"
						radius="md"
						shadow="sm"
					>
						<IconEdit size={18} />
					</ActionIcon>
					<ActionIcon
						onClick={(e) => {
							e.preventDefault();
							onDelete();
						}}
						variant="white"
						color="red"
						size="lg"
						radius="md"
						shadow="sm"
					>
						<IconTrash size={18} />
					</ActionIcon>
				</Group>
			</Card.Section>

			<Stack gap="xs" mt="md">
				<Group justify="space-between" align="center">
					<Text fw={800} size="xl" lh={1.2} style={{ flex: 1 }}>
						{name || "Categoría"}
					</Text>
					<Text size="xs" c="dimmed" fw={600}>
						#{id.toString().slice(-4)}
					</Text>
				</Group>

				<Text size="sm" c="dimmed" lh={1.5} lineClamp={2}>
					{description || "Sin descripción detallada disponible actualmente."}
				</Text>
			</Stack>
		</Card>
	);
};

export default CategoryCard;
