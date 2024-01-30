import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import {Portal, Modal, Appbar} from "react-native-paper";
import {Settings} from "../components/Settings";

const SettingsContext = createContext({
  settings: {},
  showSettings: () => {}
});

const STORE_SETTINGS_KEY = 'settings';

export const useSettingsContext = () => useContext(SettingsContext);

export function SettingsContextWrapper({children}) {
  const [settings, setSettingsState] = useState({});
  const [initialLoad, setInitialLoad] = useState(true);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    SecureStore.getItemAsync(STORE_SETTINGS_KEY)
        .then(settings => {
          const settingsFromStore = JSON.parse(settings);
          if (settingsFromStore && settingsFromStore.lines && settingsFromStore.stops && settingsFromStore.stops[0].id) {
            setSettingsState(settingsFromStore);
          } else {
            setVisible(true);
          }
        })
        .catch(() => setVisible(true))
        .finally(() => setInitialLoad(false));
  }, []);
  
  const setSettings = useCallback((settings) => {
    setSettingsState(settings);
    setVisible(false);
    SecureStore.setItemAsync(STORE_SETTINGS_KEY, JSON.stringify(settings));
  }, [setSettingsState]);
  
  const showSettings = useCallback(
    () => setVisible(true),
    [setVisible]
  );

  if (initialLoad) {
    return null;
  }
  
  if (Object.keys(settings).length === 0) {
    return <>
      <Appbar.Header>
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <Settings settings={settings} setSettings={setSettings}/>
    </>
  }

  return (
    <SettingsContext.Provider value={{settings, showSettings}}>
      <>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={{
              backgroundColor: 'white',
              padding: 20
            }}
          >
            <Settings settings={settings} setSettings={setSettings}/>
          </Modal>
        </Portal>
        {children}
      </>
    </SettingsContext.Provider>
  );
}