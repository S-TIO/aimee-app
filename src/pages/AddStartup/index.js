import React, { useState } from 'react';
import {
    StyleSheet,
    Keyboard,
  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button, useTheme, Appbar } from 'react-native-paper';
import { collection, addDoc, updateDoc } from "firebase/firestore"; 
import { db, fbStorage } from '../../../firebase';
import Container from '../../layout/Container';
import DropDown from "react-native-paper-dropdown";
import * as ImagePicker from "expo-image-picker";
import {ref,
  uploadBytesResumable,
  getDownloadURL } from "firebase/storage";
import Spinner from 'react-native-loading-spinner-overlay/lib';

const AddStartup = ({ navigation }) => {
  const { colors } = useTheme();
  const [ loading, setLoading ] = useState(false);
  const [showDropDown1, setShowDropDown1] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [showDropDown3, setShowDropDown3] = useState(false);
  const [showDropDown4, setShowDropDown4] = useState(false);
  const [sektorIndustri, setSektorIndustri] = useState (null);
  const [tahapPerkembangan, setTahapPerkembangan] = useState(null);
  const [modelBisnis, setModelBisnis] = useState(null);
  const sektorIndustriList = [
    {label: 'Teknologi Informasi dan Komunikasi', value: 'Teknologi Informasi dan Komunikasi'},
    {label: 'Kesehatan dan Perawatan Kesehatan', value: 'Kesehatan dan Perawatan Kesehatan'},
    {label: 'Makanan dan Minuman', value: 'Makanan dan Minuman'},
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
  const keahlianList = [
    {label: 'Teknologi dan Pengembangan Produk', value: 'Teknologi dan Pengembangan Produk'},
    {label: 'Pemasaran dan Strategi Penjualan', value: 'Pemasaran dan Strategi Penjualan'},
    {label: 'Manajemen Operasional dan Skalabilitas', value: 'Manajemen Operasional dan Skalabilitas'},
    {label: 'Kemitraan dan Pengembangan Bisnis', value: 'Kemitraan dan Pengembangan Bisnis'},
    {label: 'Keuangan dan Akuntansi', value: 'Keuangan dan Akuntansi'},
    {label: 'Hukum dan Regulasi', value: 'Hukum dan Regulasi'}
  ];
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [ukuranTim, setUkuranTim] = useState('');
  const [keahlian, setKeahlian] = useState('');
  const [pendanaan, setPendanaan] = useState('');
  const [contact, setContact] = useState('');

  const collectionRef = collection(db, "StartupList");

  const data = {
    name: name,
    description: description,
    location: location,
    sektorIndustri: sektorIndustri,
    tahapPerkembangan: tahapPerkembangan,
    ukuranTim: ukuranTim,
    modelBisnis: modelBisnis,
    keahlian: keahlian,
    pendanaan: pendanaan,
    image: image,
    contact: contact,
  };

  function create () {
    setLoading(true);
    addDoc(collectionRef, data)
  .then((docRef) => {
    const id = docRef.id;
    const updatedData = { ...data, id: id };
    return updateDoc(docRef, updatedData);
  }).then(() => {
      setName('');
      setDescription('');
      setLocation('');
      setSektorIndustri('');
      setTahapPerkembangan('');
      setUkuranTim('');
      setModelBisnis('');
      setKeahlian('');
      setPendanaan('');
      setImage('');
      setContact('');
      Keyboard.dismiss;
      window.alert("Data Submitted Successfully!");
      setLoading(false);
    }).catch((error) => {
      window.alert('Error submitting your data. Please try again.');
    });
  }

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });


    if (!result.canceled) {
      await uploadToFirebase(result.assets[0].uri);
    }
  };

  async function uploadToFirebase (uri) {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();
  
    const imageRef = ref(fbStorage, `logos/` + new Date().getTime());
  
    const uploadTask = uploadBytesResumable(imageRef, theBlob);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setLoading(true);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        setImage (downloadURL);
        window.alert("Upload completed successfully!");
        setLoading(false);
      });
      }
    );
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
            keyboardType="numeric"
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
            keyboardType="numeric"
            value={pendanaan}
            onChangeText={setPendanaan}
            mode="outlined"
          />
          <DropDown
            label={"Keahlian yang Dibutuhkan"}
            mode={"outlined"}
            visible={showDropDown4}
            showDropDown={() => setShowDropDown4(true)}
            onDismiss={() => setShowDropDown4(false)}
            value={keahlian}
            setValue={setKeahlian}
            list={keahlianList}
          />
          <TextInput
            label="Contact"
            placeholder='email or phone number'
            value={contact}
            onChangeText={setContact}
            mode="outlined"
          />
          <Button
            onPress={handleImageSelection}
            mode="contained"
            style={styles.loginButton}
          >
            Upload Logo
          </Button>
          <Button
            onPress={create}
            mode="contained"
            style={styles.loginButton}
          >
            Add Startup
          </Button>
        </Container>
      </ScrollView>
      {loading && <Spinner visible />}
    </>
  );
};

export default AddStartup;

const styles = StyleSheet.create({
  scrolViewContent: { paddingBottom: 16, flexGrow: 1, },
  loginButton: { marginTop: 16, marginBottom: 10 },
});  