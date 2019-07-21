import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SbuListComponent } from './sbu-list.component';

describe('SbuListComponent', () => {
  let component: SbuListComponent;
  let fixture: ComponentFixture<SbuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SbuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SbuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
