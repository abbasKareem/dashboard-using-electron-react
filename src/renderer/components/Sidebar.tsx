import { Button, Container, createStyles, Drawer, Tabs } from '@mantine/core';

import { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, Group } from '@mantine/core';
import {
  Icon as TablerIcon,
  Home2,
  Gauge,
  DeviceDesktopAnalytics,
  Fingerprint,
  CalendarStats,
  User,
  Settings,
} from 'tabler-icons-react';

// import { MantineLogoSmall } from '../../shared/MantineLogo';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    opacity: 0.85,

    '&:hover': {
      opacity: 1,
      backgroundColor: theme.colors[theme.primaryColor][5],
    },
  },

  active: {
    opacity: 1,
    '&, &:hover': {
      backgroundColor: theme.colors[theme.primaryColor][7],
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: Home2, label: 'Home', to: '/' },
  { icon: Gauge, label: 'Login', to: '/login' },
  { icon: DeviceDesktopAnalytics, label: 'Charts', to: '/charts' },
  { icon: CalendarStats, label: 'Table', to: '/table' },
  { icon: User, label: 'Account', to: '/' },
  { icon: Fingerprint, label: 'Security', to: '/' },
  { icon: Settings, label: 'Settings', to: '/' },
];

const useNavbarStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: '#81CACF',
    // height: '700px',
  },
}));

const Sidebar = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const { classes } = useNavbarStyles();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        navigate(link.to);
      }}
    />
  ));

  return (
    <Navbar width={{ base: 80 }} p="md" className={classes.navbar}>
      <Center>
        <p>Drug</p>
      </Center>
      <Navbar.Section grow mt={50}>
        <Group direction="column" align="center" spacing={0}>
          {links}
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        {/* <Group direction="column" align="center" spacing={0}>
          <NavbarLink icon={SwitchHorizontal} label="Change account" />
          <NavbarLink icon={Logout} label="Logout" />
        </Group> */}
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
