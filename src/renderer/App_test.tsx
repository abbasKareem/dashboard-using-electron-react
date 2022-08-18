import { Grid } from '@mantine/core';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { MyHeader } from './components/Header';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import About from './pages/About';
import Login from './pages/Login';
import Charts from './pages/Charts';

import MyTable from './Table';

export default function App() {
  return (
    <>
      <Router>
        <div>
          <MyHeader />
        </div>
        <Grid gutter="xs">
          <Grid.Col span={1}>
            <Sidebar />
          </Grid.Col>
          <Grid.Col span={11}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/table" element={<MyTable />} />
            </Routes>
          </Grid.Col>
        </Grid>
      </Router>
    </>
  );
}
