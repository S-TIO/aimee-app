import {
    setStatusBarBackgroundColor,
    setStatusBarStyle,
  } from 'expo-status-bar';
  import { useEffect, useState } from 'react';
  import {
    StyleSheet,
    ToastAndroid,
  } from 'react-native';
  import { ScrollView } from 'react-native-gesture-handler';
  import Spinner from 'react-native-loading-spinner-overlay/lib';
  import { TextInput, Button, useTheme, Appbar } from 'react-native-paper';
  
  import SafeAreaView from '../../components/SafeAreaView';
  import { useAuth } from '../../hooks/useAuth';
  import Container from '../../layout/Container';
  import { sendPasswordResetEmail } from 'firebase/auth/react-native';
  
  const ForgotPassword = ({ navigation }) => {
    const { colors } = useTheme();
    const [email, setEmail] = useState('');
    const auth = useAuth();

    const handleResetPassword = async () => {
        try {
        auth.forgotPassword(email).then(() => {
            window.alert("Password reset email sent")
        });
        } catch (error) {
            console.log(error)
        }
    };

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
          <Appbar.Content title="Forgot Password ?" />
        </Appbar.Header>
      <SafeAreaView>
        <ScrollView>
  
          <Container>
            <TextInput
              label="Input Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.passwordInput}
            />
  
            <Button
              onPress={handleResetPassword}
              mode="contained"
              style={styles.loginButton}
            >
              Send Email
            </Button>
          </Container>
        </ScrollView>
  
        {auth.loading && <Spinner visible />}
      </SafeAreaView>
      {auth.loading && <Spinner visible />}
      </>
    );
  };
  
  export default ForgotPassword;
  
  const styles = StyleSheet.create({
    imageContainer: { flex: 1, alignItems: 'center' },
    image: { height: 100, resizeMode: 'contain', right: 1 },
    passwordInput: { marginTop: 8 },
    loginButton: { marginTop: 16 },
  });
  