import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme, Appbar } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import Container from "../../layout/Container";

export default function StartupMatchDetails({ route, navigation }) {
	const { data } = route.params;
	const { colors } = useTheme();

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
				<Appbar.Content title="Startup Details" />
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
								marginTop: 10,
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
					<Text style={styles.title}>Required Talent</Text>
					<Text>{data.keahlian}</Text>
					<Text style={styles.title}>Required Funding</Text>
					<Text>{data.pendanaan}</Text>
					<Text style={styles.title}>Contact</Text>
					<Text>{data.contact}</Text>
				</View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	Container: {
		marginHorizontal: 15,
	},
	uppercontainer: {
		alignItems: "center",
	},
	bottomcontainer: {
		alignItems: "flex-start",
		paddingBottom: 5,
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
		marginBottom: 20,
	},
	image: {
		height: 120,
		width: 120,
		resizeMode: 'contain',
		borderRadius: 8,
	},
	line: { height: 1, width: '100%' },
});
