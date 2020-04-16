/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ItemUtilityService } from './item-utility.service';

describe('Service: ItemUtility', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemUtilityService]
    });
  });

  it('should ...', inject([ItemUtilityService], (service: ItemUtilityService) => {
    expect(service).toBeTruthy();
  }));
});
