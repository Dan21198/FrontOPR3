import { TestBed } from '@angular/core/testing';

import { OldAuthService } from './old.auth.service';

describe('AuthService', () => {
  let service: OldAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OldAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
