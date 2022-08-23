import { TestBed } from '@angular/core/testing';

import { ServicePokeService } from './service-poke.service';

describe('ServicePokeService', () => {
  let service: ServicePokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
