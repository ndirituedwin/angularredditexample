import { TestBed } from '@angular/core/testing';

import { HttpheadersService } from './httpheaders.service';

describe('HttpheadersService', () => {
  let service: HttpheadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpheadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
