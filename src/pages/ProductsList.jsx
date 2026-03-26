import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Añadido Link
import { BASE_URL } from "../../service/api";
import { 
  Text, 
  Flex, 
  Loader, 
  Title, 
  Input, 
  Pagination, 
  Group, 
  Stack, 
  Divider, 
  Badge, 
  ActionIcon 
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react"; // Necesitas instalar @tabler/icons-react
import ProductCard from "../components/ProductCard";
import "./ProductsList.css";
import axios from "axios";
import ProductForm from "../components/ProductForms/ProductForm";

const ProductsList = () => {
  const { categoryId } = useParams();
  const [products, setproducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 10;

  // Lógica de filtrado y recorte por página
  const filteredArr = products.filter((element) => {
    return element.name.toLowerCase().includes(inputValue.toLowerCase());
  });

  const totalPages = Math.ceil(filteredArr.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const currentProducts = filteredArr.slice(startIndex, startIndex + itemsPerPage);

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

          const filteredByCategory = arr.filter(
            (item) => item.categoryId === categoryId,
          );

          const activeProducts = filteredByCategory.filter((element) => {
            return element.isDeleted === false;
          });

          setproducts(activeProducts);
        } else {
          setproducts([]);
        }
      })
      .catch((error) => console.error("Error al obtener productos:", error))
      .finally(() => setIsLoading(false));
  }

  function getCategoryInfo() {
    axios
      .get(`${BASE_URL}/categories/${categoryId}.json`)
      .then((res) => {
        if (res.data) setCategoryName(res.data.name);
      })
      .catch((err) => console.error("Error al obtener nombre de categoría", err));
  }

  useEffect(() => {
        if (activePage > totalPages && totalPages > 0) {
          setPage(totalPages);
        } else if (totalPages === 0) {
        
          setPage(1);
        }
      }, [filteredArr.length, totalPages, activePage]); 

  useEffect(() => {
    getData();
    getCategoryInfo();
  }, [categoryId]);

  const deleteProduct = (id) => {
    const dataProduct = { isDeleted: true };
    axios
      .patch(`${BASE_URL}/products/${id}.json`, dataProduct)
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.error("We can't delete the product", error);
      });
  };

  

  return (
    <>
      {!isLoading && <ProductForm onCreated={getData} categoryId={categoryId} />}

      <Flex 
        className="products-main-content" 
        direction="column" 
        style={{ minHeight: 'calc(100vh - 350px)' }}
        px="md" 
      >
        {/* --- TITULO DE LA CATEGORÍA --- */}
        <Stack gap="xs" mb="xl" mt="md">
          <Group justify="space-between" align="flex-end">
            <Stack gap={0}>
              <Group gap="xs" mb={4}>
                <ActionIcon 
                  component={Link} 
                  to="/" 
                  variant="subtle" 
                  color="gray" 
                  size="sm"
                >
                  <IconArrowLeft size={16} />
                </ActionIcon>
                <Text size="xs" c="dimmed" fw={700} tt="uppercase" lts={1}>
                  Category stock
                </Text>
              </Group>
              <Title order={1} fz={32} fw={900} c="blue.9">
                {categoryName || "Cargando..."}
              </Title>
            </Stack>

            <Badge variant="light" color="var(--mantine-color-blue-6)" size="lg" radius="sm">
              Total stock {filteredArr.length} 
            </Badge>
          </Group>
          <Divider variant="dotted" />
        </Stack>

        <div className="searchbar-container-products">
          <Input
            variant="filled"
            size="md"
            radius="md"
            placeholder="Search products..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setPage(1); 
            }}
            mb="xl" 
          />
        </div>

        {isLoading && (
          <Flex justify="center" mt="xl">
            <Loader size="lg" />
          </Flex>
        )}

        {!isLoading && products.length === 0 && (
          <Flex direction="column" align="center" mt="50px">
            <Title order={3}>No products found!</Title>
            <Text c="dimmed">There are no products in this category yet.</Text>
          </Flex>
        )}

        {!isLoading && products.length > 0 && (
          <>
            <Flex
              mih={70}
              gap="xl"
              justify="center"
              align="flex-start"
              direction="row"
              wrap="wrap"
              style={{ flex: 1 }} 
            >
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  deleteProduct={deleteProduct}
                />
              ))}
            </Flex>

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
    </>
  );
};

export default ProductsList;