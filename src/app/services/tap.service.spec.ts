import { TestBed } from '@angular/core/testing';

import { TapService } from './tap.service';

describe('TapServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TapService = TestBed.get(TapService);
    expect(service).toBeTruthy();
  });
});
