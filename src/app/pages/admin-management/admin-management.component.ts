import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/service/server.service';
import { apiEndpoint } from 'src/environments/environment.prod';
declare var $: any;
@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss']
})
export class AdminManagementComponent implements OnInit {
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
  loggedInEmail: any;
  loggedInUserId: string;


  constructor(public server: ServerService, private router: Router) {
    let permitted_routes
    permitted_routes = localStorage.getItem('permitted') ? JSON.parse(atob(localStorage.getItem('permitted'))) : []
    this.permissionObj = permitted_routes.find(x => x.name == 'Admin Management')

  }

  ngOnInit(): void {
    this.loggedInEmail = localStorage.getItem('data')['email']
    this.loggedInUserId = atob(localStorage.getItem('userId'))
    this.getUserList()
    this.getRolePermission()
  }


  //--------------User Post Api Integration-------//
  getUserList() {
    this.roleList = []
    this.totalItems = 0;
    let url = apiEndpoint.userManagement.getuserUsermanaggement
    let req = {
      page: this.currentPage - 1,
      page_size: this.itemPerPage,
      ip: localStorage.getItem('ip'),
      inviteUser: "string",
    }
    if (this.searchKey) {
      delete req['inviteUser']
      req['name'] = this.searchKey.trim()
    }
    // if (this.searchKey) {
    //   req['email'] = this.searchKey.trim()
    // }
    // if (this.searchKey) {
    //   req['role'] = this.searchKey.trim()
    // }
    this.server.showSpinner()
    this.server.postApi(url, req).subscribe(res => {
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



  //-----------GET ROLE PERMISSION-----------//
  getRolePermission() {
    this.rolePermissionList = [];
    this.totalItems = 0;
    let url = apiEndpoint.getRole.getRolePermission + `?page=${this.currentPage - 1}&pageSize=${this.itemPerPage}&ip=${localStorage.getItem('ip')}&userId=${this.loggedInUserId}`
    this.server.showSpinner()
    this.server.getApi(url).subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {
        this.rolePermissionList = res.data.content
        this.totalItems = res.data.count
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
      'email': new FormControl({ value: "", disabled: this.buttonName === 'VIEW' || this.buttonName === 'UPDATE' ? true : false }, [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'name': new FormControl({ value: "", disabled: this.buttonName === 'VIEW'  ? true : false }, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
      'roleType': new FormControl({ value: "", disabled: this.buttonName === 'VIEW' ? true : false }, [Validators.required]),
    })

  }


  onEditAction() {
    this.buttonName = 'UPDATE';
    this.adminForm.enable()
  }

  viewDetailsObj(item) {
    this.selectedRoleObj = item
    this.selectedRoleObj['module'] = (this.rolePermissionList.find(x => x.roleId == item.roleId)).module
    this.selectedRoleObj['roleType'] = (this.rolePermissionList.find(x => x.roleId == item.roleId)).roleType
    this.buttonName = 'VIEW';
    this.formValidation()
    this.patchData()
  }

  patchData() {
    this.adminForm.patchValue({
      'name': this.selectedRoleObj.profile.userName,
      'email': this.selectedRoleObj.email,
      'roleType': this.selectedRoleObj.roleType,
    })
  }


  saveRole() {
    this.roleList = [];
    this.totalItems = 0;
    let url = apiEndpoint.getRole.postRolePermission
    let req = {
      "deviceToken": "string",
      "deviceType": "string",
      "email": this.adminForm.value.email,
      "ip": localStorage.getItem('ip'),
      // "role": this.selectedRoleObj.role,
      "roleId": this.selectedRoleObj.roleId,
      "userName": this.adminForm.value.name,
      "webUrl": `devadmin.scallopx.com/#/reset-password`
    }
    this.server.showSpinner()
    this.server.postApi(url, req).subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {
        this.roleList = res.data
        this.buttonName = 'LIST';
        this.getUserList()
        this.totalItems = res.data.count
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

  selectRole(evt) {
    this.selectedRoleObj = this.rolePermissionList.find(x => x.roleType == evt)

  }

  updateRole() {
    if (this.loggedInEmail == this.selectedRoleObj.roleId) {
      this.server.showErrToast('You cant update your own role')
      return;
    }
    this.roleList = [];
    this.totalItems = 0;
    let url = apiEndpoint.getRole.postRolePermission
    let req = {
      "deviceToken": "string",
      "deviceType": "string",
      // "email": this.adminForm.value.email,
      "ip": localStorage.getItem('ip'),
      // "role": this.selectedRoleObj.role,
      "roleId": this.selectedRoleObj.roleId,
      "userName": this.adminForm.value.name,
      "userId": this.selectedRoleObj.id,
      "email": this.adminForm.value.email,
      "webUrl": `devadmin.scallopx.com/#/reset-password` //web nhi rkhna hai
    }
    console.log(this.selectedRoleObj.id)

    this.server.showSpinner()
    this.server.postApi(url, req).subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {
        this.roleList = res.data
        this.buttonName = 'LIST';
        this.getUserList()
        this.totalItems = res.data.count
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
    this.getRolePermission()
    this.formValidation()
    this.buttonName = 'SAVE';
    this.selectedRoleObj['module'] = []
    this.selectedRoleObj['roleType'] = ''
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


  //---------------DELETE ROLE API ---------------//

  deleteModal(item) {
    this.selectedRoleObj = item
  }

  deleteRole() {
    let url = apiEndpoint.getRole.deleteUser;
    url = url + `?ip=${localStorage.getItem('ip')}&blockedUsrId=${this.selectedRoleObj.id}&userStatus=delete`
    this.server.showSpinner()
    this.server.postApi(url, '').subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {
        $('#myModal').modal('hide');
        this.server.showSuccToast(res.message)
        this.getUserList()
      } else {
        this.server.showErrToast(res.message)
      }
    }, err => {
      this.server.hideSpinner()
      if (err.status == 401 || err.status == 400 || err.status == 404) {
        this.server.showErrToast(err.error.message);
      } else {
        this.server.showErrToast(err.error.message);
      }
    })
  }




}
