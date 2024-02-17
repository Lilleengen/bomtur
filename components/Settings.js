import { useState } from 'react';
import {
  View,
} from 'react-native';
import { removeElemFromArr } from '../utils.js';
import {ToggleButton, Button, Text} from "react-native-paper";
import {StopSearch} from "./StopSearch";

export function Settings({settings, setSettings}) {
  const [settingsFields, setSettingsFields] = useState({
    lines: [],
    stops: [],
    ...settings
  });
  
  const toggleLine = (line) => {
    setSettingsFields({
      ...settingsFields,
      lines: settingsFields.lines.includes(line)
        ? removeElemFromArr(settingsFields.lines, line)
        : [...settingsFields.lines, line]
    });
  }
  
  const [showStopSearch1, setShowStopSearch1] = useState(false);
  const [showStopSearch2, setShowStopSearch2] = useState(false);

  return (
    <View>
      <Text>Linjer</Text>
      <View style={{flexDirection: 'row'}}>
        {['1', '2', '3', '4', '5'].map(line => <ToggleButton
          icon={() => <Text>{line}</Text>}
          key={`${line}-toggle`}
          value={line}
          status={settingsFields.lines.includes(line) ? 'checked' : 'unchecked'}
          onPress={() => toggleLine(line)}
        />)}
      </View>
      <Text>Stop 1</Text>
      <Button icon="bus-stop" mode="contained" onPress={() => {
        setShowStopSearch1(true);
      }}>
        {settingsFields.stops[0] ? settingsFields.stops[0].name : 'Add'}
      </Button>
      <StopSearch visible={showStopSearch1} onSelect={(stop) => {
        setSettingsFields({
          ...settingsFields,
          stops: settingsFields.stops[1] ? [stop, settingsFields.stops[1]] : [stop]
        });
        setShowStopSearch1(false);
      }} />
      <Text>Stop 2</Text>
      <Button icon="bus-stop" mode="contained" onPress={() => {
        setShowStopSearch2(true);
      }}>
        {settingsFields.stops[1] ? settingsFields.stops[1].name : 'Add'}
      </Button>
      <StopSearch visible={showStopSearch2} onSelect={(stop) => {
        setShowStopSearch2(false);
        setSettingsFields({
          ...settingsFields,
          stops: settingsFields.stops[0] ? [settingsFields.stops[0], stop] : [stop]
        })
      }} />
      <Button onPress={() => {
        setSettings(settingsFields);
      }}>Lagre og lukk</Button>
    </View>);
}