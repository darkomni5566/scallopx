import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycStatusComponent } from './kyc-status.component';

describe('KycStatusComponent', () => {
  let component: KycStatusComponent;
  let fixture: ComponentFixture<KycStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KycStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
