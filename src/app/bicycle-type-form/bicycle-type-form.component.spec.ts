import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicycleTypeFormComponent } from './bicycle-type-form.component';

describe('BicycleTypeFormComponent', () => {
  let component: BicycleTypeFormComponent;
  let fixture: ComponentFixture<BicycleTypeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BicycleTypeFormComponent]
    });
    fixture = TestBed.createComponent(BicycleTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
