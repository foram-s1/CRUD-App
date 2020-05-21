import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdayListComponent } from './bday-list.component';

describe('BdayListComponent', () => {
  let component: BdayListComponent;
  let fixture: ComponentFixture<BdayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
