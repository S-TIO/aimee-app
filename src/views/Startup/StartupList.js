import propTypes from 'prop-types';
import { View } from 'react-native';

import DataList from '../../components/DataList';

const StartupList = ({ startups }) => {
  return (
    <View>
      {startups.map((mentor, index) => {
        return (
          <DataList
            id={mentor.id}
            key={mentor.name + index}
            name={mentor.name}
            description={mentor.description}
            location={mentor.location}
            image={mentor.image}
            businessmodel={mentor.modelBisnis}
            sektorindustri={mentor.sektorIndustri}
            ukurantim={mentor.ukuranTim}
            pendanaan={mentor.pendanaan}
            tahapperkembangan={mentor.tahapPerkembangan}
            contact={mentor.contact}
          />
        );
      })}
    </View>
  );
};

StartupList.propTypes = {
  startups: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      description: propTypes.string,
      location: propTypes.string,
    })
  ),
};

export default StartupList;
