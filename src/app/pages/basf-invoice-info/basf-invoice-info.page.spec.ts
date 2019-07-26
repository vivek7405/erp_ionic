import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasfInvoiceInfoPage } from './basf-invoice-info.page';

describe('BasfInvoiceInfoPage', () => {
  let component: BasfInvoiceInfoPage;
  let fixture: ComponentFixture<BasfInvoiceInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasfInvoiceInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasfInvoiceInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
