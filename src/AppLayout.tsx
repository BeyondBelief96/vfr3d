import { Outlet } from 'react-router-dom';
import Footer from './ui/Footer';
import Header from './ui/Header';

const AppLayout: React.FC = () => {
  return (
    <div>
      <Header />

      <div>
        <main className="h-full ml-auto mr-auto">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AppLayout;
