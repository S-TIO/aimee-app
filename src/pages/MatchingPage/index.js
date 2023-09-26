import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet,
  View,
  Text,
  Image, SafeAreaView} from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import Swiper from 'react-native-deck-swiper';;
import { db } from '../../../firebase';
import { collection, doc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';



const MatchingPage = ({ route, navigation }) => {
  const {
    matchName,
    matchSektorIndustri,
    matchPendanaan,
    matchTahapPerkembangan,
    matchModelBisnis,
    matchContact,
    matchId,
  } = route.params;
  const { colors } = useTheme();
  const [startup, setStartup] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const swipeRef = useRef(null);

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      const matched = await getDocs(
        collection(db, "users", matchId, "match")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const skipped = await getDocs(
        collection(db, "users", matchId, "skipped")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const matchedIds = matched.length > 0 ? matched : ["test"];
      const skippedIds = skipped.length > 0 ? skipped : ["test"];

      unsub = onSnapshot(
        query(query(
          collection(db, "StartupList")),
          where("id", "not-in", [...matchedIds, ...skippedIds]),
          where('sektorIndustri', '==', matchSektorIndustri),
          where('modelBisnis', '==', matchModelBisnis),
        ),
        (snapshot) => {
          if (snapshot.empty) {
            setStartup([]);
            setErrorMessage("Startup is not available");
          } else {
          setStartup(
            snapshot.docs
              .filter((doc) => doc.id !== matchId)
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

  const swipeLeftHandler = async (index) => {
    if(!startup[index]) return;

    const userSkipped = startup[index]
    console.log(`${matchName} skipped on ${userSkipped.name}`);

    setDoc(doc(db, 'users', matchId, "skipped", userSkipped.id), userSkipped)

  }

  const swipeRightHandler = async (index) => {
    if(!startup[index]) return;

    const userMatched = startup[index]
    console.log(`${matchName} matched with ${userMatched.name}`);

    setDoc(doc(db, 'users', matchId, "matched", userMatched.id), userMatched)

  }

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
            onSwipedLeft={(index) => {
              console.log("Skip")
              swipeLeftHandler(index)
            }}
            onSwipedRight={(index)=> {
              console.log("Yeah")
              swipeRightHandler(index)
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
    marginTop: -20,
    marginBottom: -10,
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