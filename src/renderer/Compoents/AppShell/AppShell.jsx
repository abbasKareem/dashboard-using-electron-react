// import './appshell.scss';
import { useState } from 'react';

import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Grid,
  createStyles,
  Button,
  Group,
  Code,
} from '@mantine/core';
import LightAndDarkButton from '../LightDarkButton';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import MainRoutes from 'renderer/Routes';
import { useTranslation } from 'react-i18next';
import NavbarSimple from '../NavBarComponets';

import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../redux/features/auth/authSlice';
import { IconBellRinging } from '@tabler/icons';

// =========================================
const useStyles = createStyles((theme, _params) => ({
  HeaderTitle: {
    fontFamily: 'cursive',
    fontStyle: 'italic',
  },
  languageButton: {
    color: theme.colorScheme === 'dark' ? '#ffd43b' : '#228be6',
    border:
      theme.colorScheme === 'dark' ? '1px solid #ffd43b' : '1px solid  #228be6',
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    '&:hover': {
      boxShadow: `${theme.shadows.xl} !important`,
      border:
        theme.colorScheme === 'dark'
          ? '2px solid #ffd43b'
          : '2px solid  #228be6',
      transform: 'scale(1.05)',
    },
  },
  languageButtonWrapper: {
    marginRight: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '130px',
  },
  navbarComponent: {
    position: 'sticky',
    display: 'flex',
  },
  headerComponent: {
    width: '100%',

    marginTop: '5px',
    position: 'sticky',
  },
  DarkLightButton: {
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    '&:hover': {
      boxShadow: `${theme.shadows.xl} !important`,
      transform: 'scale(1.05)',
    },
  },
}));
// =========================================

const AppShellExample = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [t, i18n] = useTranslation();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const location = useLocation();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : '#F3F3F3',
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<NavbarSimple onLogout={onLogout} opened={opened} />}
      header={
        <Header className={classes.headerComponent} zIndex={20} height={70}>
          <div
            style={{
              paddingTop: '20px',
              paddingBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <MediaQuery largerThan="xl" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>
            <Text className={classes.HeaderTitle}>{t('header_title')}</Text>
            <div className={classes.languageButtonWrapper}>
              {i18n.language === 'ar' && (
                <Button
                  className={classes.languageButton}
                  variant="outline"
                  onClick={() => {
                    i18n.changeLanguage('en');
                  }}
                >
                  en
                </Button>
              )}

              {i18n.language === 'en' && (
                <Button
                  className={classes.languageButton}
                  variant="outline"
                  onClick={() => {
                    i18n.changeLanguage('ar');
                  }}
                >
                  ar
                </Button>
              )}

              <div className={classes.DarkLightButton}>
                <LightAndDarkButton />
              </div>
            </div>
          </div>
        </Header>
      }
    >
      <MainRoutes />
    </AppShell>
  );
};

export default AppShellExample;
