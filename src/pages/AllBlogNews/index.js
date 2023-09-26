import { SectionList, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import posts from '../../_DATA/posts.json';
import VerticalSection from '../../components/VerticalSection';


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
        title: '',
        data: POSTS,
    },
];

const AllBlogNews = ({ navigation }) => {
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
        <Appbar.Content title="All Blog and News" />
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

export default AllBlogNews;

const styles = StyleSheet.create({
  content: {
    paddingTop: 16,
  },
});
