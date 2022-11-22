import React, {useState} from 'react';
import { BleClient } from '@capacitor-community/bluetooth-le';
import TopBarC from './TopBar';
import './ExploreContainer.css';



const ExploreContainer = ({ name }) => {
  const [initilaState, setInitialState] = useState(
    {
      optionalService: '',
      prefixFilter: '',
      devices: [],
      services: [],
      selectedDevice: {},
      selectedService: {},
      message: "Idle",
      isBtEnabled: false,
      loading: false,
      isConnected: false,
      showTerminal: false,
      data: [], //{type: read/write/notify/error, bin: 8 int binary, ascii: ASCII Value}
    }
  )
  
  const catchError = (e, message) => {
    //throw new Error(e)
    initilaState({
      message: message,
      loading: false,
    });
    console.error(e);
  };

  const scanDevices = async () => {
    try {
      await BleClient.initialize();
      let device = await BleClient.requestDevice({
        services: [],
        optionalServices: initilaState.optionalService? [initilaState.optionalService] : [],
        namePrefix: initilaState.prefixFilter ? initilaState.prefixFilter : '',
      });
      setInitialState({
        devices: [device],
      });
        connectBt(device);
    } catch (e) {
      catchError(e, "Scan Error");
    }
  };
  
  const resetBt = ()=>{
    alert("reset bt")
  }

  const connectBt = async (device) => {
    try {
      setInitialState({
        message: "Connecting...",
        services: [],
        loading: true,
        data: [],
        selectedDevice: device,
      })
      await BleClient.initialize();
      await BleClient.disconnect(initilaState.selectedDevice.deviceId);
      await BleClient.connect(initilaState.selectedDevice.deviceId, (id) =>
        console.log(`Device ${id} disconnected!`)
      );
      await BleClient.getServices(initilaState.selectedDevice.deviceId).then(
        (services) => {
          if (services[0]) {
            initilaState({
              message: "Connected",
              services: services,
              loading: false,
              isConnected: true,
            });
          } else {
            initilaState({
              message: "No Services Found",
              loading: false,
              isConnected: false,
            });
          }
        }
      );
    } catch (e) {
      catchError(e, "Cannot Connect Error");
    }
  };

  return (
    <div className="container">
      <TopBarC isBtEnabled={'true'} scanBt={scanDevices} reset={resetBt}/>
      
    </div>
  );
};

export default ExploreContainer;
