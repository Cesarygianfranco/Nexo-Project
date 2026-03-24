import { Flex, Loader, Title, Text, Input } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../components/CategoryCard";
import { BASE_URL } from "../../service/api";
import FormButton from "../components/FormButton";
import "../components/SearchBar.css";
import { EditForm } from "../components/EditForm";

const HomePage = () => {
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  function getData() {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/categories.json`)
      .then((response) => {
        const infoObj = response.data;

        if (infoObj) {
          const arr = Object.keys(infoObj).map((id) => ({
            id,
            ...infoObj[id],
          }));
          setCategoriesArr(arr);
        } else {
          setCategoriesArr([]);
        }
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function deleteCategory(categoryId) {
    axios
      .delete(`${BASE_URL}/categories/${categoryId}.json`)
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.error("Error al eliminar:", err);
      });
  }

  const handleEditClick = (category) => {
    setSelectedCategory(category); // Guardar la categoría completa
    open(); // Abrir el modal (useDisclosure)
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredArr = categoriesArr.filter((element) => {
    return element.name.toLowerCase().includes(inputValue.toLowerCase());
  });

  return (
    <>
      <FormButton onCreate={getData} />
      <div className="searchbar-container">
        <Input
          variant="unstyled"
          size="md"
          radius="xl"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>

      {isLoading && (
        <Flex justify="center" mt="xl">
          <Loader size="lg" />
        </Flex>
      )}

      {!isLoading && categoriesArr.length === 0 && (
        <Flex direction="column" align="center" mt="xl">
          <Title order={3}>No categories yet!</Title>
          <Text c="dimmed">
            Click on the top left button to create a new category
          </Text>
        </Flex>
      )}

      {!isLoading && categoriesArr.length > 0 && (
        <>
          <Flex
            mih={70}
            gap="xl"
            justify="center"
            align="flex-start"
            direction="row"
            wrap="wrap"
            mt="xl"
          >
            {filteredArr.map((category) => (
              <CategoryCard
                onDelete={() => deleteCategory(category.id)}
                onEdit={() => handleEditClick(category)}
                categoryObj={category}
                key={category.id}
              />
            ))}
          </Flex>

          <EditForm
            onEdit={getData}
            opened={opened}
            close={close}
            categoryData={selectedCategory}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
