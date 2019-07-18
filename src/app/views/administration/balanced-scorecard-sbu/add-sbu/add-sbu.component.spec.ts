import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSbuComponent } from './add-sbu.component';

describe('AddSbuComponent', () => {
  let component: AddSbuComponent;
  let fixture: ComponentFixture<AddSbuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSbuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSbuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
