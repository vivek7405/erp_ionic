import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgStockReportPage } from './fg-stock-report.page';

describe('FgStockReportPage', () => {
  let component: FgStockReportPage;
  let fixture: ComponentFixture<FgStockReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgStockReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgStockReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
