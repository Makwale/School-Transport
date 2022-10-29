import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParkingLotComponent } from './create-parking-lot.component';

describe('CreateParkingLotComponent', () => {
  let component: CreateParkingLotComponent;
  let fixture: ComponentFixture<CreateParkingLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateParkingLotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateParkingLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
