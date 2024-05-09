import { Outlet, useLocation } from 'react-router-dom';
import Footer from './ui/Footer';
import Header from './ui/Header';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isViewerPage = location.pathname === '/viewer';

  return (
    <div className={`${isViewerPage ? 'flex flex-col overflow-hidden h-screen' : ''}`}>
      <Header />
      <div>
        <main className="h-full ml-auto mr-auto">
          <Outlet />
        </main>
      </div>
      {!isViewerPage && <Footer />}
    </div>
  );
};

export default AppLayout;
