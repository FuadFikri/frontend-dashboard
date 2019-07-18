import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSbuComponent } from './data-sbu.component';

describe('DataSbuComponent', () => {
  let component: DataSbuComponent;
  let fixture: ComponentFixture<DataSbuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSbuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSbuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
