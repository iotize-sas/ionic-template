import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rssi',
  templateUrl: './rssi.component.html',
  styleUrls: ['./rssi.component.scss'],
})
export class RssiComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() bars: number;

  private _colorMap = ['#E51E25', '#FEC212','#FEC212','#0FAF4B', '#0FAF4B'];

  get color() {
    return this._colorMap[this.bars -1]
  };

}
