import {
  createStyles,
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
  Box,
} from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons';
import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Group,
} from '@mantine/core';
import TableExample from './TableExample';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.sm,
    // backgroundColor: 'pink',
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const TabsExample = () => {
  const data = [
    {
      title: 'Revenue',
      value: '$13,456',
      diff: 34,
    },
    {
      title: 'Profit',
      value: '$4,145',
      diff: -13,
    },
    {
      title: 'Coupons usage',
      value: '745',
      diff: 18,
    },
  ];
  const { classes } = useStyles();
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <div>
            <Text
              color="dimmed"
              transform="uppercase"
              weight={700}
              size="xs"
              className={classes.label}
            >
              {stat.title}
            </Text>
            <Text weight={700} size="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color: stat.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            <DiffIcon size={28} stroke={1.5} />
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={stat.diff > 0 ? 'teal' : 'red'}
            weight={700}
          >
            {stat.diff}%
          </Text>{' '}
          {stat.diff > 0 ? 'increase' : 'decrease'} compared to last month
        </Text>
      </Paper>
    );
  });

  // ============================
  // ============================

  return (
    <div className={classes.root}>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {stats}
      </SimpleGrid>

      <Box
        sx={(theme) => ({
          marginTop: '70px',
        })}
      >
        <TableExample />
      </Box>
    </div>
  );
};

export default TabsExample;
