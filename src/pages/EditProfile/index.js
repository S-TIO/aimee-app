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
import { useTheme } from 'react-native-paper';
import { MaterialIcons } from "@expo/vector-icons";
import {  db, fbStorage  } from "../../../firebase"
import { useAuth } from '../../hooks/useAuth';
import { doc, getDoc, updateDoc,
  ref,
  uploadBytesResumable,
  getDownloadURL, } from "firebase/firestore";
import { any } from "prop-types";


const EditProfile = ({ navigation }) => {
  const { colors } = useTheme();
  const [selectedImage, setSelectedImage] = useState("");
  const [userData, setUserData] = useState(null);

  const auth = useAuth();
  const {user, logout} = useAuth();

  const handleUpdate = async () => {
    const userRef = doc(db, "users", user.uid);
  
    try {
      await updateDoc(userRef, {
        userName: userData.userName,
        userEmail: userData.userEmail,
        phone: userData.phone,
        country: userData.country,
        city: userData.city,
        userImg: userData.userImg,
      });
      
      console.log('User Updated!');
      window.alert('Profile Updated!\nYour profile has been updated successfully.');
    } catch (error) {
      console.error('Error updating user:', error);
      window.alert('Error updating your profile. Please try again.');
    }
  };


  const getUser = async () => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const documentSnapshot = await getDoc(userRef);
  
      if (documentSnapshot.exists()) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    } catch (error) {
      // Handle any errors here
      console.error('Error fetching user data:', error);
    }
  };

  console.log(selectedImage);

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      await uploadToFirebase(result.assets[0].uri, "image");
    }
  };

  async function uploadToFirebase (uri, fileType) {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();
  
    const imageRef = ref(fbStorage, `images/` + new Date().getTime());
  
    const uploadTask = uploadBytesResumable(imageRef, theBlob);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is" + progress + "% done")
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log("File available at", downloadURL);
        await updateImage(downloadURL);
        setImage ("");
      });
      }
    );
  };

  async function updateImage() {
    try {
      const docRef = await updateDoc(doc(db, "users", user.uid), {
        userImg,
      })
      console.log("Update Success", docRef.id);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h3 }}>Edit Profile</Text>
      </View>

      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity onPress={handleImageSelection}>
            <Image
              source={{ uri: selectedImage
                ? selectedImage
                : userData
                ? userData.userImg ||
                  'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
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
    </SafeAreaView>
  );
};

export default EditProfile;