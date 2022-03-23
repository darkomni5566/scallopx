import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsManagementComponent } from './coins-management.component';

describe('CoinsManagementComponent', () => {
  let component: CoinsManagementComponent;
  let fixture: ComponentFixture<CoinsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
