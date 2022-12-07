import { SectionList, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

import reySummit from '../../_DATA/rey-summit.json';
import VerticalSection from '../../components/VerticalSection';

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

const SEMINARWORKSHOP = reySummit.map((vid) => {
  return createVid(vid.id, vid.title, vid.description);
});

const SECTIONS = [
  {
    title: '',
    data: SEMINARWORKSHOP,
  },
];

const AllSeminar = ({ navigation }) => {
  const { colors } = useTheme();

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
