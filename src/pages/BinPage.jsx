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
  Input,
  Container,
  Box,
  Paper,
  Center
} from "@mantine/core";
import { 
  IconPackage, 
  IconTrash, 
  IconRestore, 
  IconSearch, 
  IconRecycle, 
  IconAlertCircle 
} from "@tabler/icons-react";
import "./BinPage.css";

function BinPage() {
  const [productDeleted, setProductDeleted] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const getDataFromDB = () => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/products.json`)
      .then((response) => {
        const dataObj = response.data;
        if (dataObj) {
          const dataArr = Object.keys(dataObj).map((id) => ({
            id,
            ...dataObj[id],
          }));
          const filteredData = dataArr.filter((el) => el.isDeleted === true);
          setProductDeleted(filteredData);
        } else {
          setProductDeleted([]);
        }
      })
      .catch((err) => console.error("Error fetching bin:", err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getDataFromDB();
  }, []);

  const restoreProduct = (id) => {
    axios.patch(`${BASE_URL}/products/${id}.json`, { isDeleted: false })
      .then(() => getDataFromDB());
  };

  const hardDeleteProduct = (id) => {
    axios.delete(`${BASE_URL}/products/${id}.json`)
      .then(() => getDataFromDB());
  };

  const filteredArr = productDeleted.filter((el) =>
    el.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Container size="xl" py="xl">
      {/* Header idéntico al estilo de la app */}
      <Box mb="xl">
        <Group justify="space-between" align="center">
          <Stack gap={0}>
            <Group gap="sm">
              <IconRecycle size={32} color="var(--mantine-color-blue-6)" />
              <Title order={1}>Trash Bin</Title>
            </Group>
            <Text c="dimmed">Manage and restore your deleted products</Text>
          </Stack>

          {!isLoading && productDeleted.length > 0 && (
            <Badge size="lg" variant="light" color="blue">
              {productDeleted.length} items archived
            </Badge>
          )}
        </Group>
      </Box>

      {/* Barra de búsqueda consistente */}
      <div
        className="searchbar-container-products"
        style={{ marginBottom: "2rem" }}
      >
        <Input
          variant="filled"
          size="md"
          radius="md"
          placeholder="Search products in bin..."
          leftSection={<IconSearch size={18} />}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      {isLoading && (
        <Center mt="xl">
          <Loader size="lg" />
        </Center>
      )}

      {!isLoading && productDeleted.length === 0 && (
        <Flex direction="column" align="center" mt="50px">
          <Title order={3}>The bin is empty</Title>
          <Text c="dimmed">No products have been deleted yet.</Text>
        </Flex>
      )}

      {!isLoading && productDeleted.length > 0 && (
        <Flex gap="xl" justify="center" wrap="wrap">
          {filteredArr.map((product) => (
            <Card
              key={product.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              miw={280}
              className="bin-card-style"
			  style={{
				transition: "transform 0.2s ease, box-shadow 0.2s ease",
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
              <Stack gap="xs">
                <Group justify="space-between">
                  <IconPackage
                    size={32}
                    color="var(--mantine-color-gray-4)"
                    stroke={1.5}
                  />
                  <Badge color="gray" variant="light">
                    Archived
                  </Badge>
                </Group>

                <Stack gap={2} mt="sm">
                  <Text fw={700} size="lg" lineClamp={1}>
                    {product.name}
                  </Text>
                  <Text size="xs" c="dimmed" lineClamp={2} h={32}>
                    {product.description || "No description provided"}
                  </Text>
                </Stack>

                <Divider my="sm" variant="dashed" />

                <Group justify="space-between" align="flex-end">
                  <Stack gap={0}>
                    <Text size="xs" c="dimmed">
                      Original Price
                    </Text>
                    <Text size="xl" fw={900} c="blue">
                      {product.value}€
                    </Text>
                  </Stack>

                  <Group gap={8}>
                    <ActionIcon
                      variant="light"
                      color="green"
                      size="lg"
                      onClick={() => restoreProduct(product.id)}
                    >
                      <IconRestore size={20} />
                    </ActionIcon>

                    <ActionIcon
                      variant="light"
                      color="red"
                      size="lg"
                      onClick={() => hardDeleteProduct(product.id)}
                    >
                      <IconTrash size={20} />
                    </ActionIcon>
                  </Group>
                </Group>
              </Stack>
            </Card>
          ))}
        </Flex>
      )}
    </Container>
  );
}

export default BinPage;