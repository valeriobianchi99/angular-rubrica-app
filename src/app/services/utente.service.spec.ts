import { TestBed } from '@angular/core/testing';

import { UtenteService } from './utente.service';

describe('UtenteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtenteService = TestBed.get(UtenteService);
    expect(service).toBeTruthy();
  });
});
