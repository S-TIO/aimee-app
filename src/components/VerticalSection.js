import { useNavigation } from '@react-navigation/native';
import propTypes from 'prop-types';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Text, TouchableRipple, Colors, useTheme } from 'react-native-paper';

import Container from '../layout/Container';

const Item = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <TouchableRipple
        onPress={() => {
          if (item.type === 'VIDEO') {
            navigation.navigate('PlayVideo', { data: item });
          } else {
            navigation.navigate('ViewBlog', { data: item });
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

const VerticalSection = ({ title, data, viewAll }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View>
      {title && (
        <Container mb={8}>
          <View style={styles.flatListHeaderContainer}>
            <Text style={styles.flatListHeader}>{title}</Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate(viewAll)}
            >
              <Text
                style={[
                  styles.flatListHeaderLink,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                View more
              </Text>
            </TouchableOpacity>
          </View>
        </Container>
      )}

      <FlatList
        data={data}
        renderItem={({ item }) => {
          return <Item item={item} />;
        }}
        keyExtractor={(item, index) => String(item + index)}
        contentContainerStyle={styles.flatListInnerContainer}
        style={styles.flatList}
      />
    </View>
  );
};

VerticalSection.propTypes = {
  title: propTypes.string,
  data: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      title: propTypes.string,
      cover: propTypes.string,
      link: propTypes.string,
    })
  ).isRequired,
};

export default VerticalSection;

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
