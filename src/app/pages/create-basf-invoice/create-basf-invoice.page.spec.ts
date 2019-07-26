import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBasfInvoicePage } from './create-basf-invoice.page';

describe('CreateBasfInvoicePage', () => {
  let component: CreateBasfInvoicePage;
  let fixture: ComponentFixture<CreateBasfInvoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBasfInvoicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBasfInvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
