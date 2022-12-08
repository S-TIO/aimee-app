import propTypes from 'prop-types';
import { View } from 'react-native';

import DataList from '../../components/DataList';

const MitraList = ({ mitras }) => {
  return (
    <View>
      {mitras.map((mentor, index) => {
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

MitraList.propTypes = {
  mitras: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      description: propTypes.string,
      location: propTypes.string,
    })
  ),
};

export default MitraList;
