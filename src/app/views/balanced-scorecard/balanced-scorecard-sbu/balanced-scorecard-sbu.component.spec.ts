import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancedScorecardSbuComponent } from './balanced-scorecard-sbu.component';

describe('BalancedScorecardSbuComponent', () => {
  let component: BalancedScorecardSbuComponent;
  let fixture: ComponentFixture<BalancedScorecardSbuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancedScorecardSbuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancedScorecardSbuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
