import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <div>Main Layout</div>
      <Link to='/vitamins'>비타민 리스트</Link>
      <Link to='/vitamins/id'>비타민 상세</Link>
      <Outlet />
    </>
  );
}

export default MainLayout;