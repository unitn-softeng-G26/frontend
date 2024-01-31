import { useRouter } from 'next/router';
import HomePage from './HomePage/page';

const AppRouter: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/HomePage');
  };

  return (
    <div>
      <HomePage />
      {/* Aggiungi altre rotte se necessario */}
    </div>
  );
};

export default AppRouter;