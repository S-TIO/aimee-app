import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, SectionList } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

import onlineClass from '../../_DATA/online-class.json';
import reySummit from '../../_DATA/rey-summit.json';
import sharingSantaii from '../../_DATA/sharing-santaii.json';
import HorizontalSection from '../../components/HorizontalSection';
import SafeAreaView from '../../components/SafeAreaView';
import VerticalSection from '../../components/VerticalSection';
import Container from '../../layout/Container';
import CategorySlider from '../../views/Explore/CategorySlider';
import { db } from '../../../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const Search = () => {
  const { colors } = useTheme();
  return (
    <Container mt={8} mb={16}>
      <TextInput
        placeholder="Search activity..."
        left={
          <TextInput.Icon
            name="magnify"
            color={colors.disabled}
            rippleColor={colors.background}
            style={styles.searchIcon}
          />
        }
        mode="outlined"
        style={{ backgroundColor: colors.surface }}
      />
    </Container>
  );
};

const Explore = ({ navigation }) => {
  const { colors } = useTheme();
  const [onlineClass, setOnlineClass] = useState([]);
  const [reySummit, setReySummit] = useState([]);
  const [sharingSantaii, setSharingSantaii] = useState([]);

  const createVid = (id, title, description) => {
    return {
      id,
      title,
      cover: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      link: `https://www.youtube.com/embed/${id}?rel=0&autoplay=0&showinfo=0&controls=1&fullscreen=1`,
      description,
      type: 'VIDEO',
    };
  };

  const SHARINGSANTAII = sharingSantaii?.map((doc) => {
    return createVid(doc.id, doc.title, doc.description);
  });
  
  useEffect(() => {
    const dbRef = collection(db, "SharingSantaii");
  
    const q = query(dbRef, orderBy("title", "asc"));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setSharingSantaii(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  }, []);

  const SEMINARWORKSHOP = reySummit?.map((doc) => {
    return createVid(doc.id, doc.title, doc.description);
  });

  useEffect(() => {
    const dbRef = collection(db, "SeminarWorkshop");
  
    const q = query(dbRef, orderBy("title", "asc"));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setReySummit(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  
    return unsubscribe;
  }, []);

  useEffect(() => {
    const dbRef = collection(db, "OnlineClass");
  
    const q = query(dbRef, orderBy("title", "asc"));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setOnlineClass(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  }, []);

  const ONLINECLASS = onlineClass?.map((doc) => {
    return createVid(doc.id, doc.title, doc.description);
  });

  const SECTIONS = [
    {
      title: 'Search',
      data: [],
    },
    {
      title: 'History',
      horizontal: true,
      data: [
        ...SHARINGSANTAII.slice(0, 1),
        ...SEMINARWORKSHOP.slice(0, 1),
        ...SHARINGSANTAII.slice(1, 2),
      ],
      viewAll: 'AllSharing',
    },
    {
      title: 'My Courses',
      horizontal: true,
      data: ONLINECLASS.slice(0, 3),
      viewAll: 'AllClass',
    },
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStatusBarBackgroundColor(colors.surface);
      setStatusBarStyle('dark');
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView>
      <SectionList
        sections={SECTIONS}
        renderSectionHeader={({ section }) => {
          if (section.title === 'Search') return <Search />;

          if (section.title === 'Category')
            return <CategorySlider data={section.data} />;

          if (section.title === 'History')
            return (
              <HorizontalSection
                viewAll={section.viewAll}
                title={section.title}
                data={section.data}
              />
            );

          return (
            <VerticalSection
              viewAll={section.viewAll}
              title={section.title}
              data={section.data}
            />
          );
        }}
        renderItem={() => null}
        keyExtractor={(item, index) => String(item + index)}
      />
    </SafeAreaView>
  );
};
export default Explore;

const styles = StyleSheet.create({
  searchIcon: { top: 2 },
});
