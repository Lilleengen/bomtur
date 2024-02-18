import {
  View,
} from 'react-native';
import {useApiContext} from "../containers/ApiContext";
import {calculate} from "./Counter";
import {getQuaysFromCalls, msToS, sToMAndS} from "../utils";
import {Quay} from "./Quay";
import {Divider, Text, Card} from "react-native-paper";
import {Fragment, useEffect, useState} from "react";
import { NativeCardView } from '../modules/native-card';

export function Quays() {
  const {data} = useApiContext();
  const quays = getQuaysFromCalls(data.calls);
  
  const [counter, setCounter] = useState(calculate(data.lastUpdated, 'up'));

  useEffect(() => {
    setCounter(calculate(data.lastUpdated, 'up'));
    const intervalId = setInterval(() => {
      setCounter(calculate(data.lastUpdated, 'up'));
      }, 1000);

    return () => clearInterval(intervalId);
    }, [data.lastUpdated]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, margin: 10, minHeight: 50}}>
        <NativeCardView style={{flex: 1}} text={`Oppdatert for ${sToMAndS(msToS(counter))} siden`} />
      </View>
      {quays.map(quay => <Fragment key={`${quay.id}-top`}>
        <Divider />
        <Quay key={quay.id} quay={quay} calls={data.calls} />
      </Fragment>)}
    </View>
  );
}