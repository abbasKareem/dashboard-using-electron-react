import { Route, Routes } from 'react-router-dom';

import InnerContent from './InnerContent';
import Login from './pages/Login';
import Rigster from './pages/Rigster';

import AGGrid from './pages/AGGrid';
import Table from './pages/Table';

import Companies from './pages/Companies';
import Cities from './pages/Cities';
import WellcomePage from './pages/WellcomePage';
import Delegates from './pages/Delegates';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InnerContent />}>
        <Route index element={<WellcomePage />} />
        <Route path="cities" element={<Cities />} />
        <Route path="delegates" element={<Delegates />} />
        <Route path="cards" element={<AGGrid />} />
        <Route path="tabs" element={<Table />} />
        <Route path="login" element={<Login />} />
        <Route path="rigster" element={<Rigster />} />
      </Route>
      <Route path="/companies" element={<Companies />} />
    </Routes>
  );
};

export default MainRoutes;
