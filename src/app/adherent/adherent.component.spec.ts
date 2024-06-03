import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherentComponent } from './adherent.component';

describe('AdherntComponent', () => {
  let component: AdherentComponent;
  let fixture: ComponentFixture<AdherentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdherentComponent]
    });
    fixture = TestBed.createComponent(AdherentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
