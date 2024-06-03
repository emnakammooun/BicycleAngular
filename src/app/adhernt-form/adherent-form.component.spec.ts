import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherentFormComponent } from './adherent-form.component';

describe('AdherntFormComponent', () => {
  let component: AdherentFormComponent;
  let fixture: ComponentFixture<AdherentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdherentFormComponent]
    });
    fixture = TestBed.createComponent(AdherentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
