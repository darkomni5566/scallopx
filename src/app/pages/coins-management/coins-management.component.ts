import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/service/server.service';
import { apiEndpoint } from 'src/environments/environment.prod';

@Component({
  selector: 'app-coins-management',
  templateUrl: './coins-management.component.html',
  styleUrls: ['./coins-management.component.scss']
})
export class CoinsManagementComponent implements OnInit {

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
  imageUrl: '';
  networkArr:any=[{value:'',disable:false}]
  coinImg: any;
 

    constructor(public server: ServerService, private router: Router) {
      let permitted_routes
      permitted_routes = localStorage.getItem('permitted') ? JSON.parse(atob(localStorage.getItem('permitted'))) : []
      this.permissionObj = permitted_routes.find(x => x.name == 'Coins Management')
  
    }
  
    ngOnInit(): void {
      this.getUserList()
    }
  
  
    //--------------User Get Api Integration-------//
    getUserList() {
      this.roleList = []
      this.totalItems = 0;
      let url = apiEndpoint.coins.getCoinsLimit+`?page=${this.currentPage - 1}&pageSize=${this.itemPerPage}&ip=${localStorage.getItem('ip')}`
      this.server.showSpinner()
      this.server.getApi(url).subscribe(res => {
        this.server.hideSpinner()
        if (res.status == 200) {
          this.roleList = res.data ? res.data.data.content : []
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
        'coinFullName': new FormControl({ value: "", disabled: this.buttonName === 'VIEW' ? true : false }, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
        'imageUrl': new FormControl({ value: "", disabled: this.buttonName === 'VIEW' ? true : false }, [Validators.required]),
        'tokenType': new FormControl({ value: "", disabled: this.buttonName === 'VIEW' ? true : false }, [Validators.required]),
        'assetId': new FormControl({ value: "", disabled: this.buttonName === 'VIEW' ? true : false }, [Validators.required]),
        'coinName': new FormControl({ value: "", disabled: this.buttonName === 'VIEW' ? true : false }, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
      })
  
    }
  
  
    onEditAction() {
      this.buttonName = 'UPDATE';
      this.adminForm.enable()
      this.patchData();
    }
  
    viewDetailsObj(item) {
      this.selectedRoleObj = item
      this.buttonName = 'VIEW';
      this.formValidation()
      this.patchData()
    }
  
    patchData() {
      this.imageUrl = this.selectedRoleObj.coinImage
      this.networkArr =[]
      this.selectedRoleObj.network.forEach((ele) => {
        this.networkArr.push({
          disable : this.buttonName == "VIEW" ? true: false,
          value : ele
        })
      });
      this.adminForm.patchValue({
        'coinFullName': this.selectedRoleObj.coinFullName,
        'coinName': this.selectedRoleObj.coinName,
        'tokenType': this.selectedRoleObj.tokenType,
        'assetId': this.selectedRoleObj.assetId
      })
    }
  
  
    saveCoin() {
      this.roleList = [];
      this.totalItems = 0;
      let url = apiEndpoint.coins.updateCoins
      let arr = []
      this.networkArr.forEach((ele,index) => {
        arr.push(document.getElementById(String(index))['value'])
      });
      let req={
        "coinFullName": this.adminForm.value.coinFullName,
        "coinImage": this.coinImg,
        "coinName": this.adminForm.value.coinName,
        "network": arr,
        "tokenType": this.adminForm.value.tokenType,
        "assetId": this.adminForm.value.assetId
      }
      this.server.showSpinner()
      this.server.postApi(url,req).subscribe(res => {
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
  
  
    updateCoin() {
      // if (this.adminForm.value.coinName != this.selectedRoleObj.coinName) {
      //   this.server.showErrToast('You cant update your own coin name')
      //   return;
      // }
      this.roleList = [];
      this.totalItems = 0;
      let url = apiEndpoint.coins.updateCoins
      let arr = []
      this.networkArr.forEach((ele,index) => {
        arr.push(document.getElementById(String(index))['value'])
      });
      let req={
        "coinFullName": this.adminForm.value.coinFullName,
        "coinImage": this.coinImg,
        "coinName": this.adminForm.value.coinName,
        "network": arr,
        "tokenType": this.adminForm.value.tokenType,
        "assetId": this.adminForm.value.assetId
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
      this.networkArr = [{value:'',disable:false}]
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
  
    handleInputChange(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
      this.imageUrl = file     
      this.uploadImage()
    }
      

    addNetwork() {
      this.networkArr.push({value:'',disable:false})
    }

    removeNetwork(index) {
      if(this.buttonName != 'VIEW') {
        this.networkArr.splice(index,1)
      }
    }

    uploadImage(){
      let url = apiEndpoint.coins.uploadImage
      let form_data = new FormData(); 
        form_data.append('file',(this.imageUrl))
        this.server.postApi(url,form_data).subscribe(res=>{
          if(res.status == 200){
            this.coinImg = res.data
          }
        })
        
    }


   
    

}
