import { TestBed } from '@angular/core/testing';

import { VirtualTwinsService } from './virtual-twins.service';

describe('VirtualTwinsService', () => {
  let service: VirtualTwinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualTwinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
