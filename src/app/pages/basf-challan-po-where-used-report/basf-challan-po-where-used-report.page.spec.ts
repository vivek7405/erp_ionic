import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasfChallanPoWhereUsedReportPage } from './basf-challan-po-where-used-report.page';

describe('BasfChallanPoWhereUsedReportPage', () => {
  let component: BasfChallanPoWhereUsedReportPage;
  let fixture: ComponentFixture<BasfChallanPoWhereUsedReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasfChallanPoWhereUsedReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasfChallanPoWhereUsedReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
