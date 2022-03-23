import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { ServerService } from 'src/app/service/server.service';
import { apiEndpoint } from 'src/environments/environment.prod';

  @Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
  })
export class ResetPasswordComponent implements OnInit {

  loginForm: FormGroup;
  Obj: { email: any; };
  selectedType:any='password'
  selectedTypeConfirm:any='password'
  locationAdress: any;
    id: any;

  constructor(private server: ServerService, private router: Router,private activatedRoute: ActivatedRoute,) {
    console.log('gdgdg')
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params['token']);
      this.id = params['token']
    });
   }

  ngOnInit(): void {
    this.loginFormValidation()
    this.getThirdPartyLocation()
    // this.getUserVerfy()
  }

  
  loginFormValidation() {
    this.loginForm = new FormGroup({
      // 'email': new FormControl("", [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=^.{8,25}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)]),
      'confirmPassword': new FormControl('',[Validators.required]),

      // 'rememberMe': new FormControl('',[Validators.required]),
    })
    
  }
  get password() { return this.loginForm.get('password') }

  //==========================login================================//
  // submitForm() {
  //   let url = apiEndpoint.user.resetPassword
  //   let req={
  //     "token": this.id,
  //     // "email": this.loginForm.value.email,
  //     "password": this.loginForm.value.password
  //   }
  //   this.server.postApi(url,req).subscribe(res=>{
  //     if(res.status == 200){
  //       console.log(res)
  //       this.router.navigate[('login')]
  //     }
  //   },err=>{})
  // }

  getThirdPartyLocation()
  {
    this.server.getThirdPartyApi("https://ipinfo.io/?token=c3671aac833bab").subscribe((res:any)=>{
      
      this.locationAdress = res.city;
    });
  }


  //-----------GET UISER VERFY API INTEGRTION------------------//
  submitForm(){
    let url = apiEndpoint.getVerfyUser.getVerfyUser+`?token=${this.id}&password=${this.loginForm.value.password}`
    this.server.getApi(url).subscribe(res=>{
      if(res.status == 200){
        this.server.showSuccToast(res.message)
        this.router.navigateByUrl('login')
      }else {
        this.server.showInfoToast(res.message)
      }
    },err=>{
      this.server.showErrToast(err.error.error)
    })
  }

}

