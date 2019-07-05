import { Component, OnInit } from '@angular/core';
import { InfosService } from 'src/app/services/infos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.page.html',
  styleUrls: ['./infos.page.scss'],
})
export class InfosPage  {

  constructor(public infos: InfosService) { }
  private _subscription: Subscription;
  tapInfos: {};
  ionViewWillEnter() {
    this._subscription = this.infos.getInfos().subscribe((infos) => {
      this.tapInfos = infos;
    });
  }

  ionViewWillLeave() {
    this._subscription.unsubscribe();
    this.tapInfos = null;
  }
}
