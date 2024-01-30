import {
  List
} from 'react-native-paper';
import { Call } from './Call';
import {useSettingsContext} from "../containers/SettingsContext";

export function Quay({quay, calls}) {
  const {settings} = useSettingsContext();
  
  return (
      <List.Section>
        <List.Subheader>{quay.description}</List.Subheader>
        {calls.filter(call => call.quay.id === quay.id).filter(call => settings.lines.includes(call.serviceJourney.line.publicCode)).slice(0, 5).map(call => (
          <Call key={call.aimedDepartureTime} call={call} />
          ))}
      </List.Section>
  );
}