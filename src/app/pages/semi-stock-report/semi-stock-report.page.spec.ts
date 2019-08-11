import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemiStockReportPage } from './semi-stock-report.page';

describe('SemiStockReportPage', () => {
  let component: SemiStockReportPage;
  let fixture: ComponentFixture<SemiStockReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemiStockReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemiStockReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
