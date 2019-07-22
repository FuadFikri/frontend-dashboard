import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBarSbuComponent } from './card-bar-sbu.component';

describe('CardBarSbuComponent', () => {
  let component: CardBarSbuComponent;
  let fixture: ComponentFixture<CardBarSbuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBarSbuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBarSbuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
