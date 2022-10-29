import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParkingLotComponent } from './edit-parking-lot.component';

describe('EditParkingLotComponent', () => {
  let component: EditParkingLotComponent;
  let fixture: ComponentFixture<EditParkingLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditParkingLotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParkingLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
