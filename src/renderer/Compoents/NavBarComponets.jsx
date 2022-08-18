import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createStyles,
  Navbar,
  Group,
  Code,
  Collapse,
  Button,
  ScrollArea,
  Box,
  Space,
} from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconChevronRight,
  IconBuildingFortress,
} from '@tabler/icons';
import { Link } from 'react-router-dom';

import { ArrowBarDown, ArrowDown, ArrowNarrowRight } from 'tabler-icons-react';
import { useSelector } from 'react-redux';
import { t } from 'i18next';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    theNavbar: {
      position: 'sticky',
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.lg,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      transition: 'box-shadow 200ms ease, transform 200ms ease',

      '&:hover': {
        boxShadow: `${theme.shadows.md} !important`,
        borderRadius: '30px',
        transform: 'scale(1.05)',
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      boxShadow: `${theme.shadows.md} !important`,
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.gray[9]
            : theme.colors.gray[3],

        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
          }).color,
        },
      },
    },
    colapse: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
    },

    items: {
      display: 'flex',
      flexDirection: 'column',
    },
    chevron: {
      transition: 'transform 200ms ease',
    },
  };
});

const data = [
  { link: '/cities', label: 'City', icon: IconBuildingFortress },
  { link: '/', label: 'Main', icon: IconBellRinging },
  { link: '/cards', label: 'Stocks', icon: IconReceipt2 },
  { link: '/tabs', label: 'Companies', icon: IconFingerprint },
  { link: '', label: 'Items', icon: IconKey },
  { link: '', label: 'Delegates', icon: IconDatabaseImport },
];

const NavbarSimple = ({ onLogout, opened }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [openedColsp, setOpenedColsp] = useState(false);
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');

  return (
    <Navbar
      hiddenBreakpoint="xl"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
      className={classes.theNavbar}
      p="md"
    >
      <Navbar.Section grow component={ScrollArea}>
        <Group className={classes.header} position="apart">
          <p>DR.Ahmed</p>
          <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
        </Group>

        {/* ==========City============= */}
        <Link
          className={cx(classes.link, {
            [classes.linkActive]: 'City' === active,
          })}
          to="/cities"
          onClick={(event) => {
            setActive('City');
          }}
        >
          <IconBuildingFortress className={classes.linkIcon} stroke={1.5} />
          <span>{t('city')}</span>
        </Link>
        {/* ===========City============ */}
        <Space mt="lg" />
        {/* ==========1============= */}
        <Link
          className={cx(classes.link, {
            [classes.linkActive]: 'Main' === active,
          })}
          to="/"
          onClick={(event) => {
            setActive('Main');
          }}
        >
          <IconBellRinging className={classes.linkIcon} stroke={1.5} />
          <span>{t('main')}</span>
        </Link>
        {/* ===========1============ */}
        <Space mt="lg" />

        {/* ============2=========== */}
        <Link
          className={cx(classes.link, {
            [classes.linkActive]: 'Stocks' === active,
          })}
          to="/cards"
          onClick={(event) => {
            setActive('Stocks');
          }}
        >
          <IconReceipt2 className={classes.linkIcon} stroke={1.5} />
          <span>{t('stock')}</span>
        </Link>
        {/* ===========2============ */}
        <Space mt="lg" />

        {/* ============3=========== */}
        <Link
          className={cx(classes.link, {
            [classes.linkActive]: 'Companies' === active,
          })}
          to="/companies"
          onClick={(event) => {
            setActive('Companies');
          }}
        >
          <IconFingerprint className={classes.linkIcon} stroke={1.5} />
          <span>{t('compaines')}</span>
        </Link>
        {/* ===========3============ */}
        <Space mt="lg" />

        {/* ============4=========== */}
        <Link
          className={cx(classes.link, {
            [classes.linkActive]: 'Items' === active,
          })}
          to="/wellcome"
          onClick={(event) => {
            setActive('Items');
          }}
        >
          <IconKey className={classes.linkIcon} stroke={1.5} />
          <span>{t('items')}</span>
        </Link>
        {/* ===========4============ */}
        <Space mt="lg" />

        {/* ============5=========== */}
        <Link
          className={cx(classes.link, {
            [classes.linkActive]: 'Delegates' === active,
          })}
          to="/wellcome"
          onClick={(event) => {
            setActive('Delegates');
          }}
        >
          <IconKey className={classes.linkIcon} stroke={1.5} />
          <span>{t('delegates')}</span>
        </Link>
        {/* ===========5============ */}
        <Space mt="lg" />

        {/* ============6=========== */}
        <div className={classes.colapse}>
          <div
            className={classes.link}
            onClick={(event) => {
              setActive('Test');
              setOpenedColsp((o) => !o);
            }}
          >
            <span style={{ marginRight: '50px' }}>Delegates</span>

            <IconChevronRight
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: openedColsp
                  ? `rotate(${cx.dir === 'rtl' ? -90 : 90}deg)`
                  : 'none',
              }}
            />
          </div>

          <Collapse
            in={openedColsp}
            animateOpacity="true"
            transitionDuration={300}
            transitionTimingFunction="linear"
          >
            <div className={classes.items}>
              <Link
                className={cx(classes.link, {
                  [classes.linkActive]: 'Ahmed' === active,
                })}
                to="/wellcome"
                onClick={(event) => {
                  setActive('Ahmed');
                }}
              >
                <IconKey className={classes.linkIcon} stroke={1.5} />
                <span>Ahmed</span>
              </Link>
              <Link
                className={cx(classes.link, {
                  [classes.linkActive]: 'Abbas' === active,
                })}
                to="/rigster"
                onClick={(event) => {
                  setActive('Abbas');
                }}
              >
                <IconKey className={classes.linkIcon} stroke={1.5} />
                <span>Abbas</span>
              </Link>
            </div>
          </Collapse>
        </div>
        {/* ===========6============ */}
      </Navbar.Section>

      {user && (
        <Navbar.Section className={classes.footer}>
          {user && (
            <p>
              Wellcome{' '}
              <span style={{ color: 'orange', fontWeight: 'bold' }}>
                {user.name}
              </span>
            </p>
          )}

          <a href="#" onClick={onLogout} className={classes.link}>
            <IconLogout stroke={1.5} />
            <span>Logout</span>
          </a>
        </Navbar.Section>
      )}
    </Navbar>
  );
};
export default NavbarSimple;
