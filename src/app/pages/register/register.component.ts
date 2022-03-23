import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/service/server.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { apiEndpoint } from 'src/environments/environment.prod';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  permissionObj: any = {};
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  TooltipLabel = { Name: "name", Iso2: "iso2" };
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  loginForm: FormGroup;
  Obj: { email: any; };
  selectedType: any = 'password'
  selectedTypeConfirm: any = 'password'
  locationAdress: any;
  helper = new JwtHelperService();

  constructor(public server: ServerService, private router: Router, private route: ActivatedRoute) {
    let permitted_routes
    permitted_routes = localStorage.getItem('permitted') ? JSON.parse(atob(localStorage.getItem('permitted'))) : []
    this.permissionObj = permitted_routes.find(x => x.name == 'Register')
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
      'confirmPassword': new FormControl('', [Validators.required]),
      "phone": new FormControl(null, Validators.required),
      // 'mobile': new FormControl('',[Validators.required,Validators.pattern(/^[^0][0-9]*$/),  Validators.maxLength(15)]),
      'rememberMe': new FormControl('', [Validators.required]),
      'rememberMe2': new FormControl('', [Validators.required]),
    })

  }
  get password() { return this.loginForm.get('password') }

  //==========================login================================//
  signup() {
    let url = apiEndpoint.user.userSignup
    let req = {
      "deviceToken": "string",
      "deviceType": "string",
      "email": this.loginForm.value.email,
      "ip": localStorage.getItem('ip'),
      "password": this.loginForm.value.password,
      "phoneNo": this.loginForm.value.phone.internationalNumber,
      "phoneNoWithoutCountryCode": this.loginForm.value.phone.number,
      "role": "USER",
      "userStatus": "UNVERIFIED"
    }
    this.server.showSpinner()
    this.server.postApi(url, req).subscribe((res: any) => {
      this.server.hideSpinner()
      if (res.status == 200) {
        this.server.showSuccToast(res.message)
        console.log(res)
        if (this.loginForm.value.rememberMe == true) {
          let remData = {
            "email": this.loginForm.value.email,
          }
        }

      }
      else if (res.status == 400 || res.status == 404) {
        this.server.showErrToast(res.message)
      }
    },
      (err: any) => {
        this.server.hideSpinner();
        if (err.status == 401 || err.status == 400 || err.status == 404) {
          this.server.showErrToast(err.error.message);
          console.log(err)
        } else {
          this.server.showErrToast(err.message);
        }
      }
    )
    this.Obj = {
      'email': this.loginForm.value.email,
    }
  }





  getThirdPartyLocation() {
    this.server.getThirdPartyApi("https://ipinfo.io/?token=c3671aac833bab").subscribe((res: any) => {

      this.locationAdress = res.city;
    });
  }


  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

}
