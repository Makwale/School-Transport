import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersTransportsComponent } from './owners-transports.component';

describe('OwnersTransportsComponent', () => {
  let component: OwnersTransportsComponent;
  let fixture: ComponentFixture<OwnersTransportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnersTransportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnersTransportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
