import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancedScorecardSettingComponent } from './balanced-scorecard-setting.component';

describe('BalancedScorecardSettingComponent', () => {
  let component: BalancedScorecardSettingComponent;
  let fixture: ComponentFixture<BalancedScorecardSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancedScorecardSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancedScorecardSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
