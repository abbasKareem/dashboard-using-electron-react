import { Outlet } from 'react-router-dom';

const InnerContent = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default InnerContent;
