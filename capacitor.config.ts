import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'bluetoothLE',
  webDir: 'build',
  bundledWebRuntime: false,

  plugins: {
    BluetoothLe: {
      displayStrings: {
        scanning: "Scanning...",
        cancel: "Cancel",
        availableDevices: "Available devices",
        noDeviceFound: "No device found"
      }
    }
  }
};

export default config;
