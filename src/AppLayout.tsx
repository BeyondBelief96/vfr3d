import { Outlet, useLocation } from 'react-router-dom';
import Footer from './ui/Footer';
import Header from './ui/Header';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const hideFooterRoutes = ['/viewer'];

  // Check if the current route is in the hideFooterRoutes array
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div>
      <Header />
      <div>
        <main className="h-full ml-auto mr-auto">
          <Outlet />
        </main>
      </div>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default AppLayout;
