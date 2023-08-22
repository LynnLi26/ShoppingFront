import { TestBed } from '@angular/core/testing';

import { CartNumService } from './cart-num.service';

describe('CartNumService', () => {
  let service: CartNumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartNumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
