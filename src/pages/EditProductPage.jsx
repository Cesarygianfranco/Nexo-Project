import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../service/api";
import {
  TextInput,
  NumberInput,
  Textarea,
  Button,
  Stack,
  Title,
  Paper,
  Grid,
  Card,
  Text,
  Badge,
  Group,
  Divider,
  Loader,
  Center,
  ActionIcon,
} from "@mantine/core";
import {
  IconPackage,
  IconArrowLeft,
  IconDeviceFloppy,
} from "@tabler/icons-react";
import axios from "axios";

const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: 0,
    value: 0,
  });

  // 1. Obtener datos actuales del producto
  useEffect(() => {
    axios
      .get(`${BASE_URL}/products/${productId}.json`)
      .then((res) => {
        if (res.data) {
          setFormData(res.data);
        }
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [productId]);

  // 2. Lógica de Guardar (PATCH)
  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdating(true);

    // Creamos una copia limpia de los datos para enviar
    const updatedProduct = {
      ...formData,
      amount: Number(formData.amount) || 0, 
      value: Number(formData.value) || 0,   
    };

    axios
      .patch(`${BASE_URL}/products/${productId}.json`,updatedProduct)
      .then(() => {
        navigate(-1); // Volver atrás tras guardar
      })
      .catch((err) => console.error(err))
      .finally(() => setUpdating(false));
  };

  const getStockColor = (amount) => {
    if (amount < 5) return "red";
    if (amount < 15) return "orange";
    return "green";
  };

  if (loading)
    return (
      <Center h="80vh">
        <Loader size="xl" />
      </Center>
    );

  return (
    <Stack p="xl" maw={1000} mx="auto">
      <Group justify="space-between">
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => navigate(-1)}
          color="gray"
        >
          Back to list
        </Button>
        <Title order={2}>Edit Product</Title>
      </Group>

      <Grid gutter="xl">
        {/* LADO IZQUIERDO: FORMULARIO */}
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Paper shadow="sm" p="xl" withBorder radius="md">
            <form onSubmit={handleUpdate}>
              <Stack gap="md">
                <TextInput
                  label="Product Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Textarea
                  label="Description"
                  minRows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <Group grow>
                  <NumberInput
                    label="Stock Amount"
                    min={0}
                    value={formData.amount}
                    onChange={(val) =>
                      setFormData({ ...formData, amount: val })
                    }
                  />
                  <NumberInput
                    label="Value (€)"
                    min={0}
                    decimalScale={2}
                    value={formData.value}
                    onChange={(val) => setFormData({ ...formData, value: val })}
                  />
                </Group>
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  mt="md"
                  loading={updating}
                  leftSection={<IconDeviceFloppy size={20} />}
                >
                  Save Changes
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid.Col>

        {/* LADO DERECHO: PREVIEW MAXIMIZADA */}
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Stack gap="xs">
            <Text fw={600} size="sm" c="dimmed" ta="center">
              Live Preview
            </Text>

            {/* CARD MAXIMIZADA */}
            <Card shadow="lg" padding="xl" radius="lg" withBorder>
              <Stack gap="lg">
                <Group justify="space-between">
                  <div
                    style={{
                      backgroundColor: "#f8f9fa",
                      padding: "15px",
                      borderRadius: "12px",
                    }}
                  >
                    <IconPackage size={48} color="#228be6" stroke={1.5} />
                  </div>
                  <Stack align="flex-end" gap={4}>
                    <Badge
                      size="lg"
                      color={getStockColor(formData.amount)}
                      variant="filled"
                    >
                      {formData.amount} in stock
                    </Badge>
                    <Text size="xs" c="dimmed">
                      ID: {productId.slice(-6)}
                    </Text>
                  </Stack>
                </Group>

                <Stack gap={5}>
                  <Text fw={800} size="24px" lh={1.2}>
                    {formData.name || "Product Name"}
                  </Text>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    {formData.description ||
                      "Add a description to see it here..."}
                  </Text>
                </Stack>

                <Divider variant="dashed" />

                <Group justify="space-between">
                  <Stack gap={0}>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                      Price
                    </Text>
                    <Text size="32px" fw={900} c="blue">
                      {formData.value}€
                    </Text>
                  </Stack>

                  <Stack gap={0} align="flex-end">
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                      Total Valuation
                    </Text>
                    <Text size="xl" fw={700}>
                      {(formData.amount * formData.value).toFixed(2)}€
                    </Text>
                  </Stack>
                </Group>
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default EditProductPage;
