import { Outlet } from 'react-router-dom';
import LeftBar from '../LeftBar/LeftBar';
import TopBar from '../TopBar/TopBar';

const Layout = () => (
  <div>
    <TopBar />
    <div style={{ display: 'flex' }}>
      <LeftBar />
      <div style={{ width: '100%' }}>
        <Outlet />
      </div>
    </div>
  </div>
);

export default Layout;
