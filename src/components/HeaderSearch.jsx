import { IconSearch } from '@tabler/icons-react';
import { Autocomplete, Burger, Group, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NexoLogo from './NexoLogo'
import { Link } from 'react-router-dom'; 
import classes from './HeaderSearch.module.css';

const links = [
  { link: '/', label: 'Home' },
  { link: '/valuation', label: 'Valuation' },
  { link: '/bin', label: 'Bin' },
  { link: '/community', label: 'Community' },
];

function HeaderSearch() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      onClick={close} 
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="md"
            color='white'
            aria-label="Toggle navigation"
            className={classes.burgerCustom}
          />
          <NexoLogo />
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            visibleFrom="md"
          />
        </Group>
      </div>

      {/* Menú lateral para móviles */}
      <Drawer
        opened={opened}
        onClose={close}
        size="md"
        padding="md"
        title="Navegation"
        hiddenFrom="sm"
        zIndex={1000}
      >
        <Stack gap={10}>
          {items}
        </Stack>
      </Drawer>
    </header>
  );
}

export default HeaderSearch;