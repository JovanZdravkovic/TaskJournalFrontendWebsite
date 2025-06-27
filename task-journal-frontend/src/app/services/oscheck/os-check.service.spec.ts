import { TestBed } from '@angular/core/testing';

import { OsCheckService } from './os-check.service';

describe('OsCheckService', () => {
  let service: OsCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
