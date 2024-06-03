import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicycleFormComponent } from './bicycle-form.component';

describe('BicycleFormComponent', () => {
  let component: BicycleFormComponent;
  let fixture: ComponentFixture<BicycleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BicycleFormComponent]
    });
    fixture = TestBed.createComponent(BicycleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
