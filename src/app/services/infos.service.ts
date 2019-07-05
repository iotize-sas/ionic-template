import { Injectable } from '@angular/core';
import { TapService } from './tap.service';
import { Events } from '@ionic/angular';
import { Observable, Observer } from 'rxjs';
import { HostProtocol, TargetProtocol } from '@iotize/device-client.js/device/model';

@Injectable({
  providedIn: 'root'
})
export class InfosService {

  constructor(public tapService: TapService, public events: Events) {
  }

  getInfos() {
    return new Observable<{}>(observer => {
      const result = {};
      this.fetchInfos(observer, result);
    })
  }

  private async fetchInfos(observer: Observer<{}>, result: {}) {
    for (let prop in this.requestMap) {

      try {
        result[prop] = await this[this.requestMap[prop]]();
        observer.next(result);
      } catch (error) {
        console.error(error);
      }
    }
  }
    
  private requestMap = {
    'model': 'getModel',
    'sn': 'getSN',
    'appName': 'getAppName',
    'currentProtocol': 'getCurrentProtocol',
    'availableProtocols': 'getAvailableProtocols',
    'firmwareVersion': 'getFirmwareVersion',
    'targetCurrentProtocol': 'getTargetCurrentProtocol',
    'targetAvailableProtocol': 'getTargetAvailableProtocol',
    'targetFirmwareVersion': 'getTargetFirmwareVersion',

  }

  private async getModel() {
    return (await this.tapService.tap.service.device.getModelName()).body();
  }
  private async getSN() {
    return (await this.tapService.tap.service.device.getSerialNumber()).body();
  }
  private async getAppName() {
    return (await this.tapService.tap.service.device.getModelName()).body();
  }
  private async getCurrentProtocol() {
    return HostProtocol[(await this.tapService.tap.service.interface.getCurrentHostProtocol()).body()];
  }
  private async getAvailableProtocols() {
    return (await this.tapService.tap.service.interface.getAvailableHostProtocols()).body()
    .map(protocol => HostProtocol[protocol]);
  }
  private async getFirmwareVersion() {
    return (await this.tapService.tap.service.device.getFirmwareVersion()).body();
  }
  private async getTargetCurrentProtocol() {
    return TargetProtocol[(await this.tapService.tap.service.target.getProtocol()).body()];
  }
  private async getTargetAvailableProtocol() {
    return (await this.tapService.tap.service.target.getAvailableProtocols()).body()
    .map(protocol => TargetProtocol[protocol]);
  }
  private async getTargetFirmwareVersion() {
    const body = (await this.tapService.tap.service.target.getFirmwareVersion()).body();
    return `${body.major}.${body.minor}.${body.patch}`
  }

}