import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseChallanReportPage } from './close-challan-report.page';

describe('CloseChallanReportPage', () => {
  let component: CloseChallanReportPage;
  let fixture: ComponentFixture<CloseChallanReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseChallanReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseChallanReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
