import { ActionIcon, useMantineColorScheme, useComputedColorScheme, Group } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react'; // Necesitas instalar @tabler/icons-react

export function ColorSchemeToggle() {
    const { setColorScheme } = useMantineColorScheme();

    // Este hook combina la preferencia del sistema con el estado actual
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <Group justify="center">
            <ActionIcon
                onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                variant="default"
                size="lg"
                aria-label="Toggle color scheme"
            >
                {/* Mostramos el sol si estamos en dark, y la luna si estamos en light */}
                {computedColorScheme === 'light' ? (
                    <IconMoon stroke={1.5} color="var(--mantine-color-blue-6)" />
                ) : (
                    <IconSun stroke={1.5} color="var(--mantine-color-yellow-4)" />
                )}
            </ActionIcon>
        </Group>
    );
}