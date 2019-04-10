import { TestBed } from '@angular/core/testing';

import { RoleDashboardService } from './role-dashboard.service';

describe('RoleDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleDashboardService = TestBed.get(RoleDashboardService);
    expect(service).toBeTruthy();
  });
});
