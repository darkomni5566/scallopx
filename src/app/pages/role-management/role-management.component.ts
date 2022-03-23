import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/service/server.service';
import { apiEndpoint } from 'src/environments/environment.prod';
declare var $:any
  @Component({
    selector: 'app-role-management',
    templateUrl: './role-management.component.html',
    styleUrls: ['./role-management.component.scss']
  })
export class RoleManagementComponent implements OnInit {
    buttonName: any='LIST';
    roleDetailsObj: any={};
    itemPerPage = 10;
    currentPage = 1;
    totalItems: any=0;
    roleList: any[];
    permissionArr =[]
    roleType:any;
    permissionObj: any={};
    loggedInUserRoleId: string;
    loggedInUserId: string;
    constructor(public server: ServerService, private router: Router, private route: ActivatedRoute) { 

      let  permitted_routes 
      permitted_routes = localStorage.getItem('permitted') ? JSON.parse(atob(localStorage.getItem('permitted'))) : []
      this.permissionObj = permitted_routes.find(x=>x.name == 'Role Management') 
      let moduleArr= apiEndpoint.modules

      moduleArr.forEach(ele => {
        this.permissionArr.push({
            "isCreate": false,
            "isDelete": false,
            "isBlocked":false,
            "isDownload": false,
            "isRead": false,
            "isUpdate": false,
            "selectAll": false,
            "moduleName": ele
        })
      });
      console.log(this.permissionArr)
    }

    ngOnInit(): void {
      this.loggedInUserRoleId = atob(localStorage.getItem('roleId'))
      this.loggedInUserId = atob(localStorage.getItem('userId'))
      console.log(this.loggedInUserRoleId)
      this.getRolePermission()
      
    }
    //-----------GET ROLE PERMISSION-----------//
    getRolePermission(){
      this.roleList = [];
      this.totalItems = 0;
      let url = apiEndpoint.getRole.getRolePermission+`?page=${this.currentPage - 1}&pageSize=${this.itemPerPage}&ip=${localStorage.getItem('ip')}&userId=${this.loggedInUserId}`
      if(this.roleType) {
        url = url+`&role=${this.roleType}`
      }
      this.server.showSpinner()
      this.server.getApi(url).subscribe(res=>{
        this.server.hideSpinner()
        if(res.status == 200){
          this.roleList = res.data.content
          this.totalItems = res.data.count
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
      this.roleType = ''
      this.currentPage = 1;
      this.totalItems = 0;
      this.getRolePermission()
    }
    

    allowReadAction(index) {
      this.permissionArr[index]['isRead'] = true
    }

    onSelectAll(index) {
     console.log(this.permissionArr[index].selectAll)
     this.permissionArr[index]['isRead'] = this.permissionArr[index].selectAll
     this.permissionArr[index]['isCreate'] = this.permissionArr[index].selectAll
     this.permissionArr[index]['isDelete'] = this.permissionArr[index].selectAll
     this.permissionArr[index]['isBlocked'] = this.permissionArr[index].selectAll
     this.permissionArr[index]['isUpdate'] = this.permissionArr[index].selectAll
     this.permissionArr[index]['isDownload'] = this.permissionArr[index].selectAll
    }

    //---------------POST ROLE  API INTEGRTION----------//
    saveRole(){
      console.log(this.permissionArr)
      this.roleList = [];
      this.totalItems = 0;
      this.permissionArr.forEach(ele => {
        delete ele['selectAll']
      });
      let url = apiEndpoint.getRole.getRolePermission
      let req = {
          'ip':localStorage.getItem('ip'),
          "permissionModuleDto": this.permissionArr,
          "roleType": this.roleDetailsObj.roleType
         }
         
      this.server.showSpinner()
      this.server.postApi(url,req).subscribe(res=>{
        this.server.hideSpinner()
        if(res.status == 200){
          this.roleList = res.data
          this.server.showSuccToast(res.message);
          this.buttonName = 'LIST';
          this.getRolePermission()
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


    //----------- UPDATE ROLE API INTEGRATION------------//

    updateRole(){
      this.roleList = [];
      this.totalItems = 0;
      let url = apiEndpoint.getRole.getRolePermission+`?page=${this.currentPage - 1}&pageSize=${this.itemPerPage}`
      this.permissionArr.forEach(ele => {
        delete ele['selectAll']
      });
      this.permissionArr.forEach(ele => {
        delete ele['name']
      });
      let req = {
        'ip':localStorage.getItem('ip'),
        "permissionModuleDto": this.permissionArr,
        "roleType": this.roleDetailsObj.roleType,
        "roleId": this.roleDetailsObj.roleId
       }
      this.server.showSpinner()
      this.server.putApi(url,req).subscribe(res=>{
        this.server.hideSpinner()
        if(res.status == 200){
          this.roleList = res.data
          this.server.showSuccToast(res.message);
          this.buttonName = 'LIST';
          this.getRolePermission()
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

    //---------------DELETE ROLE API ---------------//

    deleteModal(item){
      if(this.loggedInUserRoleId == item.roleId) {
        this.server.showErrToast("You can't delete your own assigned role!")
        return
      }
      $('#myModal').modal('show');
      this.roleDetailsObj = item
      console.log(this.roleDetailsObj)
    }

    deleteRole(){
      // console.log(item)
      let url = apiEndpoint.getRole.getRolePermission+`?rolePermissionModuleId=${this.roleDetailsObj.roleId}&ip=${localStorage.getItem('ip')}`
      this.server.showSpinner()
      this.server.delApi(url).subscribe(res=>{
        this.server.hideSpinner()
        if(res.status == 200){
          this.server.showErrToast(res.message);
          this.getRolePermission()
        }else if(res.status == 201){
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


    onEditAction() {
      if(this.loggedInUserRoleId==this.roleDetailsObj.roleId) {
        this.server.showErrToast('You cant edit your own assigned role!')
        return;
      }
      this.buttonName = 'UPDATE'
      
    }
  
    viewDetailsObj(item){
      this.buttonName = 'VIEW';
      this.roleDetailsObj = item
      console.log(item.module)
      // this.permissionArr = item.module
      console.log(this.permissionArr)
      item.module.forEach(ele => {
        let index = this.permissionArr.findIndex(x=>x.moduleName == ele.name)
        console.log(index)
        if(index != -1) {
          this.permissionArr[index]['isRead'] = ele['isRead']
          this.permissionArr[index]['isDownload'] = ele['isDownload']
          this.permissionArr[index]['isUpdate'] = ele['isUpdate']
          this.permissionArr[index]['isDelete'] = ele['isDelete']
          this.permissionArr[index]['isCreate'] = ele['isCreate']
          this.permissionArr[index]['isBlocked'] = ele['isBlocked']
        }
      });

      // this.permissionArr.forEach(ele => {
      //   ele['moduleName'] = ele.name
      //   ele['selectAll'] = false
      // });
      console.log(this.permissionArr)
    }

  
   
    onCreateAction(){
      this.roleDetailsObj['roleType'] = ''
      this.buttonName = 'SAVE';
      this.roleDetailsObj.disable ==  true;
    }
    back(){
      this.buttonName = 'LIST';

    }

    pagination(event) {
      this.currentPage = event;
      this.getRolePermission()
    }




}
