import {
    setStatusBarBackgroundColor,
    setStatusBarStyle,
  } from 'expo-status-bar';
  import { useEffect } from 'react';
  import { ScrollView, View, Image, StyleSheet, Linking } from 'react-native';
  import { Appbar, Text, useTheme } from 'react-native-paper';
  
  import SafeAreaView from '../../components/SafeAreaView';
  import Container from '../../layout/Container';
import ImageSlider from '../../components/ImageSlider';
  
  const Dashboard = ({ navigation }) => {
    const { colors } = useTheme();
    const images = [
        'https://firebasestorage.googleapis.com/v0/b/aimee-6d10e.appspot.com/o/tableau%2FT1.png?alt=media&token=05b1461d-c684-407b-ae7b-f8dfe0730bd0',
        'https://firebasestorage.googleapis.com/v0/b/aimee-6d10e.appspot.com/o/tableau%2FT2.png?alt=media&token=533bb792-ba5d-4781-8f78-8668a46c67d2',
        'https://firebasestorage.googleapis.com/v0/b/aimee-6d10e.appspot.com/o/tableau%2FT3.png?alt=media&token=17ef6db5-a0cb-449a-bbe8-8f986462deab',
        'https://firebasestorage.googleapis.com/v0/b/aimee-6d10e.appspot.com/o/tableau%2FT4.png?alt=media&token=879761c8-b5a8-4aa9-a525-30172acd90ca',
      ]
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
        <Appbar.Content title="Dashboard Tableau" />
      </Appbar.Header>
        <ScrollView>
          <View>
            <ImageSlider images={images}/>
          </View>
          <Container mt={16} mb={16}>
            <Text style={styles.title}>Hello AIMEE Family</Text>
            <Text style={styles.content}>Tableau has many features and functions that can be used for a variety of purposes, including business intelligence. With an easy-to-understand display, anyone can easily visualize data. One of Tableau’s main strengths is its attractive and interactive visual options. Apart from that, Tableau also has a wide selection of moving graphs that other data visualization tools don’t have. Tableau can also combine various data sources such as big data, spreadsheets, cloud, and various other types of data. With so many features and uses it has, Tableau can help you process data more effectively and efficiently. Therefore AIMEE presents elegant interactive multimedia by utilizing the visualization tool Tableau as an innovative interactive medium.</Text>
            <Text style={styles.content}>To see other tableau visualizations, please visit <Text style={{ color: colors.primary, fontWeight: 'bold' }} onPress={() =>
            Linking.openURL('https://public.tableau.com/app/profile/muhamad.lutfi.huzaifah/viz/AIMEEV2/Dashboard1?publish=yes')}>Public Tableau</Text></Text>
          </Container>
        </ScrollView>
      </>
    );
  };
  
  export default Dashboard;
  
  const styles = StyleSheet.create({
    image: { height: 240, aspectRatio: 16 / 9 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    content: { textAlign: 'justify' },
  });
  