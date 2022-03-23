import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/service/server.service';
import { apiEndpoint } from 'src/environments/environment.prod';

@Component({
  selector: 'app-notification-management',
  templateUrl: './notification-management.component.html',
  styleUrls: ['./notification-management.component.scss']
})
export class NotificationManagementComponent implements OnInit {
  itemPerPage = 10;
  currentPage = 1;
  totalItems: any=0;
  notificationList: any=[];
  fromDate: any;
  toDate: any;
  maxFromDate: any;
  maxToDate: any;
  minToDate: any;
  permissionObj: any={};
  searchKey: any = '';

  constructor(public server: ServerService, private router:Router ,private route: ActivatedRoute ) { 

    let  permitted_routes 
    permitted_routes = localStorage.getItem('permitted') ? JSON.parse(atob(localStorage.getItem('permitted'))) : []
    this.permissionObj = permitted_routes.find(x=>x.name == 'Notification Management') 
  }

  ngOnInit(): void {
    this.getNotificationList()
  }



  getNotificationList(){
    this.notificationList = [];
    this.totalItems = 0;
    let url = apiEndpoint.notification.getNotification
    let req = {
      page: this.currentPage - 1,
      page_size: this.itemPerPage,
      ip: localStorage.getItem('ip')
    }
    if(this.fromDate && this.toDate) {
      req['fromDate'] = new Date(this.fromDate).getTime()
      req['toDate'] = new Date(this.toDate).getTime()
    }
    if (this.searchKey.trim()) {
      req['email'] = this.searchKey.trim()
    }
    this.server.showSpinner()
    this.server.postApi(url,req).subscribe(res=>{
      this.server.hideSpinner()
      if(res.status == 200){
        this.notificationList = res.data.data
        this.totalItems = res.data.notificationCount
        this.notificationList.forEach(element => {

          let timestamp= (new Date().getTime()  - new Date(element.createdAt).getTime()) / 1000

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


   //--------------Pagination --------------//
   pagination(event) {
    this.currentPage = event;
    this.getNotificationList()
  }

  clearSearch() {
    this.fromDate = '';
    this.toDate = '';
    this.searchKey='';
    this.currentPage = 1;
    this.totalItems = 0;
    this.getNotificationList()
  }

  onFromSelect(){
    let date = new Date(this.fromDate).getTime()+24*60*60*1000
    this.maxToDate = new Date(date).toLocaleDateString().split('/').reverse().join('-');

  }
  onToSelect(){
    let date = new Date(this.toDate).getTime()-24*60*60*1000
    this.maxFromDate = new Date(date).toLocaleDateString().split('/').reverse().join('-');

  }

}
