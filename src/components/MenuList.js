import propTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, Colors, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuList = ({ text, icon, info, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor={Colors.grey300}
      style={styles.touchableContainer}
    >
      <View
        style={[
          styles.contentContainer,
          {
            borderBottomColor: Colors.grey300,
          },
        ]}
      >
        <MaterialCommunityIcons
          color={colors.primary}
          name={icon}
          size={24}
          style={styles.icon}
        />
        <Text style={styles.contentText}>{text}</Text>

        {info && <View style={styles.infoContainer}>{info}</View>}
        <MaterialCommunityIcons
          color={colors.disabled}
          name="chevron-right"
          size={24}
          style={styles.arrowIcon}
        />
      </View>
    </TouchableRipple>
  );
};

MenuList.propTypes = {
  text: propTypes.string,
  icon: propTypes.string,
  info: propTypes.node,
  onPress: propTypes.func,
};

MenuList.defaultProps = {
  text: 'Menu List',
  icon: 'card-text-outline',
  onPress: () => {},
};

export default MenuList;

const styles = StyleSheet.create({
  touchableContainer: {
    paddingHorizontal: 16,
    height: 50,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.2,
  },
  icon: { position: 'absolute', left: 0 },
  contentText: { fontSize: 16, marginLeft: 32 },
  infoContainer: { position: 'absolute', right: 24 },
  arrowIcon: { top: 1 },
});
