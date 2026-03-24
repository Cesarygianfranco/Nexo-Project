import { Flex, Loader, Title, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../components/CategoryCard";
import { BASE_URL } from "../../service/api";
import FormButton from '../components/FormButton';

const HomePage = () => {
    const [categoriesArr, setCategoriesArr] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

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
        axios.delete(`${BASE_URL}/categories/${categoryId}.json`)
            .then(() => {
                getData(); 
            })
            .catch(err => {
                console.error("Error al eliminar:", err);
            });
    }

    useEffect(() => {
		getData()
	}, []);

    return (
		<>
       
            <FormButton onCreate={getData} />

            
            {isLoading && (
                <Flex justify="center" mt="xl">
                    <Loader size="lg" />
                </Flex>
            )}

            
            {!isLoading && categoriesArr.length === 0 && (
                <Flex direction="column" align="center" mt="xl">
                    <Title order={3}>¡No hay categorías aún!</Title>
                    <Text c="dimmed">Haz clic en el botón superior para crear tu primera categoría.</Text>
                </Flex>
            )}

           
            {!isLoading && categoriesArr.length > 0 && (
                <Flex
                    mih={70}
                    gap="xl"
                    justify="center"
                    align="flex-start"
                    direction="row"
                    wrap="wrap"
                    mt="xl"
                >
                    {categoriesArr.map((category) => (
                        <CategoryCard 
                            onDelete={() => deleteCategory(category.id)} 
                            categoryObj={category} 
                            key={category.id} 
                        />
                    ))}
                </Flex>
            )}
        
		</>
    );
};

export default HomePage;