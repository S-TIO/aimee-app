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

import { ProvideAuth, useAuth } from './src/hooks/useAuth';
import AllClass from './src/pages/AllClass';
import AllSeminar from './src/pages/AllSeminar';
import AllSharing from './src/pages/AllSharing';
import Home from './src/pages/Home';
import Loading from './src/pages/Loading';
import Login from './src/pages/Login';
import Mitra from './src/pages/Mitra';
import Mentor from './src/pages/Mentor';
import PlayVideo from './src/pages/PlayVideo';
import Program from './src/pages/Program';
import Register from './src/pages/Register';
import Startup from './src/pages/Startup';
import ViewBlog from './src/pages/ViewBlog';
import Matchmaking from './src/pages/Matchmaking';
import AddStartup from './src/pages/AddStartup';
import StartupDetails from './src/pages/StartupDetails';
import AddInvestor from './src/pages/AddInvestor';
import MatchingPage from './src/pages/MatchingPage';


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
          <Stack.Screen name="Matchmaking" component={Matchmaking} />
          <Stack.Screen name="Startup" component={Startup} />
          <Stack.Screen name="Mitra" component={Mitra} />
          <Stack.Screen name="PlayVideo" component={PlayVideo} />
          <Stack.Screen name="ViewBlog" component={ViewBlog} />
          <Stack.Screen name="AddStartup" component={AddStartup} />
          <Stack.Screen name="AddInvestor" component={AddInvestor} />
          <Stack.Screen name="StartupDetails" component={StartupDetails} />
          <Stack.Screen name="MatchingPage" component={MatchingPage} />
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
        primary: Colors.green600,
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

//android: 995200027728-dvp6h2jt4gj16h125pc6pu33h9jeune5.apps.googleusercontent.com
//ios :995200027728-33eugnud3h46tkollufarmfn66idso3s.apps.googleusercontent.com