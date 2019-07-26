import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasfInvoiceChallanDeductionComponent } from './basf-invoice-challan-deduction.component';

describe('BasfInvoiceChallanDeductionComponent', () => {
  let component: BasfInvoiceChallanDeductionComponent;
  let fixture: ComponentFixture<BasfInvoiceChallanDeductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasfInvoiceChallanDeductionComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasfInvoiceChallanDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
