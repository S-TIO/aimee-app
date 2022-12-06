import propTypes from 'prop-types';
import { View } from 'react-native';

import DataList from '../../components/DataList';

const StartupList = ({ startups }) => {
  return (
    <View>
      {startups.map((mentor, index) => {
        return (
          <DataList
            key={mentor.name + index}
            name={mentor.name}
            description={mentor.description}
            location={mentor.address}
            image={mentor.image}
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
