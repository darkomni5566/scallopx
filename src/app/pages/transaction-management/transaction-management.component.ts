import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/service/server.service';
import { apiEndpoint } from 'src/environments/environment.prod';

@Component({
  selector: 'app-transaction-management',
  templateUrl: './transaction-management.component.html',
  styleUrls: ['./transaction-management.component.scss']
})
export class TransactionManagementComponent implements OnInit {
  itemPerPage = 10;
  currentPage = 1;
  totalItems: any=0;
  userList: any = [];
  searchKey: any = '';
  tabName:any='Transaction'
  userDetailsObj: any={};
  permissionObj: any={};
  constructor(public server: ServerService, private router: Router, private route: ActivatedRoute) {
    this.permissionObj = this.server.menuItems.find(x=>x.title == 'Transaction Management')
   }

  ngOnInit(): void {
    this.getTransactionList()
  }

    //--------Transaction Get Api Integrtion -------------//
    getTransactionList() {
      this.userList = []
      this.totalItems = 0;
      let url = apiEndpoint.transaction.getQuarantineTransaction+`?ip=${localStorage.getItem('ip')}`
      if (this.searchKey) {
        url = url + `&filter=${this.searchKey}`
      }
      // this.server.showSpinner()
      this.server.getApi(url).subscribe(res => {
        // this.server.hideSpinner()
        if (res.status == 200) {
          console.log(res)
          this.userList = res.data
          this.totalItems = res.totalPages * res.pageSize
        }
      })
    }

      //--------------Pagination --------------//
  pagination(event) {
    this.currentPage = event;
    this.getTransactionList()
  }
}
