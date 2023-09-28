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
import { IntlProvider } from "react-intl-number-format";
import { ProvideAuth, useAuth } from './src/hooks/useAuth';
import AllClass from './src/pages/AllClass';
import AllSeminar from './src/pages/AllSeminar';
import AllSharing from './src/pages/AllSharing';
import AllBlogNews from './src/pages/AllBlogNews';
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
import AddTalent from './src/pages/AddTalent';
import MatchingPage from './src/pages/MatchingPage';
import EditProfile from './src/pages/EditProfile';
import StartupMatch from './src/pages/StartupMatch';
import StartupMatchDetails from './src/pages/StartupMatchDetails';
import UpdateDetail from './src/pages/UpdateStartupDetail';
import ChangePassword from './src/pages/ChangePassword';
import ForgotPassword from './src/pages/ForgotPassword';
import Profile from './src/pages/Profile';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AboutApp from './src/pages/AboutApp';
import Dashboard from './src/pages/DashboardTableau';

GoogleSignin.configure({
  webClientId:
    "361835717642-b6m0q4okrda0j9f6rt7il544fsasgkjf.apps.googleusercontent.com",
  androidClientId:
    "361835717642-dfdfguumrkt9p5341h93te9kek7d1a82.apps.googleusercontent.com",
  iosClientId:
    "361835717642-o5qjbprfu3o4kh9rpb6v6sljl9qdp3o8.apps.googleusercontent.com",
  expoClientId:
    "361835717642-7pjg9p993a6a90p3ub0gee6rhf44to2n.apps.googleusercontent.com",
});

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const auth = useAuth();

  return (
    <IntlProvider>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      {!auth.initialized && <Stack.Screen name="Loading" component={Loading} />}

      {!auth.user && auth.initialized && (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      )}

      {auth.user && auth.initialized && (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Program" component={Program} />
          <Stack.Screen name="AllSeminar" component={AllSeminar} />
          <Stack.Screen name="AllSharing" component={AllSharing} />
          <Stack.Screen name="AllClass" component={AllClass} />
          <Stack.Screen name="AllBlogNews" component={AllBlogNews} />
          <Stack.Screen name="Mentor" component={Mentor} />
          <Stack.Screen name="Matchmaking" component={Matchmaking} />
          <Stack.Screen name="Startup" component={Startup} />
          <Stack.Screen name="Mitra" component={Mitra} />
          <Stack.Screen name="PlayVideo" component={PlayVideo} />
          <Stack.Screen name="ViewBlog" component={ViewBlog} />
          <Stack.Screen name="AddStartup" component={AddStartup} />
          <Stack.Screen name="AddInvestor" component={AddInvestor} />
          <Stack.Screen name="AddTalent" component={AddTalent} />
          <Stack.Screen name="StartupDetails" component={StartupDetails} />
          <Stack.Screen name="MatchingPage" component={MatchingPage} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="StartupMatch" component={StartupMatch} />
          <Stack.Screen name="StartupMatchDetails" component={StartupMatchDetails} />
          <Stack.Screen name="UpdateDetail" component={UpdateDetail} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="AboutApp" component={AboutApp} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </>
      )}
    </Stack.Navigator>
    </IntlProvider>
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