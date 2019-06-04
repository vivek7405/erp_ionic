import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVendorChallanPage } from './create-vendor-challan.page';

describe('CreateVendorChallanPage', () => {
  let component: CreateVendorChallanPage;
  let fixture: ComponentFixture<CreateVendorChallanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVendorChallanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVendorChallanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
