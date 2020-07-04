import SubX from 'subx';
import {SubxObj} from 'subx/build/types';

export type StoreType = {
  ready: boolean;
  devices: MediaDeviceInfo[];
  init: Function;
};

const storeObj: StoreType = {
  ready: false,
  devices: [],
  async init() {
    this.devices = (await navigator.mediaDevices.enumerateDevices()).map(d =>
      d.toJSON()
    );
  },
};

const store = SubX.create(storeObj) as SubxObj<StoreType>;

export default store;
