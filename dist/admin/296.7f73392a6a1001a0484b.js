(self.webpackChunkblack_dashboard_angular=self.webpackChunkblack_dashboard_angular||[]).push([[296],{67296:function(e,r,t){"use strict";t.r(r),t.d(r,{AuthModule:function(){return Z}});var o=t(38583),n=t(14330),s=t(90665),i=t(91841),a=t(89736),l=t(76419),c=t(6686),d=t(9022);function g(e,r){1&e&&(d.TgZ(0,"p",15),d._uU(1," *Please Enter Registered Email-ID."),d.qZA())}function p(e,r){1&e&&(d.TgZ(0,"p",15),d._uU(1,"*Please Enter Valid Registered Email-ID."),d.qZA())}function u(e,r){if(1&e&&(d.TgZ(0,"div",15),d.YNc(1,g,2,0,"p",10),d.YNc(2,p,2,0,"p",10),d.qZA()),2&e){var t=d.oxw();d.xp6(1),d.Q6J("ngIf",t.loginForm.get("email").errors.required),d.xp6(1),d.Q6J("ngIf",t.loginForm.get("email").errors.pattern)}}function m(e,r){1&e&&(d.TgZ(0,"span"),d._uU(1,"*Please Enter password."),d.qZA())}function f(e,r){if(1&e&&(d.TgZ(0,"span",15),d.YNc(1,m,2,0,"span",16),d.qZA()),2&e){var t=d.oxw();d.xp6(1),d.Q6J("ngIf",t.password.errors.required)}}var h=[{path:"login",component:function(){function e(e,r){this.server=e,this.router=r,this.selectedType="password",this.helper=new c.N0,localStorage.clear()}return e.prototype.ngOnInit=function(){this.loginFormValidation(),this.getThirdPartyLocation(),this.server.getIPAddress()},e.prototype.loginFormValidation=function(){this.loginForm=new s.cw({email:new s.NI("",[s.kI.required,s.kI.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),password:new s.NI("",[s.kI.required,s.kI.pattern(/^(?=^.{8,25}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)])})},Object.defineProperty(e.prototype,"password",{get:function(){return this.loginForm.get("password")},enumerable:!1,configurable:!0}),e.prototype.login=function(){var e=this;this.server.showSpinner(),this.server.postApi("auth",{email:this.loginForm.value.email,password:this.loginForm.value.password,userAgent:"Mozilla Firefox",location:this.locationAdress,isSentOtp:!1}).subscribe(function(r){if(e.server.hideSpinner(),200==r.status){if(e.server.showSuccToast(r.message),localStorage.setItem("token",r.data.BearerToken),localStorage.setItem("roleId",btoa(e.helper.decodeToken(r.data.BearerToken).roleId)),localStorage.setItem("userId",btoa(e.helper.decodeToken(r.data.BearerToken).userId)),1==e.loginForm.value.rememberMe){var t={email:e.loginForm.value.email};localStorage.setItem("rememberMe",JSON.stringify(t))}e.server.getRolePermission()}else 400!=r.status&&404!=r.status||e.server.showErrToast(r.message)},function(r){e.server.hideSpinner(),401==r.status||400==r.status||404==r.status?(e.server.showErrToast(r.error.message),localStorage.removeItem("token")):e.server.showErrToast(r.message)}),this.Obj={email:this.loginForm.value.email},localStorage.setItem("data",JSON.stringify(this.Obj))},e.prototype.getThirdPartyLocation=function(){var e=this;this.server.getThirdPartyApi("https://ipinfo.io/?token=c3671aac833bab").subscribe(function(r){e.locationAdress=r.city})},e.\u0275fac=function(r){return new(r||e)(d.Y36(l.N),d.Y36(n.F0))},e.\u0275cmp=d.Xpm({type:e,selectors:[["app-login"]],decls:24,vars:6,consts:[[1,"contentLogin"],[1,"mainClass"],[1,"col-lg-4","col-md-12"],[1,"card","p-3"],[1,"card-body"],[3,"formGroup","ngSubmit"],[1,"form-group"],[1,"form-group","has-search"],["type","text","placeholder","Enter Registered Email-ID","formControlName","email","maxlength","60",1,"form-control"],[1,"fa","fa-envelope","form-control-feedback"],["class","error",4,"ngIf"],["placeholder","Enter Password","formControlName","password",1,"form-control","pointer",3,"type","click"],[1,"form-control-feedback","pointer",3,"ngClass"],[1,"card-footer","text-center"],["type","submit",1,"btn","btn-fill",3,"disabled","click"],[1,"error"],[4,"ngIf"]],template:function(e,r){1&e&&(d.TgZ(0,"div",0),d.TgZ(1,"div",1),d.TgZ(2,"div",2),d.TgZ(3,"div",3),d.TgZ(4,"div",4),d.TgZ(5,"form",5),d.NdJ("ngSubmit",function(){return r.login()}),d.TgZ(6,"div",6),d.TgZ(7,"div"),d.TgZ(8,"label"),d._uU(9,"Username"),d.qZA(),d.TgZ(10,"div",7),d._UZ(11,"input",8),d._UZ(12,"span",9),d.qZA(),d.qZA(),d.YNc(13,u,3,2,"div",10),d.qZA(),d.TgZ(14,"div",6),d.TgZ(15,"label"),d._uU(16,"Password"),d.qZA(),d.TgZ(17,"div",7),d.TgZ(18,"input",11),d.NdJ("click",function(){return r.selectedType="text"==r.selectedType?"password":"text"}),d.qZA(),d._UZ(19,"span",12),d.qZA(),d.YNc(20,f,2,1,"span",10),d.qZA(),d.qZA(),d.qZA(),d.TgZ(21,"div",13),d.TgZ(22,"button",14),d.NdJ("click",function(){return r.login()}),d._uU(23,"LOGIN"),d.qZA(),d.qZA(),d.qZA(),d.qZA(),d.qZA(),d.qZA()),2&e&&(d.xp6(5),d.Q6J("formGroup",r.loginForm),d.xp6(8),d.Q6J("ngIf",r.loginForm.get("email").invalid&&(r.loginForm.get("email").touched||r.loginForm.get("email").dirty)),d.xp6(5),d.s9C("type",r.selectedType),d.xp6(1),d.Q6J("ngClass","password"==r.selectedType?"fas fa-eye-slash":"fas fa-eye"),d.xp6(1),d.Q6J("ngIf",r.password.invalid&&r.password.touched),d.xp6(2),d.Q6J("disabled",!r.loginForm.valid))},directives:[s._Y,s.JL,s.sg,s.Fj,s.JJ,s.u,s.nD,o.O5,o.mk],styles:[""]}),e}()}],Z=function(){function e(){}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=d.oAB({type:e}),e.\u0275inj=d.cJS({imports:[[o.ez,n.Bz.forChild(h),s.u5,i.JF,a.IJ,s.u5,s.UX]]}),e}()}}]);