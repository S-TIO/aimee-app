import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

import sharingSantaii from '../../_DATA/sharing-santaii.json';
import Divider from '../../components/Divider';
import SafeAreaView from '../../components/SafeAreaView';
import VideoCardLoader from '../../components/VerticalCardLoader';
import Container from '../../layout/Container';
import DescriptionSheet from '../../views/PlayVideo/DescriptionSheet';
import RecommendedVideo from '../../views/PlayVideo/RecommendedVideo';
import VideoContainer from '../../views/PlayVideo/VideoContainer';
import VideoDescription from '../../views/PlayVideo/VideoDescription';
import { db } from '../../../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const PlayVideo = ({ route, navigation }) => {
  const data = route.params.data;
  const { colors } = useTheme();

  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [videoHeight, setVideoHeight] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleOnLoadEnd = () => setVideoLoaded(true);

  const filterVideo = (videos) => {
    return videos.filter((vid) => vid.id !== data.id);
  };

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

  useEffect(() => {
    if (videoLoaded) {
      setVideoLoaded(false);
    }
  }, [data.id]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStatusBarBackgroundColor(colors.surface);
      setStatusBarStyle('dark');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView>
      <View
        onLayout={(event) => setVideoHeight(event.nativeEvent.layout.height)}
      >
        <VideoContainer source={data.link} onLoadEnd={handleOnLoadEnd} />
        {!videoLoaded && (
          <View
            style={[
              styles.videoLoader,
              {
                backgroundColor: colors.disabled,
              },
            ]}
          />
        )}
      </View>

      <ScrollView>
        <View>
          <VideoDescription
            title={data.title}
            description={data.description}
            onOpen={() => {
              setDescriptionOpen(true);
            }}
          />
        </View>

        <Divider />

        {videoLoaded && (
          <RecommendedVideo videos={filterVideo(SHARINGSANTAII)} />
        )}

        {!videoLoaded && (
          <Container>
            <VideoCardLoader />
            <VideoCardLoader />
          </Container>
        )}
      </ScrollView>

      <DescriptionSheet
        top={videoHeight}
        open={descriptionOpen}
        onClose={() => {
          setDescriptionOpen(false);
        }}
      >
        <Container>
          <Text>{data.description}</Text>
        </Container>
      </DescriptionSheet>
    </SafeAreaView>
  );
};

export default PlayVideo;

const styles = StyleSheet.create({
  videoLoader: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
});
