import { useState } from "react";
import {
  TextInput,
  NumberInput,
  Textarea,
  Button,
  Stack,
  Title,
  Paper,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { BASE_URL } from "../../../service/api";
import "./ProductForm.css";

const ProductForm = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: 0,
    value: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      ...formData,
      // Forzamos la conversión aquí
      amount: Number(formData.amount) || 0,
      value: Number(formData.value) || 0,
      categoryId: props.categoryId,
      isDeleted: false,
    };

    axios
      .post(`${BASE_URL}/products.json`, newProduct)
      .then((response) => {
        console.log("Product created:", response.data);
        // Limpiar el formulario
        setFormData({ name: "", description: "", amount: 0, value: 0 });
        props.onCreated();
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  return (
    <Paper shadow="md" p="xl" withBorder className="product-form-container">
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Title order={4} c="blue">
            Add New Product
          </Title>

          <TextInput
            label="Product Name"
            placeholder="E.g. Mechanical Keyboard"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Textarea
            label="Description"
            placeholder="Technical specs..."
            minRows={2}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <NumberInput
            label="Amount (Stock)"
            placeholder="0"
            min={0}
            required
            value={formData.amount}
            onChange={(val) => setFormData({ ...formData, amount: val })}
          />

          <NumberInput
            label="Value (Price per unit)"
            placeholder="0.00"
            decimalScale={2}
            fixedDecimalScale
            prefix="€"
            min={0}
            required
            value={formData.value}
            onChange={(val) => setFormData({ ...formData, value: val })}
          />

          <Button
            type="submit"
            leftSection={<IconPlus size={18} />}
            fullWidth
            mt="md"
          >
            Create Product
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default ProductForm;