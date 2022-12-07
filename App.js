import {
  DefaultTheme as NavigationTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  DefaultTheme as PaperTheme,
  Provider as PaperContainer,
  Colors,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AllSeminar from './src/pages/AllSeminar';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Mentor from './src/pages/Mentor';
import PlayVideo from './src/pages/PlayVideo';
import Program from './src/pages/Program';
import Startup from './src/pages/Startup';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Program" component={Program} />
      <Stack.Screen name="AllSeminar" component={AllSeminar} />
      <Stack.Screen name="Mentor" component={Mentor} />
      <Stack.Screen name="Startup" component={Startup} />
      <Stack.Screen name="PlayVideo" component={PlayVideo} />
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
        <SafeAreaProvider>
          <PaperContainer theme={theme}>
            <NavigationContainer theme={theme}>
              <WrappedApp />
              <StatusBar translucent />
            </NavigationContainer>
          </PaperContainer>
        </SafeAreaProvider>
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
