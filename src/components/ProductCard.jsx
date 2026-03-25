import { IconPackage, IconTrash, IconEdit } from "@tabler/icons-react";
import { Link } from "react-router-dom"
import {
  Card,
  Text,
  Badge,
  Group,
  ActionIcon,
  Stack,
  Divider,
} from "@mantine/core";

function ProductCard({ product, deleteProduct }) {
  const getStockColor = (amount) => {
    if (amount < 5) return "red";
    if (amount < 15) return "orange";
    return "green";
  };

  return (
    <>
      <Card
        key={product.id}
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        miw={250}
        maw={300}
      >
        <Stack gap="xs">
          <Group justify="space-between">
            <IconPackage size={32} color="gray" stroke={1.5} />
            <Badge color={getStockColor(product.amount)} variant="light">
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
              <Link to={`/productsDetails/${product.id}`}>
              <ActionIcon variant="light" color="yellow" size="lg">
                <IconEdit size={18} />
              </ActionIcon>
              </Link>
              <ActionIcon
                onClick={() => deleteProduct(product.id)}
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
    </>
  );
}

export default ProductCard;
