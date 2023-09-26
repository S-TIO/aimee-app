import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from 'expo-status-bar';

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from '../../../firebase';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, Image } from 'react-native';
import { useTheme, TextInput, Appbar } from 'react-native-paper';
import Container from '../../layout/Container';


const Search = () => {
  const { colors } = useTheme();
  return (
    <Container mt={0} mb={8}>
      <TextInput
        placeholder="Search activity..."
        left={
          <TextInput.Icon
            name="magnify"
            color={colors.disabled}
            rippleColor={colors.background}
            style={styles.searchIcon}
          />
        }
        mode="outlined"
        style={{ backgroundColor: colors.surface }}
      />
    </Container>
  );
};

const Startup = ({ navigation }) => {
  const { colors } = useTheme();
	const [startuplist, setStartupList] = useState([]);

	

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStatusBarBackgroundColor(colors.surface);
      setStatusBarStyle('dark');
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
		const dbRef = collection(db, "StartupList");

		const q = query(dbRef, orderBy("name", "asc"));

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			setStartupList(
				querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});

		return unsubscribe;
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
        <Appbar.Content title="Startup" />
        <Appbar.Action icon="plus" size={30} onPress={() =>
            navigation.navigate('AddStartup')}/>
      </Appbar.Header>

      <View
        style={{ backgroundColor: colors.surface }}
        contentContainerStyle={styles.scrolViewContent}
      >
        <Search />
        <FlatList
					style={{ height: "78%" }}
					data={startuplist}
					numColumns={1}
					renderItem={({ item }) => (
						<Pressable
							onPress={() =>
								navigation.navigate("StartupDetails", {
									data: item,
								})
							}
							style={({ pressed }) => [
								styles.button,
								{
									backgroundColor: pressed ? "#dfedfa" : "#fff",
									opacity: pressed ? 0.5 : 1,
									margin: 5,
									padding: 0,
									borderRadius: 10,
									alignItems: "center",
									elevation: 5,
								},
							]}
						>
                <View style={styles.container}>
                <View>
                  <Image
                    source={{ uri: item.image }}
                    style={[
                      styles.image,
                      {
                        backgroundColor: colors.surface,
                      },
                    ]}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.nameText}
                  >
                    {item.name}
                  </Text>
                  <View style={styles.descriptionContainer}>
                    <Text numberOfLines={3} ellipsizeMode="tail">
                      {item.description}
                    </Text>
                    <Text style={styles.subDescription}>{item.location}</Text>
                  </View>
                </View>
              </View>
						</Pressable>
					)}
					keyExtractor={(item) => item.id}
				/>
      </View>
    </>
  );
};



export default Startup;

const styles = StyleSheet.create({
  searchIcon: { top: 2 },
  scrolViewContent: { paddingBottom: 16, flexGrow: 1, },
  lockedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  lockedButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
  },
  addStartupButtonText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  image: {
    height: 64,
    width: 64,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  textContainer: { bottom: 2, flex: 1 },
  nameText: { marginLeft: 8, fontSize: 18 },
  descriptionContainer: { marginLeft: 8, flex: 1 },
  subDescription: { marginTop: 2 },
  line: { height: 1, width: '100%' },
});
