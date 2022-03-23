import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { apiEndpoint } from 'src/environments/environment.prod';



@Injectable({ providedIn: 'root' })
export class ServerService {
    private subject = new Subject<any>();
    loginSub = new BehaviorSubject(``);
    loginObs = this.loginSub.asObservable();
    private keepAfterRouteChange = false;
    ipAddress = '';
    private httpOptions = {
        // headers: new HttpHeaders({ 'Content-Type': 'application/json'})
        
    }
    baseUrl :any='';
  locationAdress: any='';
  ROUTES: any = [

    {
      path: "/dashboard",
      title: "Dashboard",
      rtlTitle: "لوحة القيادة",
      icon: "icon-chart-pie-36",
      class: "nav-item",
      hash_id: "#demo1",
      id:"demo1",
      children:[]
  
    }, {
      path: "/user-management",
      title: "User Management",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "tim-icons icon-single-02 mr-2",
      class: "nav-item",
      hash_id: "#demo2",
      id:"demo2",
      children:[]
    },
    {
      path: "/kyc-dashboard",
      title: "Kyc Dashboard",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "tim-icons icon-single-02 mr-2",
      class: "nav-item",
      hash_id: "#demo3",
      id:"demo3",
      children:[]
    },
    {
      path: "/risk-management",
      title: "Risk Management",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "tim-icons icon-single-02 mr-2",
      class: "nav-item",
      hash_id: "#demo4",
      id:"demo4",
      children:[]
    },
    {
      path: "/activity",
      title: "Activity Log",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "icon-paper",
      class: "nav-item",
      hash_id: "#demo5",
      id:"demo5",
      children:[]
    },
   
    {
      path: "/transaction-management",
      title: "Transaction Resolution",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "tim-icons icon-single-02 mr-2",
      class: "nav-item",
      hash_id: "#demo6",
      id:"demo6",
      children:[]
    },
    {
      path: "/config-management",
      title: "Configuration Management",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "tim-icons icon-single-02 mr-2",
      class: "nav-item",
      hash_id: "#demo7",
      id:"demo7",
      children:[]
    },
   
    {
      path: "/fees-management",
      title: "Fees Management",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "tim-icons icon-money-coins mr-2",
      class: "nav-item",
      hash_id: "#demo8",
      id:"demo8",
      children:[]
    },
    {
      path: "/notification",
      title: "Notification Management",  
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "icon-bell-55  mr-2",
      class: "nav-item",
      hash_id: "#demo9",
      id:"demo9",
      children:[]
    },
    {
      path: "/transaction",
      title: "Transaction Management",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "tim-icons icon-single-02 mr-2",
      class: "nav-item",
      hash_id: "#demo10",
      id:"demo10",
      children:[]
    },
    {
      path: "/role-management",
      title: "Role Management",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "tim-icons icon-single-02 mr-2",
      class: "nav-item",
      hash_id: "#demo11",
      id:"demo11",
      children:[]
    },
    {
      path: "/admin-management",
      title: "Admin Management",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "tim-icons icon-single-02 mr-2",
      class: "nav-item",
      hash_id: "#demo12",
      id:"demo12",
      children:[]
    },
    {
      path: "/coins-management",
      title: "Coins Management",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "tim-icons icon-coins mr-2",
      class: "",
      hash_id: "#demo13",
      id:"demo13",
      children:[]
    },
    {
      path: "/kyc-limit",
      title: "Kyc Limit",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "tim-icons icon-single-02 mr-2",
      class: "",
      hash_id: "#demo14",
      id:"demo14",
      children:[]
    },
    {
      path: "/register",
      title: "Register",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "tim-icons icon-single-02 mr-2",
      class: "",
      hash_id: "#demo15",
      id:"demo15",
      children:[]
    },
    {
      path: "/settlement-management",
      title: "Settlement Management",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "tim-icons icon-single-02 mr-2",
      class: "",
      hash_id: "#demo16",
      id:"demo16",
      children:[]
    },
    {
      path: "/kyc-management",
      title: "User SignUp",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "tim-icons icon-single-02 mr-2",
      class: "",
      hash_id: "#demo17",
      id:"demo17",
      children:[]
    },
  
    
  ];
  

  userRoleObj: any={};
  menuItems: any=[];
  webUrl: any;
  permitted_routes: any=[];
    
    constructor(private router: Router,private http:HttpClient,private toasterService:ToastrService, private location:Location,private spinner: NgxSpinnerService) {
        let url = window.location.href;
        this.getThirdPartyLocation()
        this.baseUrl='https://devapi.scallopx.com/';
        if(url.includes('localhost')) {
          // this.baseUrl='https://devapi.scallopx.com/';
          this.baseUrl='https://api.scallopx.com/';
          this.webUrl ='http://localhost:4200/'
        }else if(url.includes('devadmin.scallopx.com')){
          this.baseUrl='https://api.scallopx.com/';
          this.webUrl ='https://devadmin.scallopx.com/'

        }else if(url.includes('api.scallopx.com')){
          this.baseUrl='https://api.scallopx.com/';
          this.webUrl ='https://devadmin.scallopx.com/'
        }
      
        this.getIPAddress()
        if(localStorage.getItem('token')) {
          this.getRolePermission()
        }
    }

