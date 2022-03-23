import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { KycManagementComponent } from './kyc-management.component';

describe('KycManagementComponent', () => {
  let component: KycManagementComponent;
  let fixture: ComponentFixture<KycManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycManagementComponent ],
      providers:[
        {provide: Router}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KycManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
