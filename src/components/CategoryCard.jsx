import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { Link } from "react-router-dom"

const CategoryCard = (props) => {
  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder maw={300}>
        <Card.Section>
          <Link to={`/products/${props.categoryObj.id}`}>
          <Image
            src={props.categoryObj.icon}
            height={160}
            miw={300} 
            alt="Category Image"
          />
          </Link>
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{props.categoryObj.name}</Text>
          <Badge color="blue">{props.categoryObj.lastActivity}</Badge>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {props.categoryObj.description}
        </Text>
        <Group>
          <Button onClick={props.onEdit} color="blue" variant="filled" mt="md" radius="md" w="45%">
            Edit
          </Button>
          <Button
            onClick={() => props.onDelete(props.categoryObj.id)}
            color="red"
            variant="light"
            mt="md"
            radius="md"
            w="45%"
          >
            Delete
          </Button>
        </Group>
      </Card>
    </div>
  );
};

export default CategoryCard;
