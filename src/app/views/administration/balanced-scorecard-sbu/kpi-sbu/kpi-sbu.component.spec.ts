import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiSbuComponent } from './kpi-sbu.component';

describe('KpiSbuComponent', () => {
  let component: KpiSbuComponent;
  let fixture: ComponentFixture<KpiSbuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiSbuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiSbuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
