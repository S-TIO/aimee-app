import { SectionList, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

import reySummit from '../../_DATA/rey-summit.json';
import VerticalSection from '../../components/VerticalSection';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase';


const AllSeminar = ({ navigation }) => {
  const { colors } = useTheme();
  const [reySummit, setReySummit] = useState([]);

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

  const SECTIONS = [
    {
      title: '',
      data: SEMINARWORKSHOP,
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
        <Appbar.Content title="All Seminar and Workshop" />
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

export default AllSeminar;

const styles = StyleSheet.create({
  content: {
    paddingTop: 16,
  },
});
