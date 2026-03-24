import { useState, useEffect } from 'react';
import { Drawer, TextInput, Textarea, Button, Stack, Text, Select, Group } from '@mantine/core';
import classes from './CategorySidebar.module.css';
import axios from 'axios';
import { BASE_URL } from '../../service/api';


export function EditForm({ opened, close, onEdit, categoryData }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'IconBox',
  });

  const [error, setError] = useState('');


  useEffect(() => {
    if (categoryData) {
      setFormData({
        name: categoryData.name || '',
        description: categoryData.description || '',
        icon: categoryData.icon || 'IconBox',
      });
    }
  }, [categoryData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.name.length < 3) {
      setError('Name is too short');
      return;
    }

    const updatedCategory = {
      ...formData,
      lastActivity: new Date().toISOString(),
    };

    axios.patch(`${BASE_URL}/categories/${categoryData.id}.json`, updatedCategory)
      .then(() => {
        onEdit(); // Refrescar lista en la HomePage
        close();  // Cerrar el Drawer
      })
      .catch(err => {
        console.error("Error al editar:", err);
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
          Edit Category
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
              if (error) setError('');
            }}
          />

          <Textarea
            label="Description"
            placeholder="Describe brevemente los productos"
            minRows={3}
            size="md"
            value={formData.description}
            onChange={(event) =>
              setFormData({ ...formData, description: event.currentTarget.value })
            }
          />

          <Select
            label="Icon"
            placeholder="Selecciona un icono"
            data={[
              { value: 'IconDeviceLaptop', label: 'Laptop' },
              { value: 'IconDeviceMobile', label: 'Móvil' },
              { value: 'IconTools', label: 'Herramientas' },
              { value: 'IconBox', label: 'General' },
            ]}
            size="md"
            value={formData.icon}
            onChange={(value) => setFormData({ ...formData, icon: value || 'IconBox' })}
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="subtle" color="gray" onClick={close} size="md">
              Cancel
            </Button>
            <Button type="submit" className={classes.submitBtn} size="md" color="yellow">
              Save Changes
            </Button>
          </Group>
        </Stack>
      </form>
    </Drawer>
  );
}