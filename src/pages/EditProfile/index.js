import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { COLORS, FONTS } from "../../constants";
import { Appbar, useTheme } from 'react-native-paper';
import { MaterialIcons } from "@expo/vector-icons";
import {  db, fbStorage  } from "../../../firebase"
import { useAuth } from '../../hooks/useAuth';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {ref,
  uploadBytesResumable,
  getDownloadURL } from "firebase/storage";


const EditProfile = ({ navigation }) => {
  const { colors } = useTheme();
  const [selectedImage, setSelectedImage] = useState("");
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState("");

  const {user} = useAuth();

  const handleUpdate = async () => {
    const userRef = doc(db, "users", user.uid);

    try {
      if( image == null && userData.userImg ) {
        image = userData.userImg;
      };
      
      await updateDoc(userRef, {
        userName: userData.userName,
        userEmail: userData.userEmail,
        phone: userData.phone,
        country: userData.country,
        city: userData.city,
        userImg: image,
      });
      window.alert('Profile Updated!\nYour profile has been updated successfully.');
    } catch (error) {
      window.alert('Error updating your profile. Please try again.');
    }
  };


  const getUser = async () => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const documentSnapshot = await getDoc(userRef);
  
      if (documentSnapshot.exists()) {
        setUserData(documentSnapshot.data());
      }
    } catch (error) {
      // Handle any errors here
      console.error('Error fetching user data:', error);
    }
  };

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      await uploadToFirebase(result.assets[0].uri);
    }
  };

  async function uploadToFirebase (uri) {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();
  
    const imageRef = ref(fbStorage, `images/` + new Date().getTime());
  
    const uploadTask = uploadBytesResumable(imageRef, theBlob);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        setImage (downloadURL);
        window.alert("Upload completed successfully!");
      });
      }
    );
  };

  useEffect(() => {
    getUser();
  }, []);

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
          <Appbar.Content title="Edit Profile" />
      </Appbar.Header>
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 22,
      }}
    >
      <ScrollView>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleImageSelection}>
            <Image
              source={{ uri: userData
                ? userData.userImg ||
                  'https://firebasestorage.googleapis.com/v0/b/aimee-6d10e.appspot.com/o/default%2FDesain%20tanpa%20judul%20(5).png?alt=media&token=9b9a50d3-6c63-465c-9372-6dfe5c0cb48f'
                : 'https://firebasestorage.googleapis.com/v0/b/aimee-6d10e.appspot.com/o/default%2FDesain%20tanpa%20judul%20(5).png?alt=media&token=9b9a50d3-6c63-465c-9372-6dfe5c0cb48f',
            }}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: colors.primary,
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
            >
              <MaterialIcons
                name="photo-camera"
                size={32}
                color={colors.primary}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Name</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                placeholder="Name"
                placeholderTextColor="#666666"
                autoCorrect={false}
                value={userData ? userData.userName : ''}
                onChangeText={(txt) => setUserData({...userData, userName: txt})}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Email</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor="#666666"
                autoCorrect={false}
                value={userData ? userData.userEmail : ''}
                onChangeText={(txt) => setUserData({...userData, userEmail: txt})}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Phone</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="#666666"
                autoCorrect={false}
                value={userData ? userData.phone : ''}
                onChangeText={(txt) => setUserData({...userData, phone: txt})}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Country</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                placeholder="Country"
                placeholderTextColor="#666666"
                autoCorrect={false}
                value={userData ? userData.country : ''}
                onChangeText={(txt) => setUserData({...userData, country: txt})}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>City</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.secondaryGray,
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <TextInput
              placeholder="City"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.city : ''}
              onChangeText={(txt) => setUserData({...userData, city: txt})}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            height: 44,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleUpdate}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
            }}
          >
            Save Change
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
    </>
  );
};

export default EditProfile;