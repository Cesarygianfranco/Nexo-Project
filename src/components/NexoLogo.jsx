import { Group, Box, Text } from '@mantine/core';

const NexoLogo = () => (
  <Group gap={8} wrap="nowrap" align="center">
    
    <Box
      style={{
        backgroundColor: 'var(--logobg)',
        color: 'var(--mantine-color-blue-9)',
        borderRadius: 'var(--mantine-radius-sm)',
        width: 34,
        height: 34,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 900,
        fontSize: 22,
        fontFamily: 'Greycliff CF, var(--mantine-font-family)', 
      }}
    >
      N
    </Box>

   
    <Text
      size="xl"
      fw={700}
      style={{ 
        color: 'var(--mantine-color-white)',
        letterSpacing: '-0.5px',
        lineHeight: 1 
      }}
    >
      Nexo
    </Text>
  </Group>
);

export default NexoLogo;