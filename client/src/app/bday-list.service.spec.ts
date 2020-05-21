import { TestBed } from '@angular/core/testing';

import { BdayListService } from './bday-list.service';

describe('BdayListService', () => {
  let service: BdayListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdayListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
