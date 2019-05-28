import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartTypesPage } from './part-types.page';

describe('PartTypesPage', () => {
  let component: PartTypesPage;
  let fixture: ComponentFixture<PartTypesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartTypesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
