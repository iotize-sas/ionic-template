import { Injectable } from '@angular/core';
import { IoTizeComService, IoTizeBle, DiscoveredDeviceType } from '@iotize/ng-com-services';
import { Observable } from 'rxjs';
import { ComProtocol } from '@iotize/device-client.js/protocol/api';
import { Events } from '@ionic/angular';

export type AvailableCom = "BLE" | "NFC" | "WIFI";

@Injectable({
  providedIn: 'root'
})
export class ComService implements IoTizeComService {

  private selectedCom: AvailableCom = "BLE";
  public  selectedDevice?: DiscoveredDeviceType;
  
  constructor(private ble: IoTizeBle, public events: Events) {
    this.events.subscribe('NFCPairing', (tag: DiscoveredDeviceType) => this.selectedDevice = tag);
  }
  
  startScan(): Observable<DiscoveredDeviceType> {
    return this.getselectedComService().startScan();
  }
  checkAvailable(): Promise<void> {
    return this.getselectedComService().checkAvailable();
  }
  stopScan(): void | Promise<void> {
    return this.getselectedComService().stopScan();
  }
  getProtocol(device: any): ComProtocol {
    if (device.name) {
      this.selectedDevice = device as DiscoveredDeviceType;
    }
    const protocol = this.getselectedComService().getProtocol(device, {
      connect :{
        timeout: 60000
      },
      disconnect :{
        timeout: 60000
      },
      send :{
        timeout: 600000
      },
    });
    return protocol;
  }

  private getselectedComService(): IoTizeComService {
    switch(this.selectedCom) {
      case "BLE":
        return this.ble;
      default:
        throw new Error("Specified comService not implemented");
    }
  }

  get isScanning() {
    let isScanning: boolean = false;
    switch (this.selectedCom) {
      case "BLE":
        isScanning = this.ble.isScanning;
        break;
    }
    return isScanning;
  }

  devicesArray(): Observable<DiscoveredDeviceType[]> {
    return this.getselectedComService().devicesArray();
  }
  clearDevices(): void {
    const except = [];
    if (!!this.selectedDevice) {
      except.push(this.selectedDevice);
    }
    this.getselectedComService().clearDevices(except);
  }
}
