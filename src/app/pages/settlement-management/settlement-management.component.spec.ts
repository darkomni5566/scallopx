import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementManagementComponent } from './settlement-management.component';

describe('SettlementManagementComponent', () => {
  let component: SettlementManagementComponent;
  let fixture: ComponentFixture<SettlementManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettlementManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
