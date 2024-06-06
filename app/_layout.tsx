import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { NativeWindStyleSheet } from "nativewind";
import { Redirect, Stack, router } from 'expo-router';
import { Avatar, IconButton } from '@react-native-material/core';
import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import { ThemedText } from '@/components/ThemedText';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { MView } from '@/components/MView';
import { MenuProvider } from 'react-native-popup-menu';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Config from '@/constants/Config';
import ToastManager from 'toastify-react-native';
import { getAuth } from '@firebase/auth';
NativeWindStyleSheet.setOutput({
  default: "native",
});
const queryClient = new QueryClient()

// Initialize Firebase
const app = initializeApp(Config.firebaseConfig);
// const analytics = getAnalytics(app);


const RootLayout = () => {

  useEffect(() => {
    if (getAuth().currentUser) {
    } else {
      router.replace('login')
    }
    return () => {
    }
  }, [])

  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const darkTheme = DarkTheme;
  darkTheme.colors.background = '#17181C'
  darkTheme.colors.text = '#fff'
  const size = useWindowDimensions()

  return (
    <MenuProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? darkTheme : DefaultTheme}>
          <ToastManager width={size.width / 2} height={60} animationStyle={'rightInOut'} textStyle={{
            fontSize: 18
          }} />
          <Stack initialRouteName='login' screenOptions={{
            headerTitleStyle: {
              fontSize: 24
            },
            animation: 'slide_from_bottom',
            header: () =>
              <SafeAreaView className='bg-primary sticky' >
                <MView className="py-3 px-3 flex-row justify-between items-center">
                  <View className='flex-row'>
                    <View className=''>
                      <Avatar image={require('@/assets/images/react-logo.png')} />
                    </View>
                    <View className='px-3'>
                      <ThemedText className='text-gray-500'>Good Morning</ThemedText>
                      <ThemedText type='title'>Thang Van</ThemedText>
                    </View>
                  </View>
                  <IconButton icon={() => (
                    <Ionicons name='search' size={24} color={colorScheme === 'dark' ? '#ffffff80' : '#00000080'} />
                  )} />
                </MView>

              </SafeAreaView>
            ,
          }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='login' initialParams={{ app: app }} options={{
              headerShown: false
            }} />
            <Stack.Screen name='details' options={{
              headerShown: false
            }} />

            <Stack.Screen name='read' options={{
              headerShown: false
            }} />
          </Stack>
        </ThemeProvider >
      </QueryClientProvider>
    </MenuProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})