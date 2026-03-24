import { useState } from "react";
import {
  Drawer,
  TextInput,
  Textarea,
  Button,
  Stack,
  Text,
  Title,
  Select,
  Group,
} from "@mantine/core";

import classes from "./CreateForm.module.css";
import axios from "axios";
import { BASE_URL } from "../../../service/api";

import {
  laptop,
  discoduro,
  MemoriaRam,
  monitor,
  mouse,
  packsPC,
  PC,
  penDrives,
  procesador,
  tarjetaGrafica,
  Teclado,
} from "../../assets";

export function CreateForm({ opened, close, onCreate }) {
  // Estado único para el formulario
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "IconBox",
    lastActivity: new Date().toISOString().split("T")[0],
  });

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación manual
    if (formData.name.length < 3) {
      setError("Name is too short");
      return;
    }

    console.log("Enviando datos controlados:", formData);
    axios
      .post(`${BASE_URL}/categories.json`, formData)
      .then((response) => {
        console.log(response);
        onCreate();
        setFormData({
          name: "",
          description: "",
          icon: "IconBox",
          lastActivity: new Date().toISOString().split("T")[0],
        });
      })
      .catch((err) => {
        ("failed to created", console.log(err));
      });
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      position="left"
      size="md"
      title={
        <Text fw={700} size="xl" className={classes.drawerTitle}>
          New Category
        </Text>
      }
      padding="xl"
      className={classes.drawer}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="lg">
          <TextInput
            label="Name"
            placeholder="E.g: Laptops"
            required
            size="md"
            value={formData.name}
            error={error}
            onChange={(event) => {
              setFormData({ ...formData, name: event.currentTarget.value });
              if (error) setError("");
            }}
          />

          <Textarea
            label="Description"
            placeholder="Describe brevemente los productos"
            minRows={3}
            size="md"
            value={formData.description}
            onChange={(event) =>
              setFormData({
                ...formData,
                description: event.currentTarget.value,
              })
            }
          />

          <Select
            label="Icon"
            placeholder="Selecciona un icono"
            data={[
              { value: laptop, label: "Laptop" },
              { value: discoduro, label: "Disco Duro" },
              { value: MemoriaRam, label: "Memoria RAM" },
              { value: monitor, label: "Monitor" },
              { value: mouse, label: "Mouse" },
              { value: packsPC, label: "Ordenadores" },
              { value: PC, label: "Torres" },
              { value: penDrives, label: "PenDrives" },
              { value: procesador, label: "Procesadores" },
              {
                value: tarjetaGrafica,
                label: "Tarjetas Graficas",
              },
              {
                value: Teclado,
                label: "Teclado",
              },
            ]}
            size="md"
            value={formData.icon}
            onChange={(value) =>
              setFormData({ ...formData, icon: value || "IconBox" })
            }
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="subtle" color="gray" onClick={close} size="md">
              Cancel
            </Button>
            <Button
              onClick={close}
              type="submit"
              className={classes.submitBtn}
              size="md"
            >
              Create category
            </Button>
          </Group>
        </Stack>
      </form>
    </Drawer>
  );
}
