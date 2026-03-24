import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CategorySidebar } from "./CategorySidebar";
import { IconPlus } from "@tabler/icons-react";
import "./FormButton.css";

function FormButton(props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div className="add-button">
        <Button
          onClick={open}
          variant="subtle"
          color="blue.9"
          leftSection={<IconPlus size={18} />} 
        >
          Add Category
        </Button>

        <CategorySidebar
          onCreate={props.onCreate}
          opened={opened}
          close={close}
        />
      </div>
    </>
  );
}

export default FormButton;
