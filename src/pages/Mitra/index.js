import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from 'expo-status-bar';
import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme, TextInput, Appbar } from 'react-native-paper';

import MITRA from '../../_DATA/mitra.json';
import Container from '../../layout/Container';
import MitraList from '../../views/Mitra/MitraList';

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

const Mitra = ({ navigation }) => {
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
        <Appbar.Content title="Mitra" />
      </Appbar.Header>

      <ScrollView
        style={{ backgroundColor: colors.surface }}
        contentContainerStyle={styles.scrolViewContent}
      >
        <Search />
        <MitraList mitras={MITRA} />
      </ScrollView>
    </>
  );
};

export default Mitra;

const styles = StyleSheet.create({
  searchIcon: { top: 2 },
  scrolViewContent: { paddingBottom: 16 },
});
