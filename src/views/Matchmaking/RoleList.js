import { useNavigation } from '@react-navigation/native';
import propTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, useTheme, Avatar } from 'react-native-paper';

const Menu = ({ title, icon, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        style={[
          styles.container,
          {
            borderColor: colors.disabled,
          },
        ]}
      >
        <View style={styles.content}>
          <Avatar.Icon size={72} icon={icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RoleList = ({ menus }) => {
  const navigation = useNavigation();

  return (
    <>
      {menus.map((menu, index) => {
        return (
          <Menu
            key={menu.title + index}
            title={menu.title}
            icon={menu.icon}
            onPress={() => {
              navigation.navigate(menu.to);
            }}
          />
        );
      })}
    </>
  );
};

RoleList.propTypes = {
  menus: propTypes.arrayOf(
    propTypes.shape({
      title: propTypes.string,
      to: propTypes.string,
      icon: propTypes.string,
    })
  ),
};

export default RoleList;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.8,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  content: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  textContainer: { bottom: 2, marginLeft: 8, flex: 1 },
  title: { fontSize: 18 },
});
