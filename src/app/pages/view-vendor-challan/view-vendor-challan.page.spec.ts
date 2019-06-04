import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVendorChallanPage } from './view-vendor-challan.page';

describe('ViewVendorChallanPage', () => {
  let component: ViewVendorChallanPage;
  let fixture: ComponentFixture<ViewVendorChallanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVendorChallanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVendorChallanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
