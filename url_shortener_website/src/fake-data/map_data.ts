interface Coordinates {
  latitude: number;
  longitude: number;
}

const latlong: Record<string, Coordinates> = {
  AU: { latitude: -27, longitude: 133 },
  BR: { latitude: -10, longitude: -55 },
  BW: { latitude: -22, longitude: 24 },
  IN: { latitude: 20, longitude: 77 },
  KE: { latitude: 1, longitude: 38 },
  MX: { latitude: 23, longitude: -102 },
  MY: { latitude: 2.5, longitude: 112.5 },
  NI: { latitude: 13, longitude: -85 },
  NZ: { latitude: -41, longitude: 174 },
  PH: { latitude: 13, longitude: 122 },
  PL: { latitude: 52, longitude: 20 },
  RU: { latitude: 60, longitude: 100 },
  TH: { latitude: 15, longitude: 100 },
  ZA: { latitude: -29, longitude: 24 },
};

export default latlong;
