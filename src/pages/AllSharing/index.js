import { SectionList, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import VerticalSection from '../../components/VerticalSection';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase';

const AllSharing = ({ navigation }) => {
  const { colors } = useTheme();
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

  useEffect(() => {
    const dbRef = collection(db, "SharingSantaii");
  
    const q = query(dbRef, orderBy("title", "asc"));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setSharingSantaii(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  }, []);

  const SHARINGSANTAII = sharingSantaii?.map((doc) => {
    return createVid(doc.id, doc.title, doc.description);
  });

  const SECTIONS = [
    {
      title: '',
      data: SHARINGSANTAII,
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
        <Appbar.Content title="All Sharing SantAII" />
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

export default AllSharing;

const styles = StyleSheet.create({
  content: {
    paddingTop: 16,
  },
});
