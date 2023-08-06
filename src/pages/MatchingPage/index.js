import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet,
  View,
  Text,
  Image, SafeAreaView} from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import Swiper from 'react-native-deck-swiper';;
import { db } from '../../../firebase';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';


const MatchingPage = ({ route }) => {
  const {
    investorName,
    investorSektorIndustri,
    investorPendanaan,
    investorTahapPerkembangan,
    investorContact,
  } = route.params;
  const { colors } = useTheme();
  const [startup, setStartup] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const swipeRef = useRef(null);

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {

      unsub = onSnapshot(
        query(
          collection(db, "StartupList"),
          where('sektorIndustri', '==', investorSektorIndustri),
          where('tahapPerkembangan', '==', investorTahapPerkembangan),
        ),
        (snapshot) => {
          if (snapshot.empty) {
            setStartup([]);
            setErrorMessage("Startup is not available");
          } else {
          setStartup(
            snapshot.docs
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
            setErrorMessage("");
        }
      });
    };
    fetchCards();
    return unsub;
  }, []);
    return (
      <>
        <Appbar.Header
          style={{
            backgroundColor: colors.surface,
          }}
        >
          <Appbar.Content title="Matchmaking" />
          <Appbar.Action icon="puzzle-check" size={30} onPress={() =>
            navigation.navigate('StartupMatch')}/>
        </Appbar.Header>
        <SafeAreaView style={styles.container}>
        <View style={styles.flex}>
          {errorMessage ? (
          <View style={styles.errorMessageContainer}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
          ) : (
            <Swiper ref={swipeRef}
            containerStyle={{backgroundColor: "transparent"}}
            cards={startup}
            renderCard={(card) => card ? (card&&
              <View key={card.id} style={styles.card}>
                <Image style={styles.image} source={{ uri: card.image }} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{card.name}</Text>
                  <Text style={styles.title}>Industry Sector</Text>
                  <Text style={styles.text}>{card.sektorIndustri}</Text>
                  <Text style={styles.title}>Growth Stage</Text>
                  <Text style={styles.text}>{card.tahapPerkembangan}</Text>
                  <Text style={styles.title}>Fund Needed</Text>
                  <Text style={styles.text}>{card.pendanaan}</Text>
                </View>
              </View>
            ) || null : (
              <View style={styles.card}>
                <Text style={styles.message}>No more Startup</Text>
              </View>
            )}
            backgroundColor={'#fff'}
            stackSize={5}
            cardIndex={0}
            animateCardOpacity
            verticalSwipe={false}
            onSwipedLeft={() => {
              console.log("Skip")
            }}
            onSwipedRight={()=> {
              console.log("Yeah")
            }}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => swipeRef.current.swipeLeft()}>
            <AntDesign name='closecircleo' size={24} color="red"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => swipeRef.current.swipeRight()}>
            <AntDesign name='checkcircleo' size={24} color="green"/>
          </TouchableOpacity>
        </View>
        </SafeAreaView>
        
      </>
)};

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "40%",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingBottom: 10,
  },
  message: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'lightgrey',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    marginTop: -50,
  },
  flex: {
    flex: 1,
  },
  card: {
    position: 'relative',
    borderRadius: 20,
    borderWidth: 2,
    height: "90%",
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 3,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "white",
    marginVertical: 5,
  },
  text: {
    fontSize: 18,
    color: 'lightgrey',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: "#fff",
  },
  image: {
    position: 'absolute',
    width: '90%',
    height: '60%',
    resizeMode: 'contain',
    top: 0,
  },
  errorMessage: {
    fontSize: 24,
    color: 'red',
  },
  errorMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MatchingPage;