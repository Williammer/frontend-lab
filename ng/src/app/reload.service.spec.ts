import { TestBed, inject } from '@angular/core/testing';

import { ReloadService } from './reload.service';

describe('ReloadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReloadService]
    });
  });

  it('should be created', inject([ReloadService], (service: ReloadService) => {
    expect(service).toBeTruthy();
  }));
});
