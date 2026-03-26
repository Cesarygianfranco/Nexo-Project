import { 
  UnstyledButton, 
  Text, 
  Group, 
  useMantineColorScheme, 
  useComputedColorScheme, 
  Box 
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const isDark = computedColorScheme === 'dark';

  return (
    <Group justify="center" py="md">
      <UnstyledButton
        onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
        style={{
          width: 74,
          height: 38,
          borderRadius: 30,
          padding: 4,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          transition: 'background-color 0.4s ease',
          backgroundColor: isDark 
            ? 'var(--mantine-color-dark-6)' 
            : 'var(--mantine-color-gray-1)',
          border: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
          cursor: 'pointer'
        }}
      >
        <Box
          style={{
            width: 30,
            height: 30,
            borderRadius: 30,
            backgroundColor: isDark ? 'var(--mantine-color-yellow-4)' : 'var(--mantine-color-blue-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
            transform: isDark ? 'translateX(34px)' : 'translateX(0)',
            boxShadow: 'var(--mantine-shadow-sm)',
            zIndex: 2,
          }}
        >
          {isDark ? (
            <IconSun size={18} stroke={2.5} color="var(--mantine-color-black)" />
          ) : (
            <IconMoon size={18} stroke={2.5} color="white" />
          )}
        </Box>

        <IconMoon 
          size={16} 
          stroke={1.5} 
          style={{ 
            position: 'absolute', 
            left: 10, 
            opacity: isDark ? 0.3 : 0,
            transition: 'opacity 0.3s'
          }} 
        />
        <IconSun 
          size={16} 
          stroke={1.5} 
          style={{ 
            position: 'absolute', 
            right: 10, 
            opacity: isDark ? 0 : 0.3,
            transition: 'opacity 0.3s'
          }} 
        />
      </UnstyledButton>
    </Group>
  );
}