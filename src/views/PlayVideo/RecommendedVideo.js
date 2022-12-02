import { useNavigation } from '@react-navigation/native';
import propTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import { Text, TouchableRipple, Colors } from 'react-native-paper';

const Item = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <TouchableRipple
        onPress={() => {
          if (item.type === 'VIDEO') {
            navigation.navigate('PlayVideo', { data: item });
          }
        }}
        rippleColor={Colors.grey300}
        borderless
      >
        <View style={styles.itemInnerContainer}>
          <Image
            source={{
              uri: item.cover,
            }}
            style={styles.itemImage}
          />

          <View style={styles.itemTextContainer}>
            <Text numberOfLines={2} ellipsizeMode="tail">
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

const RecommendedVideo = ({ videos }) => {
  return (
    <View>
      {videos.map((video) => {
        return <Item key={video.id} item={video} />;
      })}
    </View>
  );
};

RecommendedVideo.propTypes = {
  videos: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      title: propTypes.string,
      cover: propTypes.string,
      link: propTypes.string,
    })
  ).isRequired,
};

export default RecommendedVideo;

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemInnerContainer: {
    paddingBottom: 8,
  },
  itemTextContainer: {
    marginTop: 4,
  },
  itemImage: { width: '100%', aspectRatio: 16 / 9, borderRadius: 8 },
  flatListHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flatListHeader: { fontSize: 16, fontWeight: 'bold' },
  flatListHeaderLink: {
    paddingVertical: 8,
  },
});
