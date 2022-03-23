import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycLimitComponent } from './kyc-limit.component';

describe('KycLimitComponent', () => {
  let component: KycLimitComponent;
  let fixture: ComponentFixture<KycLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycLimitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KycLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
