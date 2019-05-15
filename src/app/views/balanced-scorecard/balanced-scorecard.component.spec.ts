import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancedScorecardComponent } from './balanced-scorecard.component';

describe('BalancedScorecardComponent', () => {
  let component: BalancedScorecardComponent;
  let fixture: ComponentFixture<BalancedScorecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancedScorecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancedScorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
