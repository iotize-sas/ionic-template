import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rssiToBars'
})
export class RssiToBarsPipe implements PipeTransform {

  private DISPLAY_TWO_BARS = -90;
  private DISPLAY_THREE_BARS = -80;
  private DISPLAY_FOUR_BARS = -70;
  private DISPLAY_FIVE_BARS = -60;

  transform(value: number): any {
    if (value < this.DISPLAY_TWO_BARS) {
      return 1;
    }
    if (value < this.DISPLAY_THREE_BARS) {
      return 2;
    }
    if (value < this.DISPLAY_FOUR_BARS) {
      return 3;
    }
    if (value < this.DISPLAY_FIVE_BARS) {
      return 4;
    }
    return 5;
  }

}
