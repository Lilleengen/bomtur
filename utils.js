export const indications = (call) => {
  if (call.cancellation) {
    return 0;
  }
  if (call.predictionInaccurate) {
    return 1;
  }
  if (!call.realtime) {
    return 2;
  }
  if (call.realtimeState !== 'updated') {
    return 3;
  }
  if (call.aimedDepartureTime !== call.expectedDepartureTime) {
    return 4;
  }
  return 5;
}

export const getIndicationColor = (n) => {
  if (n === 0) {
    return '#d2222d';
  }

  if (n === 4) {
    return '#ffbf00';
  }

  if (n === 5) {
    return '#238823';
  }

  return '#ff781f';
}

export const msToS = (ms) => Math.round(ms / 1000);
export const sToMAndS = (s) => Math.floor(s/60) === 0 ? `${s}s` : `${Math.floor(s/60)}m ${s % 60}s`;

export const removeElemFromArr = (arr, el) => {
  const newArr = [...arr];
  newArr.splice(newArr.indexOf(el), 1);
  return newArr;
}

export const fetchCalls = (stop) => fetch("https://api.entur.io/journey-planner/v3/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ET-Client-Name": "henrik@lilleengen.no-bomtur"
    },
    body: JSON.stringify({
      query: `{
  stopPlace(id: "${stop}") {
    estimatedCalls(arrivalDeparture: departures, includeCancelledTrips: true, numberOfDepartures: 30) {
      realtime
      aimedDepartureTime
      expectedDepartureTime
      cancellation
      serviceJourney {
        line {
          publicCode
        }
      }
      realtimeState
      predictionInaccurate
      notices {
        text
      }
      quay {
        description
        id
      }
    }
    name
    situations {
      description {
        language
        value
      }
    }
  }
}`})})
  .then(r => r.json());

export const fetchStops = () => fetch("https://api.entur.io/journey-planner/v3/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "ET-Client-Name": "henrik@lilleengen.no-bomtur"
  },
  body: JSON.stringify({
    query: `{
  stopPlaces {
    id
    name
    longitude
    latitude
    transportMode
  }
}`})})
  .then(r => r.json());


export const getQuaysFromCalls = (calls) => calls.map(call => call.quay).reduce((acc, curr) => {
  if (!acc.find(accQuey => accQuey.id === curr.id)) {
    return [...acc, curr];
  }
  return acc;
  }, []).sort((a, b) => a.id.localeCompare(b.id));

export const calculateDistance = (stop, pos) => {
  const latDiff = stop.latitude - pos.coords.latitude;
  const longDiff = stop.longitude - pos.coords.longitude;
  
  return Math.hypot(latDiff, longDiff);
}