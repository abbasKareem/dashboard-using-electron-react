import { Route, Routes } from 'react-router-dom';

import InnerContent from './InnerContent';
import Login from './pages/Login';
import Rigster from './pages/Rigster';

import AGGrid from './pages/AGGrid';
import Table from './pages/Table';

import Fuckyou from './pages/Fuckyou';

import Companies from './pages/Companies';
import Wellcome from './pages/Wellcome';
import Cities from './pages/Cities';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InnerContent />}>
        <Route index element={<Fuckyou />} />
        <Route path="cities" element={<Cities />} />
        <Route path="cards" element={<AGGrid />} />
        <Route path="tabs" element={<Table />} />
        <Route path="login" element={<Login />} />
        <Route path="rigster" element={<Rigster />} />
        <Route path="wellcome" element={<Wellcome />} />
      </Route>
      <Route path="/companies" element={<Companies />} />
    </Routes>
  );
};

export default MainRoutes;
