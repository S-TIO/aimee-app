import { useNavigation } from '@react-navigation/native';
import propTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Menu = ({ menu }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(menu.link)}
      activeOpacity={0.6}
      style={styles.menuOuterContainer}
    >
      <View style={styles.alignCenter}>
        <View
          style={[
            styles.menuInnerContainer,
            {
              backgroundColor: colors.primary,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={menu.icon}
            color={colors.surface}
            size={32}
          />
        </View>
        <Text style={styles.menuText}>{menu.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const HorizontalMenu = ({ data }) => {
  return (
    <View style={styles.rootMenuContainer}>
      {data.map((menu) => {
        return <Menu key={menu.id} menu={menu} />;
      })}
    </View>
  );
};

HorizontalMenu.propTypes = {
  data: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      title: propTypes.string,
      link: propTypes.string,
      icon: propTypes.string,
    })
  ).isRequired,
};

export default HorizontalMenu;

const styles = StyleSheet.create({
  menuOuterContainer: {
    flex: 1,
  },
  alignCenter: { justifyContent: 'center', alignItems: 'center' },
  menuInnerContainer: {
    borderRadius: 8,
    aspectRatio: 1 / 1,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  menuText: { fontSize: 10 },
  rootMenuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
});
