import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from 'expo-status-bar';
import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme, TextInput, Appbar } from 'react-native-paper';

import STARTUP from '../../_DATA/startup.json';
import Container from '../../layout/Container';
import StartupList from '../../views/Startup/StartupList';

const Search = () => {
  const { colors } = useTheme();
  return (
    <Container mt={8} mb={16}>
      <TextInput
        placeholder="Search activity..."
        left={
          <TextInput.Icon
            name="magnify"
            color={colors.disabled}
            rippleColor={colors.background}
            style={styles.searchIcon}
          />
        }
        mode="outlined"
        style={{ backgroundColor: colors.surface }}
      />
    </Container>
  );
};

const Startup = ({ navigation }) => {
  const { colors } = useTheme();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStatusBarBackgroundColor(colors.surface);
      setStatusBarStyle('dark');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: colors.surface,
        }}
      >
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Startup" />
      </Appbar.Header>

      <ScrollView style={{ backgroundColor: colors.surface }}>
        <Search />
        <StartupList startups={STARTUP} />
      </ScrollView>
    </>
  );
};

export default Startup;

const styles = StyleSheet.create({
  searchIcon: { top: 2 },
});
