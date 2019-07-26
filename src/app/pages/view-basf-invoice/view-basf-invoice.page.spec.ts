import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBasfInvoicePage } from './view-basf-invoice.page';

describe('ViewBasfInvoicePage', () => {
  let component: ViewBasfInvoicePage;
  let fixture: ComponentFixture<ViewBasfInvoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBasfInvoicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBasfInvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
