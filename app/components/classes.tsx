import React, {FC} from 'react';
import {View, Text} from 'react-native';
import withObservables from '@nozbe/with-observables'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'

const Clss = ({clss}) => {
  return (
      <View>
        <Text>Name: {clss.name}</Text>
      </View>
  );
};

const EnhancedClss = withObservables(['clss'], ({clss}) => ({
    clss: clss.observe(),
}))(Clss);

const Classes = ({classes}) => {
    console.log(classes);
  return (
      <View>
        <Text>Clsss</Text>
        {classes.map((clss) =>
            <EnhancedClss key={clss.id} clss={clss}/>
        )}
      </View>
  );
};

export default withDatabase(withObservables([], ({database}) => ({
    classes: database.collections.get('classes').query().observe(),
}))(Classes));
