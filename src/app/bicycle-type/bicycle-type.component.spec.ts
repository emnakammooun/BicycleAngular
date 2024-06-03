import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicycleTypeComponent } from './bicycle-type.component';

describe('BicycleTypeComponent', () => {
  let component: BicycleTypeComponent;
  let fixture: ComponentFixture<BicycleTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BicycleTypeComponent]
    });
    fixture = TestBed.createComponent(BicycleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
