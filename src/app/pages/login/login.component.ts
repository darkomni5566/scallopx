import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/service/server.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  Obj: { email: any; };
  selectedType:any='password'
  locationAdress: any;
  helper = new JwtHelperService();


  constructor(public server: ServerService, public router: Router) {
    localStorage.clear()
   }

  ngOnInit(): void {

    this.loginFormValidation()
    this.getThirdPartyLocation();
    this.server.getIPAddress()
  }
  
  loginFormValidation() {
    this.loginForm = new FormGroup({
      'email': new FormControl("", [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=^.{8,25}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)]),
      // 'rememberMe': new FormControl('',[Validators.required]),
    })
    
  }
  get password() { return this.loginForm.get('password') }

  //==========================login================================//

  login() {
    this.server.showSpinner()
    this.server.postApi('auth', {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      userAgent: 'Mozilla Firefox',
      location: this.locationAdress,
      isSentOtp:false
    }).subscribe(
      (res: any) => {
        this.server.hideSpinner()
        if (res.status == 200) {
          this.server.showSuccToast(res.message)
          localStorage.setItem('token', res.data.BearerToken);
          localStorage.setItem('roleId', btoa(this.helper.decodeToken(res.data.BearerToken).roleId))
          localStorage.setItem('userId', btoa(this.helper.decodeToken(res.data.BearerToken).userId))

          if (this.loginForm.value.rememberMe == true) {
            let remData = {
              "email": this.loginForm.value.email,
            }
            localStorage.setItem('rememberMe', JSON.stringify(remData))
          }

          // 611794390d22c5516b69295d
          // localStorage add roleId

          this.server.getRolePermission()
          // this.router.navigate(['dashboard']);
          
        }
        else if (res.status == 400 || res.status == 404) {
          this.server.showErrToast(res.message)
        }
      },
      (err: any) => {
        this.server.hideSpinner();
        if (err.status == 401 || err.status == 400 || err.status == 404) {
          this.server.showErrToast(err.error.message  );
          localStorage.removeItem('token');
        } else {
          this.server.showErrToast(err.message);
        }
      }
    )
    this.Obj = {
      'email': this.loginForm.value.email,
    }
    localStorage.setItem('data', JSON.stringify(this.Obj))
  }



  

  getThirdPartyLocation()
  {
    this.server.getThirdPartyApi("https://ipinfo.io/?token=c3671aac833bab").subscribe((res:any)=>{
      
      this.locationAdress = res.city;
    });
  }

}
