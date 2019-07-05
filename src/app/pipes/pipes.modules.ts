import { NgModule } from '@angular/core';
import { RssiToBarsPipe } from './rssiToBars/rssi-to-bars.pipe';

@NgModule({
    imports: [],
    declarations: [RssiToBarsPipe],
    exports: [RssiToBarsPipe],
})

export class PipeModule {}
