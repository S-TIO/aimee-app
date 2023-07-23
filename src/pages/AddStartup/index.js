import {
    setStatusBarBackgroundColor,
    setStatusBarStyle,
  } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
    ToastAndroid,
    Keyboard,
  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { TextInput, Button, useTheme, Appbar, Colors } from 'react-native-paper';
import { collection, doc, setDoc, addDoc } from "firebase/firestore"; 
import { db } from '../../../App';
import SafeAreaView from '../../components/SafeAreaView';
import { useAuth } from '../../hooks/useAuth';
import Container from '../../layout/Container';

const AddStartup = ({ navigation }) => {
  const { colors } = useTheme();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [sektorIndustri, setSektorIndustri] = useState('');
  const [tahapPerkembangan, setTahapPerkembangan] = useState('');
  const [ukuranTim, setUkuranTim] = useState('');
  const [modelBisnis, setModelBisnis] = useState('');
  const [pendanaan, setPendanaan] = useState('');
  const [contact, setContact] = useState('');

  function create () {
    addDoc(collection(db, "StartupList"), {
      name: name,
      description: description,
      location: location,
      sektorIndustri : sektorIndustri,
      tahapPerkembangan : tahapPerkembangan,
      ukuranTim : ukuranTim,
      modelBisnis : modelBisnis,
      pendanaan : pendanaan,
      image : image,
      contact : contact
    }).then(() => {
      setName('');
      setDescription('');
      setLocation('');
      setSektorIndustri('');
      setTahapPerkembangan('');
      setUkuranTim('');
      setModelBisnis('');
      setPendanaan('');
      setImage('');
      setContact('');
      Keyboard.dismiss;
      console.log('Data Submitted');
    }).catch((error) => {
      console.log(error);
    });
  }

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
        <Appbar.Content title="Startup Registration" />
      </Appbar.Header>
      <ScrollView>
        <Container mt={8}>
          <TextInput
            label="Startup Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
          />
          <TextInput
            label="Startup Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
          />
          <TextInput
            label="Startup Location"
            value={location}
            onChangeText={setLocation}
            mode="outlined"
          />
          <TextInput
            label="Industry Sector"
            value={sektorIndustri}
            onChangeText={setSektorIndustri}
            mode="outlined"
          />
          <TextInput
            label="Growth Stage"
            value={tahapPerkembangan}
            onChangeText={setTahapPerkembangan}
            mode="outlined"
          />
          <TextInput
            label="Team Size"
            value={ukuranTim}
            onChangeText={setUkuranTim}
            mode="outlined"
          />
          <TextInput
            label="Business Model"
            value={modelBisnis}
            onChangeText={setModelBisnis}
            mode="outlined"
          />
          <TextInput
            label="Dana yang Dibutuhkan"
            value={pendanaan}
            onChangeText={setPendanaan}
            mode="outlined"
          />
          <TextInput
            label="Startup Logo"
            value={image}
            onChangeText={setImage}
            mode="outlined"
          />
          <TextInput
            label="Contact"
            value={contact}
            onChangeText={setContact}
            mode="outlined"
          />

          <Button
            onPress={create}
            mode="contained"
            style={styles.loginButton}
          >
            Add Startup
          </Button>
        </Container>
      </ScrollView>
    </>
  );
};

export default AddStartup;

const styles = StyleSheet.create({
  scrolViewContent: { paddingBottom: 16, flexGrow: 1, },
  loginButton: { marginTop: 16, marginBottom: 10 },
});  