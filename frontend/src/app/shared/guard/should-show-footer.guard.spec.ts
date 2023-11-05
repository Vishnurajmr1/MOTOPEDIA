import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { shouldShowFooterGuard } from './should-show-footer.guard';

describe('shouldShowFooterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => shouldShowFooterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
