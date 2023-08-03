import { View, Text, StyleSheet, Button, Pressable, Image } from "react-native";
import { useTheme, Appbar } from 'react-native-paper';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Container from "../../layout/Container";

export default function StartupDetails({ route, navigation }) {
	const { data } = route.params;
	const { colors } = useTheme();
	const onDelete = () => {
		const docRef = doc(db, "StartupList", data.id);
		deleteDoc(docRef);
		navigation.goBack();
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
				<Appbar.Content title="Startup" />
			</Appbar.Header>
			<ScrollView style={styles.Container}>
				<View style={styles.uppercontainer}>
					<View>
						<Image
							source={{ uri: data.image }}
							style={[
							styles.image,
							{
								backgroundColor: colors.surface,
							},
							]}
						/>
					</View>
                </View>
				<View style={styles.uppertext}>
					<Text style={styles.name}>{data.name}</Text>
					<Text>{data.sektorIndustri}</Text>
					<Text>{data.location}</Text>
				</View>
				<Container>
				<View
					style={[
						styles.line,
						{
						backgroundColor: 'darkgrey',
						},
					]}
				/>
				</Container>
				<View style={styles.bottomcontainer}>
					<Text style={styles.title}>Description</Text>
					<Text>{data.description}</Text>
					<Text style={styles.title}>Team Size</Text>
					<Text>{data.ukuranTim} Orang</Text>
					<Text style={styles.title}>Business Model</Text>
					<Text>{data.modelBisnis}</Text>
					<Text style={styles.title}>Growth Stage</Text>
					<Text>{data.tahapPerkembangan}</Text>
					<Text style={styles.title}>Required Funding</Text>
					<Text>{data.pendanaan}</Text>
					<Text style={styles.title}>Contact</Text>
					<Text>{data.contact}</Text>
				</View>

				<View style={styles.icons}>
					<Pressable
						onPress={() =>
							navigation.navigate("Updatefirestore", {
								item: data,
							})
						}
					>
						<MaterialIcons name="edit" size={24} color="#0000FF" />
					</Pressable>
					<Pressable onPress={onDelete}>
						<MaterialIcons name="delete" size={24} color="#FF6768" />
					</Pressable>
				</View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	Container: {
		margin: 15,
		padding: 15,
		borderRadius: 15,
	},
	uppercontainer: {
		alignItems: "center",
	},
	bottomcontainer: {
		alignItems: "flex-start",
	},
	uppertext: {
		alignItems: "center",
		paddingBottom: 5,
	},
	name: {
		fontWeight: "bold",
		paddingBottom: 10,
		paddingTop: 10,
		fontSize: 20,
	},
	title: {
		fontWeight: "bold",
		paddingBottom: 2,
		paddingTop: 10,
	},
	description: {
		fontWeight: "300",
	},
	icons: {
		flexDirection: "row",
		paddingTop: 20,
		alignSelf: "flex-end",
	},
	image: {
		height: 120,
		width: 120,
		resizeMode: 'contain',
		borderRadius: 8,
	},
	line: { height: 1, width: '100%' },
});
