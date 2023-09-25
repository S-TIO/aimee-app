import {
    setStatusBarBackgroundColor,
    setStatusBarStyle,
  } from 'expo-status-bar';
  import { useEffect, useState } from 'react';
  import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
    ToastAndroid,
  } from 'react-native';
  import { ScrollView } from 'react-native-gesture-handler';
  import Spinner from 'react-native-loading-spinner-overlay/lib';
  import { TextInput, Button, useTheme, Colors, Appbar } from 'react-native-paper';
  import { AntDesign } from '@expo/vector-icons';
  import SafeAreaView from '../../components/SafeAreaView';
  import { useAuth } from '../../hooks/useAuth';
  import Container from '../../layout/Container';
  
  const AboutApp = ({ navigation }) => {
    const { colors } = useTheme();
  
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
            <Appbar.Content title="About App" />
        </Appbar.Header>
        <SafeAreaView>
            <ScrollView>
            <Container mt={10}>
                <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../../../assets/aimee.png')}
                />
                </View>
            </Container>
    
            <Container mt={20}>
                <Text style={styles.textAbout}>AIMEE merupakan suatu program dinamis dan energik yang mendukung proses pengembangan Startup Digital berkearifaan lokal melalui tahapan REY, Matchmaking, Bootcamp, Coaching, dan Incubation. AIMEE menghadirkan one stop solutions dalam mewujudkan smart economy di Indonesia. Matchmaking antara startup dengan angel investor, jaringan B2B, hingga talenta digital menjadi lebih mudah dan akurat hanya dalam satu genggaman. Platform bagi para multitalenta digital dalam mewujudkan visi industry 4.0 dan society 5.0 melalui penerapan yang luar biasa dari teknologi dan bisnis yang terdigitalisasi.</Text>
            </Container>
            </ScrollView>
        </SafeAreaView>
    </>
      
    );
  };
  
  export default AboutApp;
  
  const styles = StyleSheet.create({
    imageContainer: { flex: 1, alignItems: 'center' },
    image: { height: 100, resizeMode: 'contain', right: 1 },
    textAbout: { textAlign: "justify"},
  });
  