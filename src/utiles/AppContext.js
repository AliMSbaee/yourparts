import {createContext} from 'react';

export const AppContext = createContext({
  token: '',
  setToken: () => {},
  enableAutoLoad: true,
  setEnableAutoLoad: () => {},
  devices: null,
  setDevices: () => {},
  comparingDevices: null,
  setComparingDevices: () => {},
});
