import propTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';
import { TouchableRipple, Colors, Text, useTheme } from 'react-native-paper';

import Container from '../layout/Container';

const DataList = ({ name, description, location, image }) => {
  const { colors } = useTheme();
  return (
    <View>
      <TouchableRipple onPress={() => {}} rippleColor={Colors.grey300}>
        <View style={styles.container}>
          <View>
            <Image
              source={{ uri: image }}
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
              {name}
            </Text>
            <View style={styles.descriptionContainer}>
              <Text numberOfLines={3} ellipsizeMode="tail">
                {description}
              </Text>
              <Text style={styles.subDescription}>{location}</Text>
            </View>
          </View>
        </View>
      </TouchableRipple>

      <Container>
        <View
          style={[
            styles.line,
            {
              backgroundColor: colors.background,
            },
          ]}
        />
      </Container>
    </View>
  );
};

DataList.propTypes = {
  name: propTypes.string,
  description: propTypes.string,
  location: propTypes.string,
};

export default DataList;

const styles = StyleSheet.create({
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
