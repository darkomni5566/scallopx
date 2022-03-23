import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { BrowserModule , By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ServerService } from 'src/app/service/server.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de : DebugElement
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        // RouterTestingModule
      ],
      providers: [Router]
    })


   
    .compileComponents().then(() =>{
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      de =  fixture.debugElement.query(By.css('form'));
      el = de.nativeElement
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the login method', async(()=>{
    fixture.detectChanges();
    spyOn(component,'login');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.login).toHaveBeenCalledTimes(0);
  }));


  it('form should be invalid' ,()=>{
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  // it('form should be valid' ,()=>{
  //   component.loginForm.controls['email'].setValue('tulika.m@scallopx.com');
  //   component.loginForm.controls['password'].setValue('Test@1234');
  //   expect(component.loginForm.valid).toBeTruthy();
  // });


  //Test cases for email

  // it('[Email-Check] - should check user email address is invalid' ,()=>{
  //   let email = component.loginForm.controls['email'];
  //   expect(email.valid).toBeFalsy();
  //   expect(email.touched).toBeTruthy();
  //   expect(email.errors['required']).toBeTruthy();
  //   email.setValue('tulika');

  //   expect(email.errors['email']).toBeTruthy();

    
  // });

  // it('[Email-Check] - should check user correct email addressis entered' ,()=>{
  //   let email = component.loginForm.controls['email'];
  //   email.setValue('tulika.m@scallopx.com');

  //   expect(email.errors['pattern']).toBeNull();
  // });


​ // Test Cases for password
  // it('[password-Check] - should check user password is invalid' ,()=>{
  //   let password = component.loginForm.controls['password'];
  //   expect(password.valid).toBeFalsy();
  //   expect(password.touched).toBeTruthy();
  //   expect(password.errors['required']).toBeTruthy();
  //   password.setValue('1234');
  //   expect(password.errors['pattern']).toBeTruthy();
    
  // });
  // it('[password-Check] - should check user correct email addressis entered' ,()=>{
  //   let password = component.loginForm.controls['password'];
  //   password.setValue('Test@1234');
  //   expect(password.errors['password']).toBeNull();
  // });

});


