import {
  Text,
} from 'react-native-paper';

import { useState, useEffect } from 'react';
import {msToS, sToMAndS} from "../utils";

export const calculate = (date, direction) => {
  if (direction === 'up') {
    return new Date() - (new Date(date));
  }
  
  if (direction === 'down') {
    return new Date(date) - (new Date());
  }
  
  return undefined;
};

export function Counter({date, direction, textVariant}) {
  const [counter, setCounter] = useState(calculate(date, direction));
  
  useEffect(() => {
    setCounter(calculate(date, direction));
    const intervalId = setInterval(() => {
      setCounter(calculate(date, direction));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [date, direction]);
  
  if (!['up', 'down'].includes(direction)) {
    return null;
  }
  
  return (<Text variant={textVariant}>{sToMAndS(msToS(counter))}</Text>);
}
