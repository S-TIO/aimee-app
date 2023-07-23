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
      title: 'Investor',
      to: 'AllSeminar',
      icon: '',
    },
    {
      title: 'Digital Talent',
      to: 'AllSharing',
      icon: '',
    },
    {
      title: 'Startup',
      to: 'AllClass',
      icon: '',
    },
  ];
  
  const Matchmaking = ({ navigation }) => {
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
          <Appbar.Content title="Matchmaking" />
        </Appbar.Header>
  
        <ScrollView style={{ backgroundColor: colors.surface }}>
          <Container mt={16}>
            <ProgramList menus={MENUS} />
          </Container>
        </ScrollView>
      </>
    );
  };
  
  export default Matchmaking;
  