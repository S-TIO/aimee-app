import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button, useTheme, Appbar } from 'react-native-paper';
import Container from '../../layout/Container';
import DropDown from "react-native-paper-dropdown";
import { updateDoc, doc } from "firebase/firestore";
import { db, fbStorage } from "../../../firebase";
import * as ImagePicker from "expo-image-picker";
import {ref,
  uploadBytesResumable,
  getDownloadURL } from "firebase/storage";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function UpdateDetail({ route, navigation }) {
    const { colors } = useTheme();
	const { item } = route.params;
	const id = item.id;
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [location, setLocation] = useState(item.location);
    const [image, setImage] = useState(item.image);
    const [ukuranTim, setUkuranTim] = useState(item.ukuranTim);
    const [keahlian, setKeahlian] = useState(item.keahlian);
    const [pendanaan, setPendanaan] = useState(item.pendanaan);
    const [contact, setContact] = useState(item.contact);
    const [sektorIndustri, setSektorIndustri] = useState (item.sektorIndustri);
    const [tahapPerkembangan, setTahapPerkembangan] = useState(item.tahapPerkembangan);
    const [modelBisnis, setModelBisnis] = useState(item.modelBisnis);

    const [showDropDown1, setShowDropDown1] = useState(false);
    const [showDropDown2, setShowDropDown2] = useState(false);
    const [showDropDown3, setShowDropDown3] = useState(false);
    const [showDropDown4, setShowDropDown4] = useState(false);
    const [loading, setLoading] = useState(false);
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
    const keahlianList = [
        {label: 'Teknologi dan Pengembangan Produk', value: 'Teknologi dan Pengembangan Produk'},
        {label: 'Pemasaran dan Strategi Penjualan', value: 'Pemasaran dan Strategi Penjualan'},
        {label: 'Manajemen Operasional dan Skalabilitas', value: 'Manajemen Operasional dan Skalabilitas'},
        {label: 'Kemitraan dan Pengembangan Bisnis', value: 'Kemitraan dan Pengembangan Bisnis'},
        {label: 'Keuangan dan Akuntansi', value: 'Keuangan dan Akuntansi'},
        {label: 'Hukum dan Regulasi', value: 'Hukum dan Regulasi'}
    ];

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

	const onUpdate = async () => {
		try {
      setLoading(true);
			await updateDoc(doc(db, "StartupList", id), {
                name: name,
                description: description,
                location: location,
                sektorIndustri : sektorIndustri,
                tahapPerkembangan : tahapPerkembangan,
                ukuranTim : ukuranTim,
                modelBisnis : modelBisnis,
                keahlian : keahlian,
                pendanaan : pendanaan,
                image : image,
                contact : contact,
                updatedAt: new Date(),
            });
			alert("Update Successful");
      setLoading(false);
		} catch (error) {
			alert("Error Updating Data");
		}
		navigation.navigate("Startup");
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
            <Appbar.Content title="Update Data" />
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
                multiline={true}
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
                defaultValue={pendanaan}
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
                placeholder='Email or Phone Number'
                defaultValue={contact}
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
                onPress={onUpdate}
                mode="contained"
                style={styles.loginButton}
              >
                Update Data
              </Button>
            </Container>
          </ScrollView>
          {loading && <Spinner visible />}
        </>
      );
}

const styles = StyleSheet.create({
    scrolViewContent: { paddingBottom: 16, flexGrow: 1, },
    loginButton: { marginTop: 16, marginBottom: 10 },
});  
