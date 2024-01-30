import { useState, useEffect, createContext, useContext } from 'react';
import { Text } from 'react-native-paper';

import * as Location from 'expo-location';

const LocationContext = createContext({
  location: undefined
});

export const useLocationContext = () => useContext(LocationContext);

export function LocationContextWrapper({children}) {
  const [location, setLocation] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState(undefined);

  useEffect(() => {
    (async () => {

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    }, []);
  
  if (errorMsg) {
    return <Text>{errorMsg}</Text>
  }
  
  if (!location) {
    return null;
  }
  
  return <LocationContext.Provider value={{
    location
  }}>
    {children}
  </LocationContext.Provider>
}