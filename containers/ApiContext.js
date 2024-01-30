import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSettingsContext } from "./SettingsContext";
import {calculateDistance, fetchCalls} from "../utils";
import {ActivityIndicator} from "react-native-paper";
import {useLocationContext} from "./LocationContext";
import {AppState} from "react-native";

const ApiContext = createContext({
  status: 'fetching',
  fetch: () => {},
  data: undefined,
});

export const useApiContext = () => useContext(ApiContext);

export function ApiContextWrapper({children}) {
  const [calls, setCalls] = useState([]);
  const [lastUpdated, setLastUpdated] = useState();
  const [stop, setStop] = useState();
  const [status, setStatus] = useState('fetching');
  const {settings} = useSettingsContext();
  const {location} = useLocationContext();
  
  const fetch = useCallback(() => {
    setStatus('fetching');
    const stop = settings.stops.map(stop => ({
      id: stop.id,
      distance: calculateDistance(stop, location),
      name: stop.name
    }))
      .sort(
        (a, b) => a.distance - b.distance
        )[0];
    const stopId = stop.id;
    const lastUpdated = (new Date()).toISOString();
    fetchCalls(stopId)
      .then(({data}) => {
        setLastUpdated(lastUpdated);
        setStop(stop.name);
        setCalls(data.stopPlace.estimatedCalls);
      })
      .finally(() => setStatus('done'));
  }, [settings, location]);
  
  useEffect(() => {
    fetch();
  }, [fetch]);
  
  useEffect(() => {
    const listner = AppState.addEventListener('change', state => {
      if (state === 'active') {
        fetch();
      }
    });
    
    return () => listner.remove();
  }, [fetch]);

  if (!lastUpdated || calls.length === 0) {
    return <ActivityIndicator />
  }
  
  return (
    <ApiContext.Provider value={{
      status,
      fetch,
      data: {
        calls,
        lastUpdated,
        stop
      }
    }}>
      <>
        {children}
      </>
    </ApiContext.Provider>
  );
}