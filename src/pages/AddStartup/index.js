import React, {  useState } from 'react';
import {
    StyleSheet,
    Keyboard,
  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button, useTheme, Appbar } from 'react-native-paper';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../../firebase';
import Container from '../../layout/Container';
import DropDown from "react-native-paper-dropdown";

const AddStartup = ({ navigation }) => {
  const { colors } = useTheme();
  const [showDropDown1, setShowDropDown1] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [showDropDown3, setShowDropDown3] = useState(false);
  const [sektorIndustri, setSektorIndustri] = useState (null);
  const [tahapPerkembangan, setTahapPerkembangan] = useState(null);
  const [modelBisnis, setModelBisnis] = useState(null);
  const sektorIndustriList = [
    {label: 'Teknologi Informasi dan Komunikasi', value: 'Teknologi Informasi dan Komunikasi'},
    {label: 'Kesehatan dan Perawatan Kesehatan', value: 'Kesehatan dan Perawatan Kesehatan'},
    {label: 'E-commerce dan Retail', value: 'E-commerce dan Retail'},
    {label: 'Energi dan Lingkungan', value: 'Energi dan Lingkungan'},
    {label: 'Keuangan dan Fintech', value: 'Keuangan dan Fintech'},
    {label: 'Pendidikan dan E-learning', value: 'Pendidikan dan E-learning'},
    {label: 'Manufaktur dan Logistik', value: 'Manufaktur dan Logistik'},
    {label: 'Hiburan dan Media', value: 'Hiburan dan Media'},
    {label: 'Pertanian dan Pangan', value: 'Pertanian dan Pangan'},
    {label: 'Transportasi dan Mobilitas', value: 'Transportasi dan Mobilitas'}
  ];
  const tahapPerkembanganList = [
    {label: 'Ide awal dan pra-seed', value: 'Ide awal dan pra-seed'},
    {label: 'Seed Funding (pendanaan awal)', value: 'Seed Funding (pendanaan awal)'},
    {label: 'Tahap awal pengembangan produk', value: 'Tahap awal pengembangan produk'},
    {label: 'Tahap pertumbuhan dan validasi', value: 'Tahap pertumbuhan dan validasi'},
    {label: 'Tahap lanjutan dan skalabilitas', value: 'Tahap lanjutan dan skalabilitas'}
  ];
  const modelBisnisList = [
    {label: 'B2B (Business-to-Business)', value: 'B2B (Business-to-Business)'},
    {label: 'B2C (Business-to-Consumer)', value: 'B2C (Business-to-Consumer)'},
    {label: 'SaaS (Software-as-a-Service)', value: 'SaaS (Software-as-a-Service)'},
    {label: 'Marketplace', value: 'Marketplace'},
    {label: 'Direct-to-Consumer', value: 'Direct-to-Consumer'},
    {label: 'Franchise', value: 'Franchise'}
  ];
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [ukuranTim, setUkuranTim] = useState('');
  const [pendanaan, setPendanaan] = useState('');
  const [contact, setContact] = useState('');

  function create () {
    addDoc(collection(db, "StartupList"), {
      name: name,
      description: description,
      location: location,
      sektorIndustri : sektorIndustri,
      tahapPerkembangan : tahapPerkembangan,
      ukuranTim : Number(ukuranTim),
      modelBisnis : modelBisnis,
      pendanaan : Number(pendanaan),
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
          <DropDown
            label={"Industry Sector"}
            mode={"outlined"}
            visible={showDropDown1}
            showDropDown={() => setShowDropDown1(true)}
            onDismiss={() => setShowDropDown1(false)}
            value={sektorIndustri}
            setValue={setSektorIndustri}
            list={sektorIndustriList}
          />
          <DropDown
            label={"Growth Stage"}
            mode={"outlined"}
            visible={showDropDown2}
            showDropDown={() => setShowDropDown2(true)}
            onDismiss={() => setShowDropDown2(false)}
            value={tahapPerkembangan}
            setValue={setTahapPerkembangan}
            list={tahapPerkembanganList}
          />
          <TextInput
            label="Team Size"
            placeholder='10'
            value={ukuranTim}
            onChangeText={setUkuranTim}
            mode="outlined"
          />
          <DropDown
            label={"Business Model"}
            mode={"outlined"}
            visible={showDropDown3}
            showDropDown={() => setShowDropDown3(true)}
            onDismiss={() => setShowDropDown3(false)}
            value={modelBisnis}
            setValue={setModelBisnis}
            list={modelBisnisList}
          />
          <TextInput
            label="Dana yang Dibutuhkan"
            placeholder='20000000'
            value={pendanaan}
            onChangeText={setPendanaan}
            mode="outlined"
          />
          <TextInput
            label="Startup Logo"
            placeholder='image url'
            value={image}
            onChangeText={setImage}
            mode="outlined"
          />
          <TextInput
            label="Contact"
            placeholder='email or phone number'
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