    getRolePermission() {
      // this.menuItems = ROUTES
      // return
      this.menuItems =[]
      let id = atob(localStorage.getItem('roleId'))
      let userId = atob(localStorage.getItem('userId'))
      
      // let id = '6116581c577f30478779f456'
      let url = `${apiEndpoint.getRole.getRolePermission}?rolePermissionModuleId=${id}&page=0&pageSize=10&ip=${localStorage.getItem('ip')}&userId=${userId}`
      this.getApi(url).subscribe(res=>{
        if(res.status == 200) {
            let userRoleObj = res.data.content[0]
  
            this.permitted_routes = userRoleObj.module.filter(x=>x.isRead || x.isCreate || x.isUpdate || x.isDownload || x.isDelete || x.isBlocked)
            this.permitted_routes.forEach(ele => {
              let obj = this.ROUTES.find(x=>x.title == ele.name)
              if(obj != undefined) {
                this.menuItems.push(obj)
              }
            });
            if(!localStorage.getItem('permitted')) {
              this.router.navigate([this.menuItems[0].path])
              this.changeLoginSub('login');
            }
            localStorage.setItem('permitted',btoa(JSON.stringify(this.permitted_routes)))


        }
      })
    }



    
  
      

    isAuthenticated() : any {
      // return localStorage.getItem(('token')) ? true : false
    }
    //-----------------------------------------To prevent space in start -------------------------------------------------------------------
    preventSpaceInStart(e) {
      let keyCode = e.which ? e.which : e.keyCode
      if(keyCode === 32 && !e.target.value){
          e.preventDefault();
      }
    }

