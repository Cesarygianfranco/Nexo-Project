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
  Center,
  Pagination, // Importamos Pagination
} from "@mantine/core";
import {
  IconPackage,
  IconTrash,
  IconRestore,
  IconSearch,
  IconRecycle,
} from "@tabler/icons-react";
import "./BinPage.css";

function BinPage() {
  const [productDeleted, setProductDeleted] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  // --- ESTADOS DE PAGINACIÓN ---
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 8;

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
    axios
      .patch(`${BASE_URL}/products/${id}.json`, { isDeleted: false })
      .then(() => getDataFromDB());
  };

  const hardDeleteProduct = (id) => {
    axios.delete(`${BASE_URL}/products/${id}.json`).then(() => getDataFromDB());
  };

  // --- LÓGICA DE FILTRADO Y PAGINACIÓN ---
  const filteredArr = productDeleted.filter((el) =>
    el.name.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredArr.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const currentItems = filteredArr.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container size="xl" py="xl">
      {/* Contenedor Flex para manejar el pegado inferior */}
      <Flex
        direction="column"
        style={{ minHeight: "calc(100vh - 200px)" }} // Ajusta según el alto de tu layout
      >
        {/* Header */}
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

        {/* Barra de búsqueda */}
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
            onChange={(e) => {
              setInputValue(e.target.value);
              setPage(1); // Reset a pág 1 al buscar
            }}
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
          <>
            {/* Contenedor de Cards con flex: 1 */}
            <Flex gap="xl" justify="center" wrap="wrap" style={{ flex: 1 }} align={"flex-start"}>
              {currentItems.map((product) => (
                <Card
                  key={product.id}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  miw={280}
                  maw={280}
                  style={{
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "var(--mantine-shadow-xl)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "var(--mantine-shadow-md)";
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

            {/* PAGINACIÓN */}
            {totalPages > 1 && (
              <Group justify="center" py="xl" mt="xl">
                <Pagination
                  total={totalPages}
                  value={activePage}
                  onChange={setPage}
                  color="blue"
                  radius="md"
                  withEdges
                />
              </Group>
            )}
          </>
        )}
      </Flex>
    </Container>
  );
}

export default BinPage;
