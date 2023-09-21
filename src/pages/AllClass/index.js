import { SectionList, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

// import onlineClass from '../../_DATA/online-class.json';
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

const [onlineClass, setOnlineClass] = useState([]);

useEffect(() => {
  const dbRef = collection(db, "OnlineClass");

  const q = query(dbRef, orderBy("title", "asc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setOnlineClass(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
  });

  return unsubscribe;
}, []);

const ONLINECLASS = onlineClass.map((vid) => {
  return createVid(vid.id, vid.title, vid.description);
});

const SECTIONS = [
  {
    title: '',
    data: ONLINECLASS,
  },
];

const AllClass = ({ navigation }) => {
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
