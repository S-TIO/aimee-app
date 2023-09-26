import { SectionList, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import VerticalSection from '../../components/VerticalSection';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase';


const AllClass = ({ navigation }) => {
  const { colors } = useTheme();
  const [onlineClass, setOnlineClass] = useState([]);

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
      title: '',
      data: ONLINECLASS,
    },
  ];
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
        <Appbar.Content title="All Online Class" />
      </Appbar.Header>

      <SectionList
        style={{ backgroundColor: colors.surface }}
        contentContainerStyle={styles.content}
        sections={SECTIONS}
        renderSectionHeader={({ section }) => {
          return <VerticalSection title={section.title} data={section.data} />;
        }}
        renderItem={() => null}
        keyExtractor={(item, index) => String(item + index)}
      />
    </>
  );
};

export default AllClass;

const styles = StyleSheet.create({
  content: {
    paddingTop: 16,
  },
});
