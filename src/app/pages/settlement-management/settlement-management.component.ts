import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/service/server.service';
import { apiEndpoint } from 'src/environments/environment.prod';

@Component({
  selector: 'app-settlement-management',
  templateUrl: './settlement-management.component.html',
  styleUrls: ['./settlement-management.component.scss']
})
export class SettlementManagementComponent implements OnInit {
  itemPerPage = 10;
  currentPage = 1;
  totalItems: any=0;
  transactionList: any=[];
  fromDate: any;
  toDate: any;
  maxFromDate: any;
  maxToDate: any;
  minToDate: any;
  permissionObj: any={};
  transactionView=true
  viewTransactionObj: any={};
  constructor(public server: ServerService, private router:Router ,private route: ActivatedRoute ) { 
    let  permitted_routes 
      permitted_routes = localStorage.getItem('permitted') ? JSON.parse(atob(localStorage.getItem('permitted'))) : []
      this.permissionObj = permitted_routes.find(x=>x.name == 'Settlement Management') 
  }

  ngOnInit(): void {
    this.getSettlementList()
  }

  getSettlementList(){
    this.transactionList = [];
    this.totalItems = 0;
    let url = apiEndpoint.settlement.getSettle+`?ipAddress=${localStorage.getItem('ip')}&page=${this.currentPage-1}&pageSize=${this.itemPerPage}`
  
    if(this.fromDate && this.toDate) {
      url = url+ `&from=${new Date(this.fromDate).getTime()}&to=${new Date(this.toDate).getTime()}`
    }
    this.server.showSpinner()
    this.server.getApi(url).subscribe(res=>{
      this.server.hideSpinner()
      if(res.status == 200){
        this.transactionList = res.data.finalResponse
        this.totalItems = res.data.count
        this.transactionList.forEach(element => {

          let timestamp= (new Date().getTime()  - new Date(element.time).getTime()) / 1000

          let hours = Math.floor(timestamp / (60 * 60 ));

          let min = Math.floor(timestamp / 60) - (hours * 60);
          element['ago'] = (hours != 0 ? hours + 'hrs': '') + (min != 0 ? min + ' min ':'')
          console.log(new Date().getTime()  - new Date(element.time).getTime())
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
    console.log(event)
    this.getSettlementList()
  }

  clearSearch() {
    this.fromDate = '';
    this.toDate = '';
    this.itemPerPage = 10;
    this.currentPage = 1;
    this.totalItems = 0;
    this.getSettlementList()
  }

  onFromSelect(){
    let date = new Date(this.fromDate).getTime()+24*60*60*1000
    this.maxToDate = new Date(date).toLocaleDateString().split('/').reverse().join('-');

  }
  onToSelect(){
    let date = new Date(this.toDate).getTime()-24*60*60*1000
    this.maxFromDate = new Date(date).toLocaleDateString().split('/').reverse().join('-');

  }

  viewTransaction(item){
    this.viewTransactionObj = item
    console.log(item)
    this.transactionView = !this.transactionView
  }
  
  transactionBack(){
    this.transactionView = true
  }


}
