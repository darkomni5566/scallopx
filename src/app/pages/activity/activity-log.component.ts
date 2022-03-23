import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';
import { apiEndpoint } from 'src/environments/environment.prod';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit,OnDestroy {

  gameHistoryArr: any = [];
  itemPerPage = 10;
  currentPage = 1;
  totalItems: any=0;
  userList: any=[];
  searchKey: any='';
  search$: Subject<any> = new Subject();
  sub: any;
  title: string;
  buttonName: string;
  userDetailsObj: any={};
  eventType: any;
  fromDate: any;
  toDate: any;
  userStatus: any=[];
  maxFromDate: any;
  maxToDate: any;
  selectedRole: any='USER';
  minToDate: any;
  permissionObj: any={};

  constructor(public server: ServerService, private router:Router ,private route: ActivatedRoute ) {

    let  permitted_routes 
    permitted_routes = localStorage.getItem('permitted') ? JSON.parse(atob(localStorage.getItem('permitted'))) : []
    this.permissionObj = permitted_routes.find(x=>x.name == 'Activity Log') 
    
    let url = this.router.url
    if(url.includes('activity')) {
      this.title = 'Activity Log';
      this.buttonName = 'User';
    }else {
      this.title = 'User Detail';
      this.buttonName = 'View';
      this.route.params.subscribe((params) => {
        this.userDetailsObj = JSON.parse(atob(params['id']));
      });
    }
    this.getUserList()
   }

  ngOnInit(): void {

    
    this.subscribeToSearch();
  }

  navigateTo() {
    this.router.navigateByUrl('user-list')
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }

  //--------------Pagination --------------//
  pagination(event) {
    this.currentPage = event;
    this.getUserList()
  }

   // -------------------------------------------------TO SEARCH --------------------------------------------------------------------------------
   subscribeToSearch() {
    this.sub = this.search$.pipe(debounceTime(1000)).subscribe((val) => {
        this.searchKey = val;
        this.currentPage = 1;
        this.getUserList()
    })
  }


  onFromSelect(){
    let date = new Date(this.fromDate).getTime()+24*60*60*1000
    this.maxToDate = new Date(date).toLocaleDateString().split('/').reverse().join('-');

  }
  onToSelect(){
    let date = new Date(this.toDate).getTime()-24*60*60*1000
    this.maxFromDate = new Date(date).toLocaleDateString().split('/').reverse().join('-');

  }
  //--------------Get Api Integration-------//
  getUserList(){
    this.userList = [];
    this.totalItems = 0;
    let url = apiEndpoint.activity.postActivity
  
    let req = {
      page: this.currentPage - 1,
      page_size: this.itemPerPage,
      ip: localStorage.getItem('ip')
    }

    if(this.fromDate && this.toDate) {
      req['from_Date'] = new Date(this.fromDate).getTime()
      req['to_date'] = new Date(this.toDate).getTime()
    }

    if(this.eventType) {
      req['eventType'] = this.eventType
    }
    if(this.searchKey.trim()){
      req['email'] = this.searchKey.trim()
    }
    if(this.selectedRole){
      req['role'] = this.selectedRole
    }
    this.server.showSpinner()
    this.server.postApi(url,req).subscribe(res=>{
      this.server.hideSpinner()
      if(res.status == 200){
        this.userList = res.data.data
        this.userStatus = res.data.enums
        this.server.showSuccToast(res.message)
        this.totalItems = res.data.activityCount
        this.userList.forEach(element => {
          element['encryptedId'] = btoa(JSON.stringify(element))

          let timestamp= (new Date().getTime()  - new Date(element.creationTime).getTime()) / 1000

          let hours = Math.floor(timestamp / (60 * 60 ));

          let min = Math.floor(timestamp / 60) - (hours * 60);
          element['ago'] = (hours != 0 ? hours + 'hrs': '') + (min != 0 ? min + ' min ':'')
        }
        );
      }else if(res.status == 205){
        this.server.showErrToast(res.message);
      }
    },(err: any) => {
      this.server.hideSpinner();
      if (err.status == 401 || err.status == 400 || err.status == 404) {
        this.server.showErrToast(err.error.message  );
      } else {
        this.server.showErrToast(err.error.message);
      }
    })
  }

  clearSearch() {
    this.selectedRole='USER'
    this.searchKey = '';
    this.fromDate = '';
    this.toDate = '';
    this.eventType = '';
    this.currentPage = 1;
    this.totalItems = 0;
    this.getUserList()
  }

  searchResult(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    let value = evt.target.value;
    if (charCode == 13 || (charCode == 8 && this.searchKey.length == 0) || charCode == 16) {
        return;
    } else {
        let string = value.replace(/[`!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/g,"");
        if(this.searchKey != string.trim()){
            this.search$.next(string.trim());
        }
        if(string == '' && value !='') {
            this.server.showErrToast(value+ ' not allowed')
        }
        evt.target.value = string
    }
  }

//--------Delete API Integrtion -------------//
deleteUser(){
 
}


}
