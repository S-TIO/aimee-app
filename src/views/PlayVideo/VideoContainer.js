import propTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const VideoContainer = ({ source, onLoadEnd }) => {
  return (
    <View style={styles.mainContainer}>
      <WebView
        source={{ uri: source }}
        onLoadEnd={onLoadEnd}
        allowsFullscreenVideo
        style={styles.webview}
      />
    </View>
  );
};

VideoContainer.propTypes = {
  source: propTypes.string.isRequired,
  onLoadEnd: propTypes.func,
};

export default VideoContainer;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  webview: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
});
