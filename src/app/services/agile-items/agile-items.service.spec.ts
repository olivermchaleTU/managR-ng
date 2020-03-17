/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AgileItemsService } from './agile-items.service';

describe('Service: AgileItems', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgileItemsService]
    });
  });

  it('should ...', inject([AgileItemsService], (service: AgileItemsService) => {
    expect(service).toBeTruthy();
  }));
});
