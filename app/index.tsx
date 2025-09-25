import React from 'react';
import { View } from 'react-native';
import { useUserContext } from '@/contexts/UserContext';
import AuthScreen from '@/components/auth/AuthScreen';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/(tabs)/home');
    }
  }, [user]);

  if (user) {
    return <View />; // Will redirect via useEffect
  }

  return <AuthScreen />;
}