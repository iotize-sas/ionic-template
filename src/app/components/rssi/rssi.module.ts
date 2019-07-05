import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RssiComponent } from './rssi.component';

@NgModule({
    declarations: [RssiComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
    ],
    exports: [
        RssiComponent
    ]
  })
  export class RssiModule {}
