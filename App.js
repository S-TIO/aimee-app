import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DefaultTheme as NavigationTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  DefaultTheme as PaperTheme,
  Provider as PaperContainer,
  Colors,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ProvideAuth, useAuth } from './src/hooks/useAuth';
import AllClass from './src/pages/AllClass';
import AllSeminar from './src/pages/AllSeminar';
import AllSharing from './src/pages/AllSharing';
import Home from './src/pages/Home';
import Loading from './src/pages/Loading';
import Login from './src/pages/Login';
import Matchmaking from './src/pages/Matchmaking';
import Mentor from './src/pages/Mentor';
import PlayVideo from './src/pages/PlayVideo';
import Program from './src/pages/Program';
import Register from './src/pages/Register';
import Startup from './src/pages/Startup';

const firebaseConfig = {
  apiKey: 'AIzaSyBZFSmbHeYCYVGumA0RfMK0tPYVrxLaRjc',
  authDomain: 'aimee-f366c.firebaseapp.com',
  projectId: 'aimee-f366c',
  storageBucket: 'aimee-f366c.appspot.com',
  messagingSenderId: '745239689277',
  appId: '1:745239689277:web:1824c330f7bd90e8ea1254',
};
const firebaseApp = initializeApp(firebaseConfig);
initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const auth = useAuth();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      {!auth.initialized && <Stack.Screen name="Loading" component={Loading} />}

      {!auth.user && auth.initialized && (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}

      {auth.user && auth.initialized && (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Program" component={Program} />
          <Stack.Screen name="AllSeminar" component={AllSeminar} />
          <Stack.Screen name="AllSharing" component={AllSharing} />
          <Stack.Screen name="AllClass" component={AllClass} />
          <Stack.Screen name="Mentor" component={Mentor} />
          <Stack.Screen name="Startup" component={Startup} />
          <Stack.Screen name="Matchmaking" component={Matchmaking} />
          <Stack.Screen name="PlayVideo" component={PlayVideo} />
        </>
      )}
    </Stack.Navigator>
  );
};

const Bootstrap = (WrappedApp) => {
  return () => {
    const theme = {
      ...NavigationTheme,
      ...PaperTheme,
      colors: {
        ...NavigationTheme.colors,
        ...PaperTheme.colors,
        disabled: Colors.grey300,
      },
    };

    return (
      <GestureHandlerRootView style={styles.root}>
        <ProvideAuth>
          <SafeAreaProvider>
            <PaperContainer theme={theme}>
              <NavigationContainer theme={theme}>
                <WrappedApp />
                <StatusBar translucent />
              </NavigationContainer>
            </PaperContainer>
          </SafeAreaProvider>
        </ProvideAuth>
      </GestureHandlerRootView>
    );
  };
};

const App = () => {
  return <StackNavigation />;
};

export default Bootstrap(App);

const styles = StyleSheet.create({
  root: { flex: 1 },
});
