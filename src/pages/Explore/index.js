import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, SectionList } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

import onlineClass from '../../_DATA/online-class.json';
import posts from '../../_DATA/posts.json';
import reySummit from '../../_DATA/rey-summit.json';
import sharingSantaii from '../../_DATA/sharing-santaii.json';
import HorizontalSection from '../../components/HorizontalSection';
import SafeAreaView from '../../components/SafeAreaView';
import Container from '../../layout/Container';
import CategorySlider from '../../views/Explore/CategorySlider';

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

const SHARINGSANTAII = sharingSantaii.map((vid) => {
  return createVid(vid.id, vid.title, vid.description);
});

const ONLINECLASS = onlineClass.map((vid) => {
  return createVid(vid.id, vid.title, vid.description);
});

const POSTS = posts.map((post) => {
  return {
    id: String(post.id),
    title: post.title.rendered,
    cover: post.yoast_head_json.og_image[0].url,
    content: post.content.rendered,
    link: post.link,
    type: 'WEBSITE',
  };
});

const SECTIONS = [
  {
    title: 'Search',
    data: [],
  },
  {
    title: 'Category',
    data: [
      'All Category',
      'Digital Business',
      'Artificial Intelligence',
      'Blockchain',
      'IPFS',
    ],
  },
  {
    title: 'Seminar and Workshop',
    horizontal: true,
    data: SEMINARWORKSHOP,
    viewAll: 'AllSeminar',
  },
  {
    title: 'Sharing SantAII',
    horizontal: true,
    data: SHARINGSANTAII,
    viewAll: 'AllSharing',
  },
  {
    title: 'Online Course',
    horizontal: true,
    data: ONLINECLASS,
    viewAll: 'AllClass',
  },
  {
    title: 'Blog and News',
    horizontal: true,
    data: POSTS,
    viewAll: 'AllSeminar',
  },
];

const Search = () => {
  const { colors } = useTheme();
  return (
    <Container mt={8}>
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

          return (
            <HorizontalSection
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