    //----------------------------------------------Post Method ---------------------------------------------------------------------------------------------------------------------//
    postApi(url, data): Observable<any> {
      if(localStorage.getItem('token')) {
        this.httpOptions = {
          headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`})
        };
      }
      return this.http.post(this.baseUrl + url, data,this.httpOptions)      
    }

    //--------------------------------------------- Get Method ----------------------------------------------------------------------------------------------------------------------//
    getApi(url): Observable<any> {
      if(localStorage.getItem('token')) {
        this.httpOptions = {
            headers: new HttpHeaders({
               'Authorization': `Bearer ${localStorage.getItem('token')}` ,
               'appId': `${localStorage.getItem('appId')}`
              })
        };
      }
      if(!navigator.onLine) {
        this.showErrToast('You are offline!')
        return ;
      }
      return this.http.get(this.baseUrl + url,this.httpOptions);      
    }



    getOnfidoApi(url,header): Observable<any> {
      if(localStorage.getItem('token')) {
        // this.httpOptions = {
        //     headers: new HttpHeaders({
        //        'Authorization': `Bearer ${localStorage.getItem('token')}` ,
        //        'appId': `${localStorage.getItem('appId')}`
        //       })
        // };
      }
      if(!navigator.onLine) {
        this.showErrToast('You are offline!')
        return ;
      }
      return this.http.get(url,header);      
    }
    getGetIdApi(url,header): Observable<any> {
      if(localStorage.getItem('token')) {
        // this.httpOptions = {
        //     headers: new HttpHeaders({
        //        'Authorization': `Bearer ${localStorage.getItem('token')}` ,
        //        'appId': `${localStorage.getItem('appId')}`
        //       })
        // };
      }
      if(!navigator.onLine) {
        this.showErrToast('You are offline!')
        return ;
      }
      return this.http.get(url,header);      
    }


    getThirdPartyApi(url): Observable<any> {
      if(localStorage.getItem('token')) {
        
        this.httpOptions = {
            headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` })
        };
      }
      if(!navigator.onLine) {
        this.showErrToast('You are offline!')
        return ;
      }
      return this.http.get(url,this.httpOptions);      
    }


    getLerexTechApi(url): Observable<any> {
     
        this.httpOptions = {
          headers: new HttpHeaders({ 'Authorization': 'Basic QjJCVXNlcl84ODQ3MjpZWEZTOEJWQ0VRQ1RNM0E5OFBYQUJZVDhLSktPV0FFTlNFT09NSjAyMVhDUzVEVExJVQ==' })

        };
      
      if(!navigator.onLine) {
        this.showErrToast('You are offline!')
        return ;
      }
      return this.http.get('https://try.readme.io/'+url,this.httpOptions);      
      // return this.http.get(url,this.httpOptions);      
    }

    //----------------------------------------------Put Method ---------------------------------------------------------------------------------------------------------------------//
    putApi(url, data): Observable<any> {
      if(localStorage.getItem('token')) {
        this.httpOptions = {
            headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` })
        };
      }
      return this.http.put(this.baseUrl + url, data,this.httpOptions)      
    }

    //----------------------------------------------Delete Method ---------------------------------------------------------------------------------------------------------------------//
    delApi(url): Observable<any> {
      if(localStorage.getItem('token')) {
        this.httpOptions = {
            headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` })
        };
      }
      return this.http.delete(this.baseUrl + url,this.httpOptions)      
    }
    
    checkSearchSpace(evt) {
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      let value = evt.target.value;
      if (charCode == 32 && !value) {
        evt.preventDefault();
        return;
      }      
    }

    /**-------------------------Function to validation for only number-------------------------- */
   


    numberOnly(event): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }
 

   //--------- only alphabet validation ---------//

    ValidateAlpha(evt)
    {
      var keyCode = (evt.which) ? evt.which : evt.keyCode
      if ((keyCode >= 65 && keyCode <= 91) || (keyCode >= 97 && keyCode <= 123)) {
        return true;
      }else {
        evt.preventDefault()
        return false;
      }
       
      
  }

    changeLoginSub(msg) {
      this.loginSub.next(msg);
    }

    /**------------------------------------- Function to show success toast------------------------------------------------ */
    showSuccToast(msg) {
      this.toasterService.success(msg, "SCALLOP");
    }
  
    /** -------------------------------------Function to show error toast --------------------------------------------------*/
    showErrToast(msg) {
      this.toasterService.error(msg, "SCALLOP");
    }
  
    /** -------------------------------------Function to show warning toast --------------------------------------------------*/
    showWarnToast(msg) {
      this.toasterService.warning(msg, "SCALLOP");
    }
  
    /** -------------------------------------Function to show info toast -----------------------------------------------------*/
    showInfoToast(msg) {
      this.toasterService.info(msg, "SCALLOP");
    }

    back(){
      this.location.back();
    }

    showSpinner() {
      this.spinner.show();
    }

    hideSpinner() {
      let timeout = setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 2000);
      clearTimeout();
    }

    //----------SORTING FOR  ARRAY --------------//
    sortTable(n,type) {
      let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0,a,b;
      table = document.getElementById("myTable");
      switching = true;
      
      dir = "asc"; 
    
      while (switching) {
        
        switching = false;
        rows = table.rows;
      
        for (i = 1; i < (rows.length - 1); i++) {
         
          shouldSwitch = false;
         
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
        
          if (dir == "asc") {
            if(type == 'text') {
              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                  shouldSwitch= true;
                  break;
              }
            }else if(type == 'number') {
                a = x.innerHTML ? parseInt(x.innerHTML): 0;
                b = y.innerHTML ? parseInt(y.innerHTML): 0;
                if(a > b) {
                  shouldSwitch = true;
                  break;
                }
            }else {
                a = x.innerHTML ? new Date(x.innerHTML).getTime() : new Date('1 Jan 1970').getTime();
                b = y.innerHTML ? new Date(y.innerHTML).getTime() : new Date('1 Jan 1970').getTime();
              if (a > b) {
           
                  shouldSwitch= true;
                  break;
              }
            }
          } else if (dir == "desc") {
              if(type == "text") {
                if (x.innerHTML.toLowerCase()< y.innerHTML.toLowerCase()) {
             
                    shouldSwitch= true;
                    break;
                }
              }else if(type == "number") {
                  a = x.innerHTML ? parseInt(x.innerHTML): 0;
                  b = y.innerHTML ? parseInt(y.innerHTML): 0;
                  if(a < b) {
                    shouldSwitch = true;
                    break;
                  }
              }else {
                  a = x.innerHTML ? new Date(x.innerHTML).getTime() : new Date('1 Jan 1970').getTime();
                  b = y.innerHTML ? new Date(y.innerHTML).getTime() : new Date('1 Jan 1970').getTime();
                if (a < b) {
             
                    shouldSwitch= true;
                    break;
                }
              }
          }
        }
        if (shouldSwitch) {
          
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
       
          switchcount ++;      
        } else {
         
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
  }

//---------------get IP ADDRESS API-------------//
  getIPAddress()
  {
    this.http.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
      localStorage.setItem('ip',this.ipAddress)
    });
  }
//----------GET LOCATION API -------------------//
  getThirdPartyLocation()
  {
    this.http.get("https://ipinfo.io/?token=c3671aac833bab").subscribe((res:any)=>{
      this.locationAdress = res.city;
    });
  }


//--------copy to clipboard--------------//
copy(val: string) {
  const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.showSuccToast('Copied!')
  }
 

}


