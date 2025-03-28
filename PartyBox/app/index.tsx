import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/(protected)/home" />;
  }

  return <Redirect href="/login" />;
}