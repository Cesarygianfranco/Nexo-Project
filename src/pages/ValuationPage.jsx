import { useState, useEffect } from "react";
import { BASE_URL } from "../../service/api";
import { 
  Container, 
  Paper, 
  Table, 
  Title, 
  Text, 
  Group, 
  Stack, 
  Divider, 
  Loader, 
  Center,
  Badge
} from "@mantine/core";
import { IconCalculator, IconReceipt2 } from "@tabler/icons-react";
import axios from "axios";
import "./ValuationPage.css";
import { Link } from "react-router-dom";

const ValuationPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   // eslint-disable-next-line react-hooks/exhaustive-deps
  setLoading(true);

  Promise.all([
    axios.get(`${BASE_URL}/categories.json`),
    axios.get(`${BASE_URL}/products.json`)
  ])
  .then(([categoriesRes, productsRes]) => { 
    
    const categoriesData = categoriesRes.data 
      ? Object.keys(categoriesRes.data).map(id => ({ id, ...categoriesRes.data[id] })) 
      : [];
    
    const productsData = productsRes.data 
      ? Object.keys(productsRes.data).map(id => ({ id, ...productsRes.data[id] })) 
      : [];

    setCategories(categoriesData);
    setProducts(productsData.filter(product => !product.isDeleted));
  })
  .catch((error) => {
    console.error("Error loading valuation data:", error);
  })
  .finally(() => {
    setLoading(false);
  });
}, []);

  // Total de una categoría
  const getCategoryTotal = (categoryId) => {
    return products
      .filter(product => product.categoryId === categoryId)
      .reduce((acc, product) => acc + (product.amount * product.value), 0);
  };

  // Cálculo del gran total de todo el inventario
  const grandTotal = products.reduce((acc, product) => acc + (product.amount * product.value), 0);

  if (loading) return <Center h="80vh"><Loader size="xl" color="blue" /></Center>;

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-end">
          <Stack gap={5}>
            <Group gap="xs">
              <IconReceipt2 size={32} color="#228be6" />
              <Title order={1}>Inventory Valuation</Title>
            </Group>
            <Text c="dimmed">Financial report grouped by category</Text>
          </Stack>
          <Badge size="xl" variant="outline" color="blue">
            {new Date().toLocaleDateString()}
          </Badge>
        </Group>

        <Divider size="sm" />

        {categories.map((category) => {
          const categoryProducts = products.filter(products => products.categoryId === category.id);
          const catTotal = getCategoryTotal(category.id);

          
          if (categoryProducts.length === 0) return null;

          return (
            <Paper
              key={category.id}
              withBorder
              shadow="sm"
              p="xl"
              radius="md"
              className="invoice-section"
            >
              <Title order={3} mb="md" c="blue" className="category-header">
                {category.name}
              </Title>

              <Table verticalSpacing="sm" highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Product Name</Table.Th>
                    <Table.Th ta="right">Stock</Table.Th>
                    <Table.Th ta="right">Price/Unit</Table.Th>
                    <Table.Th ta="right">Total Value</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {categoryProducts.map((products) => (
                    <Table.Tr key={products.id}>
                        <Table.Td fw={500}>
                          <Link
                            to={`/productsDetails/${products.id}`}
                            style={{
                              textDecoration: "none",
                              color: "var(--mantine-color-blue-6)",
                              fontWeight: 600,
                              transition: "color 0.2s ease",
                            }}
                            onMouseOver={(e) =>
                              (e.target.style.color =
                                "var(--mantine-color-orange-6)")
                            }
                            onMouseOut={(e) =>
                              (e.target.style.color =
                                "var(--mantine-color-blue-6)")
                            }
                          >
                            {products.name}
                          </Link>
                        </Table.Td>
                      <Table.Td ta="right">{products.amount}</Table.Td>
                      <Table.Td ta="right">
                        {products.value.toFixed(2)}€
                      </Table.Td>
                      <Table.Td ta="right" fw={600}>
                        {(products.amount * products.value).toFixed(2)}€
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>

              <Group justify="flex-end" mt="md">
                <Paper withBorder p="xs" bg="gray.0" radius="sm">
                  <Group gap="xl">
                    <Text size="sm" fw={700}>
                      CATEGORY TOTAL:
                    </Text>
                    <Text size="lg" fw={800} c="blue">
                      {catTotal.toFixed(2)}€
                    </Text>
                  </Group>
                </Paper>
              </Group>
            </Paper>
          );
        })}

        {/* Banner de Gran Total */}
        <Paper shadow="md" p="xl" radius="md" bg="blue.6" c="white" mt="xl" className="grand-total-banner">
          <Group justify="space-between">
            <Stack gap={0}>
              <Group gap="xs">
                <IconCalculator size={28} />
                <Title order={2}>Total Inventory Assets</Title>
              </Group>
              <Text opacity={0.8}>Calculated based on current stock levels</Text>
            </Stack>
            <Title order={1} size="42px">
              {grandTotal.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
            </Title>
          </Group>
        </Paper>
      </Stack>
    </Container>
  );
};

export default ValuationPage;