import { TestBed } from '@angular/core/testing';

import { StockInFlowService } from './stock-in-flow.service';

describe('StockInFlowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockInFlowService = TestBed.get(StockInFlowService);
    expect(service).toBeTruthy();
  });
});
