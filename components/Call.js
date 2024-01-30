import {
  List,
  Text,
  Avatar
} from 'react-native-paper';

import { indications, getIndicationColor } from '../utils.js';
import {Counter} from "./Counter";

const lineMap = {
  '1': 'lightblue',
  '2': 'orange',
  '3': 'purple',
  '4': 'blue',
  '5': 'green'
}

const getLineColor = (line) => {
  return lineMap[line];
}

function Line({line}) {
  return <Avatar.Text
    style={{
      marginLeft: 12,
      backgroundColor: getLineColor(line.publicCode)
    }}
    size={24}
    label={line.publicCode}
  />
}

export function Call({call}) {
  return (
    <List.Item
      key={call.aimedDepartureTime}
      left={() => <Line line={call.serviceJourney.line} />}
      title={<Counter date={call.expectedDepartureTime} direction="down" />}
      right={() => (<Text
        style={{backgroundColor: getIndicationColor(indications(call))}}
        >
        {indications(call)}/5
      </Text>)}
    />)
}