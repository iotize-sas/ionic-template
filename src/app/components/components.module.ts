import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TapStatusModule } from './tap-status/tap-status.module';
import { RssiModule } from './rssi/rssi.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TapStatusModule,
        RssiModule
    ],
    exports: [
        TapStatusModule,
        RssiModule 
    ]
  })
  export class ComponentsModule {}
