import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDriversComponent } from './owner-drivers.component';

describe('OwnerDriversComponent', () => {
  let component: OwnerDriversComponent;
  let fixture: ComponentFixture<OwnerDriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerDriversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
