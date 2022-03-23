import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';
import { apiEndpoint } from 'src/environments/environment.prod';

@Component({
  selector: 'app-fees-management',
  templateUrl: './fees-management.component.html',
  styleUrls: ['./fees-management.component.scss']
})
export class FeesManagementComponent implements OnInit {

  selectedIndex: any=null;
  permissionObj: any={};
  feesArrList: any[];
  itemPerPage = 20;
  currentPage = 1;
  totalItems: any=0;
  obj:any={}
  buttonName: any = 'CREATION';
  feesId: any;
  constructor(public server:ServerService) { 
    let  permitted_routes 
      permitted_routes = localStorage.getItem('permitted') ? JSON.parse(atob(localStorage.getItem('permitted'))) : []
      this.permissionObj = permitted_routes.find(x=>x.name == 'Fees Management') 
  }
  ngOnInit(): void {
    this.getFees()
  }


  onEditAction(index) {
    this.selectedIndex = index
    this.feesArrList.forEach(element => {
      element.disable = element.feeId ? true : false;
    });
    this.feesArrList[index].disable = false
   
  }



   // remove action 
   onRemoveAction(index,data) {
      this.selectedIndex = null;
      this.feesArrList.forEach(element => {
        element.disable = element.feeId ? true : false;
      });
      document.getElementById(index+'fee-preview')['value'] = this.feesArrList[index]['fee']
      // document.getElementById(index+'networkFee-preview')['value'] = this.feesArrList[index]['networkFee']
  }

  onDeleteAction(index){
    this.feesArrList.splice(index,1)
    this.selectedIndex = null
    this.feesArrList.forEach(element => {
      element.disable = element.feeId ? true : false;
    });
  }


  getFees(){
    this.feesArrList = [];
      this.totalItems = 0;
      let url = apiEndpoint.feesRisk.getFees;
      // url = url + `?ip=${localStorage.getItem('ip')}`
      this.server.showSpinner()
      this.server.getApi(url).subscribe(res => {
        this.server.hideSpinner()
        if (res.status == 200) {
        this.feesArrList = res.data
          this.totalItems = res.data.count
          this.feesArrList.forEach(element => {
            element['disable'] = true
          });
        }
      })
  }


  onSaveAction(index,item) {
    this.feesArrList[this.selectedIndex]['fee'] = document.getElementById(index+'fee-preview')['value']
    this.feesArrList[this.selectedIndex]['feeFor'] = document.getElementById(index+'feeFor-preview')['value']
    this.feesArrList[this.selectedIndex]['userType'] = document.getElementById(index+'userType-preview')['value']
    delete this.feesArrList[this.selectedIndex]['disable']
    let url = apiEndpoint.feesRisk.getFees;
    url = url + `?ip=${localStorage.getItem('ip')}&fee=${this.feesArrList[this.selectedIndex]['fee']}&feeFor=${this.feesArrList[this.selectedIndex]['feeFor']}&userType=${this.feesArrList[this.selectedIndex]['userType']}`
    this.server.postApi(url,'').subscribe((res:any)=>{
      if(res.status == 200) {
        this.server.showSuccToast(res.message);
        // this.feesArrList.splice(0,0,this.obj)
        this.selectedIndex = null;
        this.feesArrList[index].disable = true
        this.getFees()
      }
    })
  }


  updateAction(index,item) {
    this.feesId = item
    this.feesArrList[this.selectedIndex]['fee'] = document.getElementById(index+'fee-preview')['value']
    document.getElementById(index+'fee-preview')['value'] = this.feesArrList[index]['feeFor']
    document.getElementById(index+'userType-preview')['value'] = this.feesArrList[index]['userType']

    // this.feesArrList[this.selectedIndex]['feeFor'] = document.getElementById(index+'feeFor-preview')['value']
    // this.feesArrList[this.selectedIndex]['userType'] = document.getElementById(index+'userType-preview')['value']
    delete this.feesArrList[this.selectedIndex]['disable']
    let url = apiEndpoint.feesRisk.getFees;
    url = url + `?ip=${localStorage.getItem('ip')}&fee=${this.feesArrList[this.selectedIndex]['fee']}&feeFor=${this.feesArrList[index]['feeFor']}&userType=${this.feesArrList[index]['userType']}`
    this.server.postApi(url,'').subscribe((res:any)=>{
      if(res.status == 200) {
        this.server.showSuccToast(res.message);
        // this.feesArrList.splice(0,0,this.obj)
        this.selectedIndex = null;
        this.feesArrList[index].disable = true
        this.getFees()
      }
    })
  }



  pagination(event) {
    this.currentPage = event;
    this.getFees()
    }

    createFees(){
      this.obj={
        'fee':'',
        'feeFor':'BASIC',
        'userType':'INDIVIDUAL',
        'disable': false
      }
      this.feesArrList.splice(0,0,this.obj)
      this.selectedIndex = 0
    }


}
