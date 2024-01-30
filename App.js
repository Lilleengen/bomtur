import {SettingsContextWrapper} from "./containers/SettingsContext";
import {ApiContextWrapper} from "./containers/ApiContext";
import {LoadedApp} from "./components/LoadedApp";
import {PaperProvider} from "react-native-paper";
import {LocationContextWrapper} from "./containers/LocationContext";

export default function App() {
  return (
    <PaperProvider>
      <LocationContextWrapper>
        <SettingsContextWrapper>
          <ApiContextWrapper>
            <LoadedApp />
          </ApiContextWrapper>
        </SettingsContextWrapper>
      </LocationContextWrapper>
    </PaperProvider>
  )
};
