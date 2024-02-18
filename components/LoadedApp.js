import {
  View,
} from 'react-native';
import {Quays} from "./Quays";
import {Appbar, TouchableRipple} from "react-native-paper";
import {useSettingsContext} from "../containers/SettingsContext";
import {useApiContext} from "../containers/ApiContext";

export function LoadedApp() {
  const {showSettings} = useSettingsContext();
  const {fetch, data} = useApiContext();
  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Content title={`Avganger fra ${data.stop}`} />
        <Appbar.Action icon="cog" onPress={showSettings} />
      </Appbar.Header>
      <TouchableRipple style={{flex: 1}} onPress={fetch}>
        <Quays />
      </TouchableRipple>
    </View>
  );
}