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
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth/react-native';
  
  const ChangePassword = ({ navigation }) => {
    const { colors } = useTheme();
    const auth = useAuth();
    const { user } = useAuth();
  
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setStatusBarBackgroundColor(colors.surface);
        setStatusBarStyle('dark');
      });
  
      return unsubscribe;
    }, [navigation]);

    const reauthenticate = (currentPassword) => {
        
            const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
            );
            return reauthenticateWithCredential(user, credential)
        }

    const onChangePassword = async () => {
        try{
            await reauthenticate(currentPassword).then (() => {
                updatePassword(user, newPassword).then (() => {
                    ToastAndroid.show(
                        `Pasword was changed`,
                        ToastAndroid.LONG
                        );
                }).catch((error) => { window.alert(error.message); });
            }).catch((error) => { ToastAndroid.show(
                `Current password is wrong or invalid`,
                ToastAndroid.LONG
                );});
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !newPassword2) return;

        if (newPassword === newPassword2) {
            await onChangePassword(currentPassword, newPassword);
        } else {
            setNewPassword2('');

            ToastAndroid.show(
            `Pasword confirmation does not match`,
            ToastAndroid.LONG
            );
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
          <Appbar.Content title="Change Password" />
        </Appbar.Header>
      <SafeAreaView>
        <ScrollView>
  
          <Container>
            <TextInput
              label="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              mode="outlined"
              secureTextEntry
              style={styles.passwordInput}
            />
            <TextInput
              label="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              mode="outlined"
              secureTextEntry
              style={styles.passwordInput}
            />
            <TextInput
              label="Confirm New Password"
              value={newPassword2}
              onChangeText={setNewPassword2}
              mode="outlined"
              secureTextEntry
              style={styles.passwordInput}
            />
  
            <Button
              onPress={handleChangePassword}
              mode="contained"
              style={styles.loginButton}
            >
              Change Password
            </Button>
          </Container>
        </ScrollView>
  
        {auth.loading && <Spinner visible />}
      </SafeAreaView>
      </>
    );
  };
  
  export default ChangePassword;
  
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
  