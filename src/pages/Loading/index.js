import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from 'expo-status-bar';
import { useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { useTheme } from 'react-native-paper';

const Loading = ({ navigation }) => {
  const { colors } = useTheme();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStatusBarBackgroundColor(colors.surface);
      setStatusBarStyle('dark');
    });

    return unsubscribe;
  }, [navigation]);

  return <Spinner visible />;
};

export default Loading;
