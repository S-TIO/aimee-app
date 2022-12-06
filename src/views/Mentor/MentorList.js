import propTypes from 'prop-types';
import { View } from 'react-native';

import DataList from '../../components/DataList';

const MentorList = ({ mentors }) => {
  return (
    <View>
      {mentors.map((mentor, index) => {
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

MentorList.propTypes = {
  mentors: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      description: propTypes.string,
      location: propTypes.string,
    })
  ),
};

export default MentorList;
