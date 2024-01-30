import {useState, useEffect} from 'react';
import {List, TextInput, Portal, Modal} from "react-native-paper";
import {fetchStops} from "../utils.js";


export function StopSearch({visible, onSelect}) {
  const [searchString, setSearchString] = useState('');
  const [stops, setStops] = useState(undefined);
  
  useEffect(() => {
    if (visible && !stops) {
      fetchStops().then(stops => {
        setStops(stops['data']['stopPlaces'])
      });
    }
  }, [visible]);

  return (<Portal>
    <Modal
      visible={visible}
      contentContainerStyle={{
        backgroundColor: 'white',
        padding: 20
      }}
    >
      <TextInput
        label="Søk etter stopp"
        value={searchString}
        onChangeText={text => setSearchString(text)}
      />
      {stops && (
        <List.Section>
          {stops.filter(({name}) => name.toLowerCase().startsWith(searchString.toLocaleLowerCase())).slice(0, 10).map(result =>
            <List.Item
              key={result.id}
              title={`${result.name} (${result.transportMode.join(', ')})`}
              onPress={() => onSelect(result)}
            />
          )}
        </List.Section>
      )}
    </Modal>
  </Portal>)
}