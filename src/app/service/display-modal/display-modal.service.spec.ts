import { TestBed } from '@angular/core/testing';

import { DisplayModalService } from './display-modal.service';

describe('DisplayModalService', () => {
  let service: DisplayModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
