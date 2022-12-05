import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const VideoCardLoader = () => {
  const { colors } = useTheme();

  return (
    <View>
      <View
        style={[
          styles.loader,
          {
            backgroundColor: colors.disabled,
          },
        ]}
      />
      <View
        style={[
          styles.loaderText,
          {
            backgroundColor: colors.disabled,
          },
        ]}
      />
    </View>
  );
};

export default VideoCardLoader;

const styles = StyleSheet.create({
  loader: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  loaderText: { width: '80%', height: 16, marginTop: 8, marginBottom: 16 },
});
