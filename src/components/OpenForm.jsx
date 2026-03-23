import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CategorySidebar } from './CategorySidebar';

function OpenForm() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} color="blue.9" m="xl">
        + Add
      </Button>

      <CategorySidebar opened={opened} close={close} />
    </>
  );
}

export default OpenForm