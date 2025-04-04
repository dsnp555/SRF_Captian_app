import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
<<<<<<< HEAD

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
=======
import { AuthProvider } from '../context/auth';
import { SubscriptionProvider } from '../context/subscription';
import StripeProvider from '../components/StripeProvider';

export default function RootLayout() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <StripeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </StripeProvider>
      </SubscriptionProvider>
    </AuthProvider>
>>>>>>> 93ccba0 (Initial commit)
  );
}