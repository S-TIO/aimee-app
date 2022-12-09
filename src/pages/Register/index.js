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
import { TextInput, Button, useTheme, Colors } from 'react-native-paper';

import SafeAreaView from '../../components/SafeAreaView';
import { useAuth } from '../../hooks/useAuth';
import Container from '../../layout/Container';

const Register = ({ navigation }) => {
  const { colors } = useTheme();
  const auth = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !password2) return;

    if (password === password2) {
      const res = await auth.register(name, email, password);
      if (res?.error) {
        ToastAndroid.show('Registration failed', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Registration success', ToastAndroid.SHORT);
      }
    } else {
      setPassword2('');

      ToastAndroid.show(
        `Pasword confirmation does not match`,
        ToastAndroid.SHORT
      );
    }
  };

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
        <Container mt={64}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../../assets/aimee.png')}
            />
          </View>
        </Container>

        <Container mt={8}>
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.passwordInput}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.passwordInput}
          />
          <TextInput
            label="Confirm Password"
            value={password2}
            onChangeText={setPassword2}
            mode="outlined"
            secureTextEntry
            style={styles.passwordInput}
          />

          <Button
            onPress={handleRegister}
            mode="contained"
            style={styles.loginButton}
          >
            Register
          </Button>
        </Container>

        <Container mt={24}>
          <Text
            style={[
              styles.textRegister,
              {
                color: Colors.grey600,
              },
            ]}
          >
            Already have an account?
          </Text>
          <View style={styles.registerButton}>
            <TouchableOpacity
              onPress={() => navigation.replace('Login')}
              activeOpacity={0.6}
            >
              <Text
                style={[
                  styles.registerButtonText,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                Login Now!
              </Text>
            </TouchableOpacity>
          </View>
        </Container>
      </ScrollView>

      {auth.loading && <Spinner visible />}
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  imageContainer: { flex: 1, alignItems: 'center' },
  image: { height: 100, resizeMode: 'contain', right: 1 },
  passwordInput: { marginTop: 8 },
  loginButton: { marginTop: 16 },
  textRegister: { textAlign: 'center' },
  registerButton: { alignSelf: 'center' },
  registerButtonText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    textAlign: 'center',
  },
});
