import { TestBed } from '@angular/core/testing';

import { BodeService } from './bode.service';

describe('BodeService', () => {
  let service: BodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
