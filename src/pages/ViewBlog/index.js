import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from 'expo-status-bar';
import { useEffect } from 'react';
import { ScrollView, View, Image, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import SafeAreaView from '../../components/SafeAreaView';
import Container from '../../layout/Container';

const ViewBlog = ({ route, navigation }) => {
  const data = route.params.data;
  const { colors } = useTheme();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStatusBarBackgroundColor(colors.surface);
      setStatusBarStyle('dark');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Image source={{ uri: data.cover }} style={styles.image} />
        </View>
        <Container mt={16} mb={16}>
          <Text style={styles.title}>{data.title}</Text>

          <Text>{data.content}</Text>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewBlog;

const styles = StyleSheet.create({
  image: { height: 240, aspectRatio: 16 / 9 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
});
