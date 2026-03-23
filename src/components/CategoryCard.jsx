import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

const CategoryCard = (props) => {
	return (
		<div>
			<Card shadow="sm" padding="lg" radius="md" withBorder maw={300}>
				<Card.Section>
					<Image
						src={props.categoryObj.icon}
						height={160}
						alt="Category Image"
					/>
				</Card.Section>

				<Group justify="space-between" mt="md" mb="xs">
					<Text fw={500}>{props.categoryObj.name}</Text>
					<Badge color="pink">{props.categoryObj.lastActivity}</Badge>
				</Group>

				<Text size="sm" c="dimmed">
					{props.categoryObj.description}
				</Text>
				<Group>
					<Button color="yellow" variant="outline" mt="md" radius="md" w="45%">
						Edit
					</Button>
					<Button color="red" variant="outline" mt="md" radius="md" w="45%">
						Delete
					</Button>
				</Group>
			</Card>
		</div>
	);
};

export default CategoryCard;
