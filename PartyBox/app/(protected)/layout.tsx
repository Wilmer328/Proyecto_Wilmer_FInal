import { Redirect } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { ReactNode } from 'react';

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return children;
};

export default ProtectedLayout;