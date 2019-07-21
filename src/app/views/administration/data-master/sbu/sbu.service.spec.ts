import { TestBed } from '@angular/core/testing';

import { SbuService } from './sbu.service';

describe('SbuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SbuService = TestBed.get(SbuService);
    expect(service).toBeTruthy();
  });
});
