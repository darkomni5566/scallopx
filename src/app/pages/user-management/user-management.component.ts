import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { ServerService } from 'src/app/service/server.service';
import { apiEndpoint } from 'src/environments/environment.prod';

declare var $: any;
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  imageUrl: '';
  itemPerPage = 10;
  currentPage = 1;
  totalItems: any = 0;
  userList: any = [];
  searchKey: any = '';
  search$: Subject<any> = new Subject();
  sub: any;
  title: any;
  buttonName: any;
  userDetailsObj: any = {};
  userId: any;
  tabName: any = 'userInfo'
  fromDate: any;
  toDate: any;
  status: any;
  eventType: any;
  userStatus: any;
  maxToDate: any;
  maxFromDate: any;
  selectedRole: any = 'USER';
  reportList: any = [];
  subTabName: any = 'tab1'
  getIdReportList: any = {};
  selfieObj: any = {}
  documentObj: any = {};
  applicantList: any;
  check: any;
  phoneNo: any;
  permissionObj: any = {};
  coinImage: any;
  wallet: boolean = true;
  walletDetailsObj: any = {};
  viewTransactionObj: any = {};
  transactionView: boolean = true;
  orderId: any;
  orderType: any = '';
  walletCardsArr = [
    { color: './assets/wallet_background/walletCardBg1.png', icon: './assets/right_icon/cardIconVector1.png', texture: './assets/wallet_pattern/walletPatternBg1.png' },
    { color: './assets/wallet_background/walletCardBg2.png', icon: './assets/right_icon/cardIconVector2.png', texture: './assets/wallet_pattern/walletPatternBg2.png' },
    { color: './assets/wallet_background/walletCardBg3.png', icon: './assets/right_icon/cardIconVector3.png', texture: './assets/wallet_pattern/walletPatternBg3.png' },
    { color: './assets/wallet_background/walletCardBg4.png', icon: './assets/right_icon/cardIconVector4.png', texture: './assets/wallet_pattern/walletPatternBg4.png' },
    { color: './assets/wallet_background/walletCardBg5.png', icon: './assets/right_icon/cardIconVector5.png', texture: './assets/wallet_pattern/walletPatternBg5.png' },
    { color: './assets/wallet_background/walletCardBg6.png', icon: './assets/right_icon/cardIconVector6.png', texture: './assets/wallet_pattern/walletPatternBg6.png' },
    { color: './assets/wallet_background/walletCardBg7.png', icon: './assets/right_icon/cardIconVector7.png', texture: './assets/wallet_pattern/walletPatternBg7.png' },
    { color: './assets/wallet_background/walletCardBg8.png', icon: './assets/right_icon/cardIconVector8.png', texture: './assets/wallet_pattern/walletPatternBg8.png' }
  ]
  ledgerDetailsObj: any = {};
  ledgerView: boolean = true;
  beneficiaryDetailsObj: any = {};
  beneficiaryView: boolean = true;
  orderTypeList: any = [];
  kycLerex: any;
  endUserId: any;
  loginForm: FormGroup;
  Obj: { email: any; };
  selectedType: any = 'password'
  selectedTypeConfirm: any = 'password'
  kycstatus: any;
  checklistObj: any = {};
  reKycObj: any;
  kycImg: any;
  enduserIdforKyc: any;
  reKycReportObj: any={};

  constructor(public server: ServerService, private router: Router, private route: ActivatedRoute) {

    let permitted_routes
    permitted_routes = localStorage.getItem('permitted') ? JSON.parse(atob(localStorage.getItem('permitted'))) : []
    this.permissionObj = permitted_routes.find(x => x.name == 'User Management')
    this.route.params.subscribe(res => {
      this.userId = res.id

    })
    this.getUserList()
    let url = window.location.href

    if (url.includes('user-management')) {
      this.title = 'User Management';
      this.buttonName = 'User';
    } else {
      this.title = 'User Details';
      this.buttonName = 'View';

    }

  }

  ngOnInit(): void {
    this.subscribeToSearch();
    this.loginFormValidation()
  }


  // to change class for sort icon
  changeClass(id) {

    let arr = this.userList
    let className = document.getElementById(id).className
    if (className == 'my-icon fa fa-sort') {
      document.getElementById(id).className = 'my-icon fa fa-chevron-down'
      this.server.sortTable(Number(id), 'text')
    } else if (className == 'my-icon fa fa-chevron-down') {
      document.getElementById(id).className = 'my-icon fa fa-chevron-up'
      this.server.sortTable(Number(id), 'text')
    } else if (className == 'my-icon fa fa-chevron-up') {
      document.getElementById(id).className = 'my-icon fa fa-sort'
      this.userList = []
      setTimeout(() => {
        this.userList = arr
      }, 100);
    }

  }


  toggleButton() {
    this.walletDetailsObj['mainArr'].forEach(arr => {
      arr.forEach(ele => {
        document.getElementById('demo').innerHTML =
          `<p>Total Balance : ${ele.totalBalance}</p>,
         <p>Blocked : ${ele.blockedBalance}</p>,
        <p>Network : ${ele.network.join(',')}</p>,
        <p>Wallet Address : ${ele.walletAddress}</p>,
        `
        ele['content'] = document.getElementById('demo').innerText

      });

    });
    $('[data-toggle="popover"]').popover()


  }




  //--------------Pagination --------------//
  pagination(event) {
    this.totalItems = 0;
    this.currentPage = event;
    if (this.tabName == 'activity') {
      this.getActivityList()
    } else if (this.tabName == 'transaction') {
      this.getTransactionList()
    } else if (this.tabName == 'openOrders') {
      this.getOpenOrders()
    } else {
      this.getUserList()
    }
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
      this.getUserList()
    })
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

    if (this.fromDate && this.toDate) {
      req['from_Date'] = new Date(this.fromDate).getTime()
      req['to_date'] = new Date(this.toDate).getTime()
    }
    if (this.status) {
      req['status'] = this.status
    }
    if (this.searchKey.trim()) {
      req['email'] = this.searchKey.trim()
    }
    if (this.phoneNo) {
      req['phoneNo'] = this.phoneNo
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

  clearSearch() {
    this.totalItems = 0;
    if (this.tabName == 'activity') {
      this.currentPage = 1;
      this.fromDate = '';
      this.toDate = '';
      this.eventType = '';
      this.searchKey = '';
      this.selectedRole = 'USER'
      this.getActivityList()
    } else if (this.tabName == 'transaction') {
      this.currentPage = 1;
      this.orderId = '';
      this.orderType = '';
      this.getTransactionList()
    } else if (this.tabName == 'openOrders') {
      this.currentPage = 1;
      this.orderId = '';
      this.orderType = '';
      this.getOpenOrders()
    } else {
      this.currentPage = 1;
      this.fromDate = '';
      this.toDate = '';
      this.status = '';
      this.searchKey = ''
      this.phoneNo = '';
      this.getUserList()
    }
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


  //-------------- Activity Post Api Integration-------//
  getActivityList() {
    this.userList = [];
    this.totalItems = 0;
    let url = apiEndpoint.activity.postActivity + `?userforactivityId=${this.userDetailsObj.id}`
    if (this.searchKey) {
      url = url + `&name=${this.searchKey}`
    }
    let req = {
      page: this.currentPage - 1,
      page_size: this.itemPerPage,
      ip: localStorage.getItem('ip')
    }

    if (this.fromDate && this.toDate) {
      req['from_Date'] = new Date(this.fromDate).getTime()
      req['to_date'] = new Date(this.toDate).getTime()
    }

    if (this.eventType) {
      req['eventType'] = this.eventType
    }
    if (this.searchKey.trim()) {
      req['email'] = this.searchKey.trim()
    }
    if (this.selectedRole) {
      req['role'] = this.selectedRole
    }

    this.server.showSpinner()
    this.server.postApi(url, req).subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {
        this.userList = res.data.data
        this.userStatus = res.data.enums
        this.server.showSuccToast(res.message)
        this.totalItems = res.data.activityCount
        this.userList.forEach(element => {
          element['encryptedId'] = btoa(JSON.stringify(element))

          let timestamp = (new Date().getTime() - new Date(element.creationTime).getTime()) / 1000

          let hours = Math.floor(timestamp / (60 * 60));

          let min = Math.floor(timestamp / 60) - (hours * 60);
          element['ago'] = (hours != 0 ? hours + ' hours ' : '') + (min != 0 ? min + ' mins ' : '')
        });
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

  //--------Transaction Get Api Integrtion -------------//
  getTransactionList() {
    this.userList = []
    this.totalItems = 0;
    let url = apiEndpoint.userTransaction.getUserTransaction + `?id=${this.userDetailsObj.id}&ipAddress=${localStorage.getItem('ip')}&page=${this.currentPage - 1}&pageSize=${this.itemPerPage}`
    if (this.orderId) {
      url = url + `&orderId=${this.orderId}`
    }
    if (this.orderType) {
      url = url + `&orderType=${this.orderType}`
    }
    this.server.showSpinner()
    this.server.getApi(url).subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {
        this.server.showSuccToast(res.message)
        this.userList = res.data.finalResponse
        this.orderTypeList = res.data.orderTypeList
        this.totalItems = res.data.count

        this.userList.forEach(element => {
          let timestamp = (new Date().getTime() - new Date(element.time).getTime()) / 1000
          let hours = Math.floor(timestamp / (60 * 60));
          let min = Math.floor(timestamp / 60) - (hours * 60);
          element['ago'] = (hours != 0 ? hours + ' hours ' : '') + (min != 0 ? min + ' mins ' : '')
        });
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

  viewTransaction(item) {
    this.viewTransactionObj = item
    this.transactionView = !this.transactionView


  }

  //---------open Order Get API Integrtion -----------//

  getOpenOrders() {
    this.userList = []
    this.totalItems = 0;
    let url = apiEndpoint.openOrders.getopenOrders + `?id=${this.userDetailsObj.id}&ipAddress=${localStorage.getItem('ip')}&page=${this.currentPage - 1}&pageSize=${this.itemPerPage}`
    if (this.orderId) {
      url = url + `&orderId=${this.orderId}`
    }
    if (this.orderType) {
      url = url + `&orderType=${this.orderType}`
    }
    this.server.showSpinner()
    this.server.getApi(url).subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {
        this.server.showSuccToast(res.message)
        this.userList = res.data.finalResponse
        this.orderTypeList = res.data.orderTypeList
        this.totalItems = res.data.count
        this.userList.forEach(element => {
          let timestamp = (new Date().getTime() - new Date(element.time).getTime()) / 1000
          let hours = Math.floor(timestamp / (60 * 60));
          let min = Math.floor(timestamp / 60) - (hours * 60);
          element['ago'] = (hours != 0 ? hours + ' hours ' : '') + (min != 0 ? min + ' mins ' : '')
        });
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

  backToUserList() {
    this.selfieObj = {}
    this.documentObj = {}
    this.buttonName = 'list'
    localStorage.removeItem('appId')
    this.wallet = !this.wallet
    this.getUserList()
  }

  walletBack() {
    this.wallet = true
  }

  transactionBack() {
    this.transactionView = true
  }

  beneficiaryBack() {
    this.beneficiaryView = true
  }

  onFromSelect() {
    let date = new Date(this.fromDate).getTime() + 24 * 60 * 60 * 1000
    this.maxToDate = new Date(date).toLocaleDateString().split('/').reverse().join('-');

  }
  onToSelect() {
    let date = new Date(this.toDate).getTime() - 24 * 60 * 60 * 1000
    this.maxFromDate = new Date(date).toLocaleDateString().split('/').reverse().join('-');

  }



  //--------------ONFIDO GET KYC REPORT ------------------//

  getApplicantId() {
    let url = apiEndpoint.ApplicantId.getApplicantId + `?applicantId=${this.userDetailsObj.kyc.applicantId}&ip=${localStorage.getItem('ip')}`
    // let url = apiEndpoint.ApplicantId.getApplicantId+`?applicantId=855d8c2b-b0fe-4050-ab52-6ddec524962e`
    this.server.showSpinner()
    this.server.getApi(url).subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {
        this.applicantList = res.data.checks[0].applicant_id
        this.check = res.data.checks[0].id
        let checkId = res.data.checks[0].id
        let reportId = res.data.checks[0].report_ids[0]
        this.getReports(checkId)
        // this.getOnfidoImage()
        // this.getReportsObject(reportId)
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


  // to get onfido reports
  getReports(checkId) {
    this.reportList = []
    let url = apiEndpoint.reportListId.getReportListId + `?checkId=${checkId}&ip=${localStorage.getItem('ip')}`
    // let url = apiEndpoint.reportListId.getReportListId+`?checkId=f76fc6e6-6293-4908-8bbf-7ff73bff656b`
    this.server.showSpinner()
    this.server.getApi(url).subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {
        let arr = res.data.reports
        arr.forEach(ele1 => {
          let obj = { 'list': [] }
          obj['name'] = ele1.name
          obj['result'] = ele1.result
          let sub_arr_1 = ele1.breakdown ? Object.keys(ele1.breakdown) : []
          sub_arr_1.forEach(name => {
            let obj2 = { 'list': [] }
            obj2['name'] = name
            obj2['result'] = ele1.breakdown[name].result

            let sub_arr_2 = ele1.breakdown[name].breakdown ? Object.keys(ele1.breakdown[name].breakdown) : []
            sub_arr_2.forEach(sub_name => {
              
              let obj3 = { 'list': [] }
              obj3['name'] = sub_name
              obj3['result'] = ele1.breakdown[name].breakdown[sub_name].result

              let sub_arr_3 = ele1.breakdown[name].breakdown[sub_name].properties ? Object.keys(ele1.breakdown[name].breakdown[sub_name].properties) : []
              sub_arr_3.forEach(sub_name_end => {
                let obj4 = {}

                obj4['name'] = sub_name_end
                obj4['value'] = ele1.breakdown[name].breakdown[sub_name].properties[sub_name_end]
                obj3['list'].push(obj4)
              });
              obj2['list'].push(obj3)
            });
            obj['list'].push(obj2)
          });

          this.reportList.push(obj)

        });
        this.userDetailsObj['kycDetailsObj'] = arr.find(x => (x.properties['first_name']))

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

  // to onfido image
  getOnfidoImage() {
    let url = apiEndpoint.onFidoThirdPartyApi.onfidoImage + `${this.userDetailsObj.frontKyc.face.id}/download`
    // let url = 'https://api.eu.onfido.com/v3.2/live_photos/bc4798b5-34df-49e0-ba36-e6a4d450a899/download'
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token token=api_live.KbiPo-QG49-.E8UnxDidX7l0KziSrGpTphTYhsq8y-1n',
        //  'Content-Type': ' application/json'
      })
    };
    this.server.showSpinner()
    this.server.getOnfidoApi(url, httpOptions).subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {
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
  // to onfido documents
  getOnfidoDocuments() {
    let url = apiEndpoint.onFidoThirdPartyApi.onfidoDocuments + `${this.userDetailsObj.frontKyc.document.back.id}/download`
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token token=api_live.KbiPo-QG49-.E8UnxDidX7l0KziSrGpTphTYhsq8y-1n',
      })
    };

    this.server.showSpinner()
    this.server.getOnfidoApi(url, httpOptions).subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {
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
  //--------to getid image----\\
  getIdImages() {
    let url = 'https://scallop.sb.getid.dev/files/proxy/images/cc1de3f77ebd65675ce678fabd09d42f8b56af7de44cb5deda854bb6899f2615.jpeg?t=1628149091945&s=d0a4a0e863a4869ba55568078091ab0b7ac28a74aa876d5964cbdcd8a8c19bfe'
    let httpOptions = {
      headers: new HttpHeaders({
        'X-API-Key': '7e0fcaf10451b12ee602f6832d046fbacd4cff44bc7087e2fa0bfa276d0cda5a',
      })
    };

    this.server.showSpinner()
    this.server.getGetIdApi(url, httpOptions).subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {

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

  // to get REPORT OBJECT

  // getReportsObject(reportId) {
  //   let url = apiEndpoint.reportObjList.getReportListObj+`?reportId=${reportId}`
  //   this.server.showSpinner()
  //   this.server.getApi(url).subscribe(res => {
  //     this.server.hideSpinner()
  //     if (res.status == 200) {
  //       this.reportList = res.data
  //     }
  //   },(err: any) => {
  //     this.server.hideSpinner();
  //     if (err.status == 401 || err.status == 400 || err.status == 404) {
  //       this.server.showErrToast(err.error.message  );
  //     } else {
  //       this.server.showErrToast(err.error.message);
  //     }
  //   })
  // }


  openView(item) {
    this.buttonName = 'View';
    this.userDetailsObj = item;
    this.patchData()
    this.title = 'User Detail'
    if (item.kyc.kycPartner == 'GETID')
      localStorage.setItem('appId', item.kyc.applicantId)
      console.log(item.kyc.applicantId)
    //-----------------beneficiaries---------------//   
    this.userDetailsObj['beneficiaryDetails'] = []
    if (this.userDetailsObj['account']['eur_account']['accountType']) {
      this.userDetailsObj['beneficiaryDetails'] = this.userDetailsObj.account.eur_account['details']['data']['beneficiaries']
    } else if (this.userDetailsObj.account.gbp_account.accountType) {
      this.userDetailsObj['beneficiaryDetails'] = this.userDetailsObj.account.gbp_account['details']['data']['beneficiaries']
    }
    //-----------------ledgers---------------//   
    this.userDetailsObj['ledgersDetails'] = []
    if (this.userDetailsObj['account']['eur_account']['accountType']) {
      this.userDetailsObj['ledgersDetails'] = this.userDetailsObj.account.eur_account['details']['data']['ledgers']
    } else if (this.userDetailsObj.account.gbp_account.accountType) {
      this.userDetailsObj['ledgersDetails'] = this.userDetailsObj.account.gbp_account['details']['data']['ledgers']
    }
    //----------------profile-----------------//
    this.userDetailsObj['userInfoDetails'] = {}
    if (this.userDetailsObj.account.eur_account.userType) {
      this.userDetailsObj['userInfoDetails'] = this.userDetailsObj.account.eur_account

    } else if (this.userDetailsObj.account.gbp_account.userType) {
      this.userDetailsObj['userInfoDetails'] = this.userDetailsObj.account.gbp_account
    }


  
  }

  onViewWallet(item) {
    this.walletDetailsObj = item
    let a = item.data
    this.walletDetailsObj['mainArr'] = []
    while (a.length > 3) {
      this.walletDetailsObj['mainArr'].push(a.splice(0, 3));
    }
    if (a.length <= 3) {
      this.walletDetailsObj['mainArr'].push(a);
    }

    this.wallet = false

  }

  onViewHardWallet(item) {
    this.walletDetailsObj = item
    let a = item.data
    this.walletDetailsObj['mainArr'] = []
    while (a.length > 3) {
      this.walletDetailsObj['mainArr'].push(a.splice(0, 3));
    }
    if (a.length <= 3) {
      this.walletDetailsObj['mainArr'].push(a);
    }

    this.wallet = false

  }

  onViewLedger(item) {
    this.ledgerDetailsObj = item
    this.ledgerView = false
  }
  ledgerBack() {
    this.ledgerView = true
  }

  onViewbeneficiary(item) {
    this.beneficiaryDetailsObj = item
    this.beneficiaryView = false
  }


  // GETID API 
  getIdApplicantId() {
    let url = apiEndpoint.getId.getIDReportList + `?ip=${localStorage.getItem('ip')}`
    this.server.showSpinner()
    this.server.getApi(url).subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {
        this.getIdReportList = res.data

        
        
        //-----------------rekyc reportlist-----------------//


        let ocr = this.getIdReportList['servicesResults']['docCheck']['extracted']['ocr']
        this.getIdReportList['servicesResults']['profileCheck']['fieldChecking'].forEach(ele => {
          let index = ocr.findIndex(x => x.category == ele.category)
          if (index != -1) {
            this.getIdReportList['servicesResults']['docCheck']['extracted']['ocr'][index]['equal'] = ele.equal
            this.getIdReportList['servicesResults']['docCheck']['extracted']['ocr'][index]['field'] = ele.field
            this.getIdReportList['servicesResults']['docCheck']['extracted']['ocr'][index]['extracted'] = ele.extracted
            this.getIdReportList['servicesResults']['docCheck']['extracted']['ocr'][index]['status'] = ele.status
          }
        });

        this.getIdReportList['servicesResults']['profileCheck']['fieldChecking'].forEach(ele => {
          let index = ocr.findIndex(x => x.category == ele.category)
          if (index != -1) {
            let obj = this.getIdReportList['servicesResults']['docCheck']['extracted']['ocr'][index]
            this.getIdReportList['servicesResults']['docCheck']['extracted']['ocr'].splice(index, 1)
            this.getIdReportList['servicesResults']['docCheck']['extracted']['ocr'].splice(0, 0, obj);
          }
        });

        this.getIdReportList['metaKeys'] = Object.keys(this.getIdReportList.metadata)
        this.getIdReportList['metaValues'] = Object.values(this.getIdReportList.metadata)



        this.onSelfieActive(0)
        this.onDocumentActive(0)

        // to check req obj 
        let index_db = this.getIdReportList['servicesResults']['docCheck']['extracted']['ocr'].findIndex(x=>x.category == 'Date of birth')
        if(index_db != -1){
          this.reKycReportObj['dob'] = (this.getIdReportList['servicesResults']['docCheck']['extracted']['ocr'].find(x=>x.category == 'Date of birth'))['content'] || ''
        }else {
          this.reKycReportObj['dob'] = (this.getIdReportList['servicesResults']['docCheck']['extracted']['mrz'].find(x=>x.category == 'Date of birth'))['content'] || ''
        }

        let index_address = this.getIdReportList['servicesResults']['docCheck']['extracted']['ocr'].findIndex(x=>x.category == 'Address')
        if(index_address != -1){
          this.reKycReportObj['address'] = (this.getIdReportList['servicesResults']['docCheck']['extracted']['ocr'].find(x=>x.category == 'Address'))['content'] || ''
        }else {
          this.reKycReportObj['address'] = (this.getIdReportList['servicesResults']['docCheck']['extracted']['mrz'].find(x=>x.category == 'Address'))['content'] || ''
        }


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

  // to manage border on select for selfie
  onSelfieActive(index) {
    this.getIdReportList.application.selfie.files.forEach(ele => {
      ele['selected'] = false
    });
    this.selfieObj = this.getIdReportList.application.selfie.files[index]
    this.getIdReportList.application.selfie.files[index]['selected'] = true
  }

  onDocumentActive(index) {
    this.getIdReportList.application.documents[0].files.forEach(ele => {
      ele['selected'] = false
    });
    this.documentObj = this.getIdReportList.application.documents[0].files[index]
    this.getIdReportList.application.documents[0].files[index]['selected'] = true
  }




  // ------------------------------- block/unblock functinality start----------------------------- //
  BlockModal(userId, userStatus) {
    $('#BlockModal').modal('show')
    this.userId = userId
    this.status = userStatus
  }


  blockUser() {
    let url = apiEndpoint.getRole.deleteUser
    url = url + `?ip=${localStorage.getItem('ip')}&blockedUsrId=${this.userId}&userStatus=${this.status}`
    this.server.showSpinner();
    this.server.postApi(url, '').subscribe((res: any) => {
      if (res.status == 200) {
        $('#BlockModal').modal('hide');
        this.server.showSuccToast(res.message)
        this.getUserList();
      } else {
        this.server.hideSpinner();
        this.server.showErrToast(res.message)
      }
    })
  }

  //--------------coin Get Api Integration-------//
  getCoinList() {
    let url = apiEndpoint.coins.updateCoins + `?${this.currentPage - 1}`
    this.server.showSpinner()
    this.server.getApi(url).subscribe(res => {
      this.server.hideSpinner()
      if (res.status == 200) {
        this.coinImage = res.data
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

  //---------view wallet-----------//
  viewWallet() {
    this.wallet = !this.wallet
  }

  setWalletCards() {
    this.userDetailsObj.wallet.walletData.forEach(obj => {
      obj['colorImg'] = this.walletCardsArr[Number(obj['color']) - 1].color
      obj['textureImg'] = this.walletCardsArr[Number(obj['texture']) - 1].texture
      obj['iconImg'] = this.walletCardsArr[Number(obj['icons']) - 1].icon
    });

  }

  setHardWalletCards() {
    this.userDetailsObj.hardwareWallet.walletData.forEach(obj => {
      obj['colorImg'] = this.walletCardsArr[Number(obj['color']) - 1].color
      obj['textureImg'] = this.walletCardsArr[Number(obj['texture']) - 1].texture
      obj['iconImg'] = this.walletCardsArr[Number(obj['icons']) - 1].icon
    });

  }


  LerexKycModal(endUserId) {
    this.endUserId = endUserId
    $('#LerexKycModal').modal('show')

    this.lerexTechKyc(this.endUserId)
  }


  lerexTechKyc(endUserId) {
    let url = `https://sandbox.lerextech.com/api/rest/users/request-kyc-check?userId=${endUserId}`
    this.server.showSpinner()
    this.server.getLerexTechApi(url).subscribe(res => {
      this.server.hideSpinner()
      this.kycLerex = res
      if (res.status == 200) {

        this.kycLerex = res
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



  loginFormValidation() {
    this.loginForm = new FormGroup({
      'email': new FormControl("", [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
      'number': new FormControl('', [Validators.required]),

      // 'rememberMe': new FormControl('',[Validators.required]),
    })

  }

  //-----------GET UISER VERFY API INTEGRTION------------------//
  submitForm() {
    let url = apiEndpoint.getVerfyUser.getResetPassword + `?userIdToResetPassword=${this.userDetailsObj.id}`
    this.server.getApi(url).subscribe(res => {
      if (res.status == 200) {
        this.server.showSuccToast(res.message)
        $('#ResetModal').modal('hide')

      } else {
        this.server.showInfoToast(res.message)
      }
    }, err => {
      this.server.showErrToast(err.error.error)
    })
  }

  patchData() {
    this.loginForm.patchValue({
      'email': this.userDetailsObj.email,
      'number': this.userDetailsObj.profile.phoneNo
    })
  }



  submitPhoneForm() {
    let url = apiEndpoint.getVerfyUser.getPhone + `${this.userDetailsObj.id}/${this.loginForm.value.number}`
    this.server.putApi(url,'').subscribe(res => {
      if (res.status == 200) {
        this.server.showSuccToast(res.message)
        $('#NumberModal').modal('hide')

      } else {
        this.server.showInfoToast(res.message)
      }
    }, err => {
      this.server.showErrToast(err.error.error)
    })
  }
  //---------------ACCEPTED & REJECTED DEPENDSON KYCSTATUS------------//


  kycStatusApi(userId, kycStatus) {
    this.kycstatus = kycStatus
    this.userId = userId
    let url = apiEndpoint.kycStatus.getKycStatus + `?kycStatus=${this.kycstatus}&userId=${this.userId}`
    this.server.getApi(url).subscribe(res => {
      if (res.status == 200) {
        this.server.showSuccToast(res.message)

      } else {
        this.server.showInfoToast(res.message)
      }
    }, err => {
      this.server.showErrToast(err.error.error)
    })
  }

  //--------------checklist api----------------//
  checklist(userId,item) {
    if (item.account['eur_account']['userType']) {
      this.enduserIdforKyc = item.account['eur_account'].details.data.enduser_id
    } else if (item.account['gbp_account']['userType']) {
      this.enduserIdforKyc = item.account.gbp_account.details.data.enduser_id
    }

    this.reKycObj = item
    this.userId = userId
    let url = apiEndpoint.checkList.getChecklist + `?userId=${this.userId}`
    this.server.getApi(url).subscribe(res => {
      if (res.status == 200) {
        this.server.showSuccToast(res.message)
        this.checklistObj = res.data
      } else {
        this.server.showInfoToast(res.message)
      }
    }, err => {
      this.server.showErrToast(err.error.error)
    })
  }

  reKycModal(reKycObj){
    this.reKycObj=reKycObj
    $('#checklistModal').modal('hide')
    if (this.reKycObj.kyc.kycPartner == 'GETID')
    localStorage.setItem('appId', this.reKycObj.kyc.applicantId)
    this.getIdApplicantId()
    $('#reKycModal').modal({backdrop: 'static', keyboard: false}) 
  }

  closeRekycModal(){
    localStorage.removeItem('appId')
  }

  reKycUser(rekycId) {
    this.reKycObj['userInfoDetails'] = {}
    if (this.reKycObj['account']['eur_account']['accountType']) {
      this.reKycObj['userInfoDetails'] = this.reKycObj.account.eur_account

    } else if (this.reKycObj.account.gbp_account.accountType) {
      this.reKycObj['userInfoDetails'] = this.reKycObj.account.gbp_account
    }


    let reKycId = rekycId
    let security = this.reKycObj?.profile?.question
    let url = apiEndpoint.user.userSignup
    let req ={
      "accountType":  this.reKycObj['userInfoDetails'].accountType,
      "applicantId": this.reKycObj.kyc.applicantId,
      "biometryType": "",
      // "companyDto": {
      //   "company": {
      //     "companyDetails": {
      //       "address": {
      //         "buildingNo": this.reKycObj.account.companyDetails.company.companyDetails.address.buildingNo,
      //         "city": this.reKycObj.account.companyDetails.company.companyDetails.address.city,
      //         "houseNo": this.reKycObj.account.companyDetails.company.companyDetails.address.houseNo,
      //         "isoCountry": this.reKycObj.account.companyDetails.company.companyDetails.address.isoCountry,
      //         "postalCode": this.reKycObj.account.companyDetails.company.companyDetails.address.postalCode,
      //         "refinement": this.reKycObj.account.companyDetails.company.companyDetails.address.refinement,
      //         "state": this.reKycObj.account.companyDetails.company.companyDetails.address.state,
      //         "street": this.reKycObj.account.companyDetails.company.companyDetails.address.street
      //       },
      //       "name": "string",
      //       "regitration": "string"
      //     },
      //     "directorDetails": {
      //       "address": {
      //         "buildingNo": this.reKycObj.account.companyDetails.company.directorDetails.buildingNo,
      //         "city": this.reKycObj.account.companyDetails.company.directorDetails.city,
      //         "houseNo": this.reKycObj.account.companyDetails.company.directorDetails.houseNo,
      //         "isoCountry": this.reKycObj.account.companyDetails.company.directorDetails.isoCountry,
      //         "postalCode": this.reKycObj.account.companyDetails.company.directorDetails.postalCode,
      //         "refinement": this.reKycObj.account.companyDetails.company.directorDetails.refinement,
      //         "state": this.reKycObj.account.companyDetails.company.directorDetails.state,
      //         "street": this.reKycObj.account.companyDetails.company.directorDetails.street,
      //       },
      //       "countryOfResidence": this.reKycObj.account.companyDetails.company.directorDetails.countryOfResidence,
      //       "firstName": this.reKycObj.account.companyDetails.company.directorDetails.firstName,
      //       "lastName": this.reKycObj.account.companyDetails.company.directorDetails.lastName,
      //       "middleName": this.reKycObj.account.companyDetails.company.directorDetails.middleName,
      //       "nationality": this.reKycObj.account.companyDetails.company.directorDetails.nationality,
      //     },
      //     "question": [
      //       {
      //         "answer": "string",
      //         "question": "string"
      //       }
      //     ]
      //   }
      // },
      "email": this.reKycObj.email,
      "financials": {
        "annual_income": this.reKycObj.financials.annual_income,
        "deposit_initially": this.reKycObj.financials.deposit_initially,
        "investment_experience": this.reKycObj.financials.investment_experience,
        "source_of_funds": this.reKycObj.financials.source_of_funds
      },
      "imageSrc": this.reKycObj.imageSrc,
      "ip":localStorage.getItem('ip'),
      "kycPartner": this.reKycObj.kyc.kycPartner ,
      // "onfidoData": {
      //   "privacyNoticesReadConsentGiven": "string",
      //   "reportNames": [
      //     "string"
      //   ]
      // },
      "phoneNo":this.reKycObj.profile.phoneNo,
      "profile": {
        "address": {
          "buildingName": this.reKycObj.profile.address.buildingName || this.reKycReportObj['address'],
          "city": this.reKycObj.profile.address.city,
          "houseNo": this.reKycObj.profile.address.houseNo || this.reKycReportObj['address'],
          "isoCountry": this.reKycObj.profile.address.isoCountry,
          "postalCode": this.reKycObj.profile.address.postalCode,
          "refinement": this.reKycObj.profile.address.refinement,
          "state": this.reKycObj.profile.address.state,
          "street": this.reKycObj.profile.address.street
        },
        "buildingName": this.reKycObj.profile.buildingName || this.reKycReportObj['address'],
        "country": this.reKycObj.profile.country,
        "countryOfResidence": this.reKycObj.profile.countryOfResidence,
        "dateOfBirth": this.reKycObj.profile.dateOfBirth || this.reKycReportObj['dob'],
        "firstName": this.reKycObj.profile.firstName,
        "houseNo": this.reKycObj.profile.address.country || this.reKycReportObj['address'],
        "imageSrc": this.reKycObj.imageSrc,
        "lastName": this.reKycObj.profile.lastName,
        "middleName": this.reKycObj.profile.middleName,
        "nationality": this.reKycObj.profile.nationality,
        "phoneNo": this.reKycObj.profile.phoneNo,
        "phoneNoWithoutCountryCode": this.reKycObj.profile.phoneNoWithoutCountryCode,
        "question": security,
        "userName":this.reKycObj.profile.firstName +''+ this.reKycObj.profile.lastName,
        "zipCode":this.reKycObj.profile.zipCode,
      },
      "userType":  this.reKycObj['userInfoDetails'].userType
    }
    this.server.showSpinner()
    this.server.putApi(url, req).subscribe((res: any) => {
      this.server.hideSpinner()
      if (res.status == 200) {
        this.server.showSuccToast(res.message)
          $('#reKycModal').modal('hide')

      }
    },
      (err: any) => {
        this.server.hideSpinner();
        if (err.status == 401 || err.status == 400 || err.status == 404) {
          this.server.showErrToast(err.error.message);
        } else {
          this.server.showErrToast(err.message);
        }
      }
    )
  }
//--------------upload kyc----------------//
  uploadReKyc(){
    let url = apiEndpoint.kycStatus.uploadKyc + `${this.enduserIdforKyc}+?imageUrl=${this.kycImg}`
    this.server.postApi(url,'').subscribe(res => {
      if (res.status == 200) {
        this.server.showSuccToast(res.message)
        this.checklistObj = res.data
      } else {
        this.server.showInfoToast(res.message)
      }
    }, err => {
      this.server.showErrToast(err.error.error)
    })
  }

  uploadImage(){
    let url = apiEndpoint.coins.uploadImage
    let form_data = new FormData(); 
      form_data.append('file',(this.imageUrl))
      this.server.postApi(url,form_data).subscribe(res=>{
        if(res.status == 200){
          this.kycImg = res.data
          this.uploadReKyc()
        }
      })
      
  }
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.imageUrl = file
    this.uploadImage()
  }

}
