import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import axios from "axios";

const ProductsList = () => {
  const { categoryId } = useParams();
  const [products, setproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getData() {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/products.json`)
      .then((response) => {
        const infoObj = response.data;

        if (infoObj) {
          const arr = Object.keys(infoObj).map((id) => ({
            id,
            ...infoObj[id],
          }));

          const filteredArr = arr.filter(
            (item) => item.categoryId === categoryId,
          );
          setproducts(filteredArr);
        } else {
          setproducts([]);
        }
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
  }, [categoryId]);

  // Función para obtener el color basado en el stock de cada producto
  const getStockColor = (amount) => {
    if (amount < 5) return "red";
    if (amount < 15) return "orange";
    return "green";
  };

  return (
    <>
      {isLoading && (
        <Flex justify="center" mt="xl">
          <Loader size="lg" />
        </Flex>
      )}

      {!isLoading && products.length === 0 && (
        <Flex direction="column" align="center" mt="xl">
          <Title order={3}>No products found!</Title>
          <Text c="dimmed">There are no products in this category yet.</Text>
        </Flex>
      )}

      {!isLoading && products.length > 0 && (
        <Flex
          mih={70}
          gap="xl"
          justify="center"
          align="flex-start"
          direction="row"
          wrap="wrap"
          mt="xl"
        >
          {products.map((product) => (
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
                    <ActionIcon variant="light" color="yellow" size="lg">
                      <IconEdit size={18} />
                    </ActionIcon>
                    <ActionIcon variant="light" color="red" size="lg">
                      <IconTrash size={18} />
                    </ActionIcon>
                  </Group>
                </Group>
              </Stack>
            </Card>
          ))}
        </Flex>
      )}
    </>
  );
};

export default ProductsList;
