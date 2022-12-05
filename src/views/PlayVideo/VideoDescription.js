import propTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import Container from '../../layout/Container';

const VideoDescription = ({ title, description, onOpen }) => {
  const { colors } = useTheme();

  return (
    <Container mt={16}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <TouchableOpacity activeOpacity={0.6} onPress={onOpen}>
        <View>
          <Text ellipsizeMode="tail" numberOfLines={3}>
            {description}
          </Text>

          <Text
            style={[
              styles.readMore,
              {
                color: colors.primary,
              },
            ]}
          >
            Read more
          </Text>
        </View>
      </TouchableOpacity>
    </Container>
  );
};

VideoDescription.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  onOpen: propTypes.func,
};

export default VideoDescription;

const styles = StyleSheet.create({
  titleContainer: { marginBottom: 8 },
  title: { fontSize: 20, fontWeight: 'bold' },
  readMore: { paddingVertical: 8, marginBottom: -8 },
});
