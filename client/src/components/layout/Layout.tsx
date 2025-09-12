
import { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { PageLoader } from '@/components/ui/page-loader';
import { useLoading } from '@/contexts/LoadingContext';
import { useNavigationLoader } from '@/hooks/useNavigationLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getMe } from '@/store/thunks/auth.thunk';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isLoading, loadingText } = useLoading();
  const {user} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  useNavigationLoader();

  useEffect(() => {
    if(!user) {
      dispatch(getMe())
    }
  },[user])

  return (
    <>
      <PageLoader isLoading={isLoading} text={loadingText} />
      <div className="flex flex-col min-h-screen w-full bg-white">
        <Header />
        <main className="flex-grow w-full">
          <div className="w-full">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
