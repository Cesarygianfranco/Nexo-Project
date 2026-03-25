import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../service/api";
import { Text, Flex, Loader, Title, Input } from "@mantine/core";
import ProductCard from "../components/ProductCard";
import "./ProductsList.css"


import axios from "axios";
import ProductForm from "../components/ProductForms/ProductForm";

const ProductsList = () => {
  const { categoryId } = useParams();
  const [products, setproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

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

          const secondFilter = filteredArr.filter((element) => {
            return element.isDeleted === false;
          });

          setproducts(secondFilter);
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
    getData();
  }, [categoryId]);

  const deleteProduct = (id) => {
    const dataProduct = { isDeleted: true }; // Se envía solo el cambio

    axios
      .patch(`${BASE_URL}/products/${id}.json`, dataProduct)
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.error("We can't delete the product", error);
      });
  };

  const filteredArr = products.filter((element) => {
		return element.name.toLowerCase().includes(inputValue.toLowerCase());
	});

  return (
    <>
    <div className="searchbar-container-products">
          <Input
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </div>
      {!isLoading && (
        <ProductForm onCreated={getData} categoryId={categoryId} />
      )}

      {/* Contenedor Principal con margen para respetar el Sidebar */}
      <div style={{ marginLeft: "340px", padding: "20px" }}>
        {isLoading && (
          <Flex justify="center" mt="xl">
            <Loader size="lg" />
          </Flex>
        )}

        {!isLoading && products.length === 0 && (
          <Flex direction="column" align="center" mt="100px">
            <Title order={3}>No products found!</Title>
            <Text c="dimmed">There are no products in this category yet.</Text>
          </Flex>
        )}

        {!isLoading && products.length > 0 && (
          <Flex
            mih={70}
            gap="xl"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            {filteredArr.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                deleteProduct={deleteProduct}
              />
            ))}
          </Flex>
        )}
      </div>
    </>
  );
};

export default ProductsList;
