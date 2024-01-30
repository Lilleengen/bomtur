import {
  View,
} from 'react-native';
import {useApiContext} from "../containers/ApiContext";
import {Counter} from "./Counter";
import {getQuaysFromCalls} from "../utils";
import {Quay} from "./Quay";
import {Divider, Text, Card} from "react-native-paper";
import {Fragment} from "react";

export function Quays() {
  const {data} = useApiContext();
  const quays = getQuaysFromCalls(data.calls);
  
  return (
    <View>
      <Card style={{margin: 10}}>
        <Card.Content>
          <Text variant="labelLarge">Oppdatert <Counter date={data.lastUpdated} direction="up" textVariant="labelLarge"/> siden</Text>
        </Card.Content>
      </Card>
      {quays.map(quay => <Fragment key={`${quay.id}-top`}>
        <Divider />
        <Quay key={quay.id} quay={quay} calls={data.calls} />
      </Fragment>)}
    </View>
  );
}