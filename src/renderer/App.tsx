import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Paper,
} from '@mantine/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import AppShellExample from './Compoents/AppShell/AppShell';
import { useSelector } from 'react-redux';
import Stocks from './pages/Stocks';

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme, fontFamily: 'Nunito, Roboto, sans-serif' }}
        >
          {/* <Paper>{user ? <AppShellExample /> : <Wellcome />}</Paper> */}
          <Paper>
            <AppShellExample />
          </Paper>
        </MantineProvider>
      </ColorSchemeProvider>
      <ToastContainer />
    </>
  );
};

export default App;

// return (
//   <>
//     <MantineProvider theme={{ colorScheme }}>
//       <ColorSchemeProvider
//         colorScheme={colorScheme}
//         toggleColorScheme={toggleColorScheme}
//       >
//         <AppShell
//           styles={{
//             main: {
//               background:
//                 theme.colorScheme === 'dark'
//                   ? theme.colors.dark[8]
//                   : theme.colors.gray[0],
//             },
//           }}
//           navbarOffsetBreakpoint="sm"
//           asideOffsetBreakpoint="sm"
//           navbar={
//             <Navbar
//               p="xs"
//               hiddenBreakpoint="sm"
//               hidden={!opened}
//               width={{ sm: 200, lg: 300 }}
//             >
//               <Navbar.Section>
//                 <Text variant="gradient">Abbas App</Text>
//               </Navbar.Section>

//               <Navbar.Section grow mt="lg">
//                 <Button>Go about page</Button>
//                 <Text>Example 2</Text>
//                 <Text>Example 3</Text>
//                 <Text>Example 4</Text>
//                 <Text>Example 5</Text>
//               </Navbar.Section>
//             </Navbar>
//           }
//           header={
//             <Header zIndex={20} height={70}>
//               <div
//                 style={{
//                   paddingTop: '20px',
//                   paddingBottom: '20px',
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                 }}
//               >
//                 <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
//                   <Burger
//                     opened={opened}
//                     onClick={() => setOpened((o) => !o)}
//                     size="sm"
//                     mr="xl"
//                   />
//                 </MediaQuery>
//                 <Text>Application header</Text>
//                 <div style={{ marginRight: '20px' }}>
//                   <LightAndDarkButton />
//                 </div>
//               </div>
//             </Header>
//           }
//         >
//           <Cards />
//           <TableExample />
//         </AppShell>
//       </ColorSchemeProvider>
//     </MantineProvider>
//   </>
// );
