import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { ServerService } from 'src/app/service/server.service';
import { apiEndpoint } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-transaction-list',
  templateUrl: './user-transaction-list.component.html',
  styleUrls: ['./user-transaction-list.component.scss']
})
export class UserTransactionListComponent implements OnInit {

  gameHistoryArr: any = [];
  itemPerPage = 10;
  currentPage = 1;
  totalItems: any=0;
  userList: any = [];
  searchKey: any = '';
  search$: Subject<any> = new Subject();
  sub: any;
  title: string;
  buttonName: string;
  userDetailsObj: any={};
  userId: any;
  constructor(public server: ServerService, private router: Router, private route: ActivatedRoute) {

    let url = window.location.href
    if(url.includes('user-transaction')) {
      this.title = 'User Transaction';
      this.buttonName = 'User';
    }else {
      this.title = 'Transaction Detail';
      this.buttonName = 'View';
      this.route.params.subscribe(res=>{
        this.userId = res.id
        console.log(this.userId)
      })
    }
   }

  ngOnInit(): void {
    this.getUserTransactionList()
    this.subscribeToSearch();
  }

  //--------------Pagination --------------//
  pagination(event) {
    this.currentPage = event;
    this.getUserTransactionList()
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  // -------------------------------------------------TO SEARCH --------------------------------------------------------------------------------
  subscribeToSearch() {
    this.sub = this.search$.pipe(debounceTime(1000)).subscribe((val) => {
      this.searchKey = val;
      this.currentPage = 1;
      this.getUserTransactionList()
    })
  }

  //--------------Get Api Integration-------//
  getUserTransactionList() {
    this.userList = []
    let url = apiEndpoint.userTransaction.getuserTransaction + `?offset=${this.currentPage}&limit=${this.itemPerPage}`
    if (this.searchKey) {
      url = url + `&filter=${this.searchKey}`
    }
    this.server.showSpinner()
    this.server.getApi(url).subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {
        this.userList = res.resp
        this.totalItems = res.totalPages * res.pageSize
      }
    })
  }

  clearSearch() {
    this.searchKey = ''
    this.currentPage = 1;
    this.totalItems = 0;
    this.getUserTransactionList()
  }
 //--------------Search by transactionList -----//
  searchResult(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    let value = evt.target.value;
    if (charCode == 13 || (charCode == 8 && this.searchKey.length == 0) || charCode == 16) {
      return;
    } else {
      let string = value.replace(/[`!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/g, "");
      if (this.searchKey != string.trim()) {
        this.search$.next(string.trim());
      }
      if (string == '' && value != '') {
        this.server.showErrToast(value + ' not allowed')
      }
      evt.target.value = string
    }
  }

 //------------Transaction detail api integrtion---//


}
