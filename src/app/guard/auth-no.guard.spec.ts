import { TestBed } from '@angular/core/testing';

import { AuthNoGuard } from './auth-no.guard';

describe('AuthNoGuard', () => {
  let guard: AuthNoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthNoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
