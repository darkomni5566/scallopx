import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/service/server.service';
import { apiEndpoint } from 'src/environments/environment.prod';

@Component({
  selector: 'app-kyc-status',
  templateUrl: './kyc-status.component.html',
  styleUrls: ['./kyc-status.component.scss']
})
export class KycStatusComponent implements OnInit {
  permissionObj: any = {};
  tabName: any = 'KYC-STATUS'
  itemPerPage = 10;
  currentPage = 1;
  totalItems: any = 0;
  userList: any = [];
  fromDate: string;
  toDate: string;
  status: string;
  searchKey: string;
  phoneNo: string;
  maxToDate: any;
  maxFromDate: any;


  constructor(public server: ServerService, private router: Router) {
    let permitted_routes
    permitted_routes = localStorage.getItem('permitted') ? JSON.parse(atob(localStorage.getItem('permitted'))) : []
    this.permissionObj = permitted_routes.find(x => x.name == 'Kyc Dashboard')

  }

  ngOnInit(): void {
    this.getUserList()
  }

  clearSearch() {
    this.totalItems = 0;
    this.currentPage = 1;
    this.fromDate = '';
    this.toDate = '';
    this.status = '';
    this.searchKey = ''
    this.phoneNo = '';
    this.getUserList()

  }
  //--------------User Post Api Integration-------//
  getUserList() {
    this.userList = []
    this.totalItems = 0;
    let url = apiEndpoint.userManagement.getuserUsermanaggement

    // if (this.searchKey) {
    //   url = url + `&filter=${this.searchKey}`
    // }
    let req = {
      page: this.currentPage - 1,
      page_size: this.itemPerPage,
      ip: localStorage.getItem('ip'),
    }
    let localdata = localStorage.getItem('data')
    if (localdata == '{"email":"lerexTech@mailinator.com"}') {
      req['accountType'] = 'EUR_ACCOUNT'
    }

    if (this.fromDate && this.toDate&&this.status) {
      req['from_Date'] = new Date(this.fromDate).getTime()
      req['to_date'] = new Date(this.toDate).getTime()
      req['kyc_status'] = this.status
    }
    if (this.status) {
      req['kyc_status'] = this.status
    }

    this.server.showSpinner()
    this.server.postApi(url, req).subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {
        this.userList = res.data ? res.data.data : []
        this.server.showSuccToast(res.message)
        this.totalItems = res.data ? res.data.count : 0


      } else if (res.status == 205) {
        this.server.showErrToast(res.message);
      }
    }, (err: any) => {
      this.server.hideSpinner();
      if (err.status == 401 || err.status == 400 || err.status == 404) {
        this.server.showErrToast(err.error.message);
      } else {
        this.server.showErrToast(err.error.message);
      }
    })
  }

  onFromSelect() {
    let date = new Date(this.fromDate).getTime() + 24 * 60 * 60 * 1000
    this.maxToDate = new Date(date).toLocaleDateString().split('/').reverse().join('-');

  }
  onToSelect() {
    let date = new Date(this.toDate).getTime() - 24 * 60 * 60 * 1000
    this.maxFromDate = new Date(date).toLocaleDateString().split('/').reverse().join('-');

  }

  //--------------Pagination --------------//
  pagination(event) {
    this.totalItems = 0;
    this.currentPage = event;
    this.getUserList()
  }

}
