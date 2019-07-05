import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RssiComponent } from './rssi.component';

describe('RssiComponent', () => {
  let component: RssiComponent;
  let fixture: ComponentFixture<RssiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssiComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
