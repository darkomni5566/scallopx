import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/service/server.service';
import { apiEndpoint } from 'src/environments/environment.prod';

@Component({
  selector: 'app-kyc-limit',
  templateUrl: './kyc-limit.component.html',
  styleUrls: ['./kyc-limit.component.scss']
})
export class KycLimitComponent implements OnInit {
  buttonName: any = 'LIST';
  itemPerPage = 10;
  currentPage = 1;
  totalItems: any = 0;
  roleList: any[];
  adminForm: FormGroup;
  rolePermissionList: any[];
  selectedRoleObj: any = {};
  searchKey: any;
  permissionObj: any = {};
 

    constructor(public server: ServerService, private router: Router) {
      let permitted_routes
      permitted_routes = localStorage.getItem('permitted') ? JSON.parse(atob(localStorage.getItem('permitted'))) : []
      this.permissionObj = permitted_routes.find(x => x.name == 'Kyc Limit')
  
    }
  
    ngOnInit(): void {
      this.getUserList()
    }
  
  
    //--------------User Post Api Integration-------//
    getUserList() {
      this.roleList = []
      this.totalItems = 0;
      let url = apiEndpoint.kycLimit.getKycLimit+`?page=${this.currentPage - 1}&pageSize=${this.itemPerPage}&ip=${localStorage.getItem('ip')}`
      this.server.showSpinner()
      this.server.getApi(url).subscribe(res => {
        this.server.hideSpinner()
        if (res.status == 200) {
          this.roleList = res.data ? res.data.data : []
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
  
  
  
    formValidation() {
      this.adminForm = new FormGroup({
        'limit': new FormControl({ value: "", disabled: this.buttonName === 'VIEW'  ? true : false }, [Validators.required, Validators.pattern(/^\d*\.?\d{0,26}$/g)]),
        'limitType': new FormControl({ value: "", disabled: this.buttonName === 'VIEW' ? true : false }, [Validators.required]),
        'riskType': new FormControl({ value: "", disabled: (this.buttonName === 'VIEW' || this.buttonName === 'UPDATE') ? true : false }, [Validators.required]),
        'riskScore': new FormControl({ value: "", disabled: this.buttonName === 'VIEW' ? true : false }, [Validators.required]),
      })
  
    }
  
  
    onEditAction() {
      this.buttonName = 'UPDATE';
      this.adminForm.enable()
    }
  
    viewDetailsObj(item) {
      this.selectedRoleObj = item
      // this.selectedRoleObj['module'] = (this.rolePermissionList.find(x => x.roleId == item.roleId)).module
      // this.selectedRoleObj['roleType'] = (this.rolePermissionList.find(x => x.roleId == item.roleId)).roleType
      this.buttonName = 'VIEW';
      this.formValidation()
      this.patchData()
    }
  
    patchData() {
      this.adminForm.patchValue({
        'limit': this.selectedRoleObj.limit,
        'limitType': this.selectedRoleObj.limitType,
        'riskType': this.selectedRoleObj.riskType,
        'riskScore': this.selectedRoleObj.riskScore,
      })
    }
  
  
    saveRole() {
      this.roleList = [];
      this.totalItems = 0;
      let url = apiEndpoint.kycLimit.getKycLimit
      let req = {
          "limit": this.adminForm.value.limit,
          "limitType": this.adminForm.value.limitType,
          "riskScore": this.adminForm.value.riskScore,
          "riskType": this.adminForm.value.riskType,
          "ip": localStorage.getItem('ip'),
      }
      this.server.showSpinner()
      this.server.postApi(url, req).subscribe(res => {
        this.server.hideSpinner()
        if (res.status == 200) {
          this.roleList = res.data
          this.buttonName = 'LIST';
          this.getUserList()
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
  
  
    updateRole() {
      if (this.adminForm.value.riskType != this.selectedRoleObj.riskType) {
        this.server.showErrToast('You cant update your own risk type')
        return;
      }
      this.roleList = [];
      this.totalItems = 0;
      let url = apiEndpoint.kycLimit.getKycLimit
      let req = {
        "limit": this.adminForm.value.limit,
        "limitType": this.adminForm.value.limitType,
        "riskScore": this.adminForm.value.riskScore,
        "riskType": this.adminForm.value.riskType,
        "ip": localStorage.getItem('ip'),
      }
      this.server.showSpinner()
      this.server.postApi(url, req).subscribe(res => {
        this.server.hideSpinner()
        if (res.status == 200) {
          this.buttonName = 'LIST';
          this.getUserList()
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


    onCreateAction() {
      this.formValidation()
      this.buttonName = 'SAVE';
    }
    back() {
      this.buttonName = 'LIST';
  
    }
  
    pagination(event) {
      this.currentPage = event;
      this.getUserList()
    }
  
    clearSearch() {
      this.searchKey = ''
      this.currentPage = 1;
      this.totalItems = 0;
      this.getUserList()
    }
  

  
  
}
