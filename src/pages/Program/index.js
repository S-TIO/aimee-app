import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from 'expo-status-bar';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

import Container from '../../layout/Container';
import ProgramList from '../../views/Program/ProgramList';

const MENUS = [
  {
    title: 'Seminar and Workshop',
    subtitle:
      'Pembekalan pengetahuan teknis dan softskill untuk membangun Startup',
    to: 'AllSeminar',
    icon: 'account-group',
  },
  {
    title: 'Sharing SantAII',
    subtitle:
      'Pembekalan ilmu untuk mengembangkan bisnis didampingi oleh praktisi ahli',
    to: 'AllSharing',
    icon: 'podcast',
  },
  {
    title: 'Online Class',
    subtitle: 'Pendampingan dan bimbingan yang dilakukan oleh Mentor AIMEE',
    to: 'AllClass',
    icon: 'school',
  },
  {
    title: 'Matchmaking',
    subtitle:
      'Pencarian mitra bisnis dan penginputan proposal-proposal mengenai Startup',
    to: 'Matchmaking',
    icon: 'puzzle',
  },
];

const Program = ({ navigation }) => {
  const { colors } = useTheme();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStatusBarBackgroundColor(colors.surface);
      setStatusBarStyle('dark');
    });

    return unsubscribe;
  }, [navigation]);

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
        <Appbar.Content title="Program" />
      </Appbar.Header>

      <ScrollView style={{ backgroundColor: colors.surface }}>
        <Container mt={16}>
          <ProgramList menus={MENUS} />
        </Container>
      </ScrollView>
    </>
  );
};

export default Program;
