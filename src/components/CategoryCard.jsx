import {
  Card,
  Image,
  Text,
  Badge,
  ActionIcon,
  Group,
  Stack,
  Button,
  Paper,
  Box,
} from "@mantine/core";
import { Link } from "react-router-dom";
import {
  IconEdit,
  IconTrash,
  IconArrowRight,
  IconCategory,
} from "@tabler/icons-react";

const CategoryCard = ({ categoryObj, onEdit, onDelete }) => {
  const { id, name, description, icon, lastActivity } = categoryObj;

  return (
    <Card
      shadow="sm"
      radius="xl"
      withBorder
      padding="xl"
      maw={350}
      miw={320}
      style={{
        transition: "all 0.3s ease",
        backgroundColor: "var(--mantine-color-body)",
        overflow: "visible",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "var(--mantine-shadow-xl)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--mantine-shadow-sm)";
      }}
    >
      <Box
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100px",
          height: "100px",
          background:
            "linear-gradient(135deg, var(--mantine-color-blue-light) 0%, transparent 100%)",
          borderRadius: "0 25% 0 25%",
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      <Group
        justify="space-between"
        align="start"
        wrap="nowrap"
        style={{ zIndex: 1 }}
      >
        <Paper
          radius="lg"
          withBorder
          shadow="sm"
          style={{
            width: 90,
            height: 90,
            minWidth: 90,
            overflow: "hidden",
            backgroundColor: "black",
            border: "3px solid var(--mantine-color-body)",
          }}
        >
          <Link to={`/products/${id}`}>
            <Image
              src={icon.startsWith("/") ? icon : `/images/laptop.jpg`} // Si no empieza por /, usa una por defecto
              alt={name}
              height={90}
              fit="cover"
              fallbackSrc="https://placehold.co/200x200?text=Error+Ruta"
              style={{ scale: 1.8 }}
            />
          </Link>
        </Paper>

        <Stack gap={5} align="flex-end">
          <Group gap={4}>
            <ActionIcon
              onClick={(e) => {
                e.preventDefault();
                onEdit();
              }}
              variant="light"
              color="yellow.8"
              radius="md"
              size="md"
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
              variant="light"
              color="red.8"
              radius="md"
              size="md"
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
          <Badge variant="outline" color="gray" size="xs" radius="sm">
            #{id.toString().slice(-4)}
          </Badge>
        </Stack>
      </Group>

      <Stack gap="xs" mt="xl" style={{ zIndex: 1 }}>
        <Group gap="xs">
          <IconCategory size={18} color="var(--mantine-color-blue-6)" />
          <Text fw={900} size="xl" lh={1} c="var(--mantine-color-text)">
            {name || "Categoría"}
          </Text>
        </Group>

        <Text size="sm" c="dimmed" lh={1.5} lineClamp={3} h={65}>
          {description ||
            "No description provided for this category. Click explore to see all related products."}
        </Text>
      </Stack>

      <Group justify="space-between" mt="xl" align="center">
        <Stack gap={0}>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase" lts={0.5}>
            Activity
          </Text>
          <Text size="xs" fw={600}>
            {lastActivity || "N/A"}
          </Text>
        </Stack>

        <Button
          component={Link}
          to={`/products/${id}`}
          variant="filled"
          color="blue"
          rightSection={<IconArrowRight size={16} />}
          radius="md"
          px="xl"
        >
          Explore
        </Button>
      </Group>
    </Card>
  );
};

export default CategoryCard;
