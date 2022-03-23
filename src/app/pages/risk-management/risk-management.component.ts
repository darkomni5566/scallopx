import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';
import { apiEndpoint } from 'src/environments/environment.prod';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { ExportToCsv } from 'export-to-csv';
import * as XLSX from 'xlsx';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Subject } from 'rxjs/internal/Subject';
@Component({
  selector: 'app-risk-management',
  templateUrl: './risk-management.component.html',
  styleUrls: ['./risk-management.component.scss']
})
export class RiskManagementComponent implements OnInit {
  selectedIndex: any=null;
  tabName:any='NATIONALITY'
  userList: any[];
  searchKey: any='';
  itemPerPage = 10;
  currentPage = 1;
  totalItems: any=0;
  nationalityList: any[];
  csvRecords: any = [];
  header = true;
  preview : boolean = false
  countryArr: any=[];
  search$: Subject<any>=new Subject;
  sub: any;
  allCountry: any=[];
  showOptions:boolean=false
  permissionObj: any={};
  buttonName;any
  constructor(public server:ServerService,private ngxCsvParser: NgxCsvParser) { 
    let  permitted_routes 
    permitted_routes = localStorage.getItem('permitted') ? JSON.parse(atob(localStorage.getItem('permitted'))) : []
    this.permissionObj = permitted_routes.find(x=>x.name == 'Risk Management')
   }

  arr=[]
  ngOnInit(): void {
    this.getNationalityRiskList()
    this.subscribeToSearch()
    }

    ngOnDestroy() {
      if(this.sub) {
        this.sub.unsubscribe()
      }
    }

     // -------------------------------------------------TO SEARCH --------------------------------------------------------------------------------
   subscribeToSearch() {
    this.sub = this.search$.pipe(debounceTime(1000)).subscribe((val) => {
      this.countryArr =[]
      console.log(val)
      this.searchKey = val
    
      if(val) {

        this.showOptions= true
        this.allCountry.forEach(ele=> {
          if(ele.toLowerCase().includes(val.toLowerCase())){
            this.countryArr.push(ele)
          }
        });
      }else {

        this.showOptions=false
        // this.allCountry.forEach(ele => {
        //   this.countryArr.push(ele)
        // });
        this.getNationalityRiskList()
      }
    })
  }


  onEditAction(index) {
    this.selectedIndex = index
    this.nationalityList.forEach(element => {
      element.disable = true
    });
    this.nationalityList[index].disable = false
  }

  onSaveAction(index,item) {
    let url,req={};
    this.nationalityList[this.selectedIndex]['risk'] = document.getElementById(index+'type-preview')['value']
    this.nationalityList[this.selectedIndex]['score'] = document.getElementById(index+'score-preview')['value']
    delete this.nationalityList[this.selectedIndex]['disable']

      if(this.tabName == 'NATIONALITY') {
        url  = apiEndpoint.nationalityRisk.getnationalityRisk;
        req['nationalityRiskRatingListdto'] = [this.nationalityList[this.selectedIndex]]
      }else if(this.tabName == 'RESIDENTS') {
        url  = apiEndpoint.countryResidenceRisk.getCountryResidence;
        req['countryResidenceRiskListDto'] = [this.nationalityList[this.selectedIndex]]
      }else if(this.tabName == 'SCREEING'){
        url  = apiEndpoint.screeningRisk.getscreeningRisk;
        req['screeningRiskListDto'] = [this.nationalityList[this.selectedIndex]]
      }
    
    this.server.postApi(url,req).subscribe((res:any)=>{
      if(res.status == 200) {
        this.server.showSuccToast(res.message);
        this.selectedIndex = null;
        this.nationalityList[index].disable = true
        this.getNationalityRiskList()
      }
    })
  }

   // remove action 
   onRemoveAction(index,data) {
    if(data.type == 'new') {
      this.arr.splice(0,1)
      console.log(data.type == 'new')
    }
      this.selectedIndex = null;

      console.log(this.selectedIndex)
      this.nationalityList.forEach(element => {
        element.disable = true
      });
      document.getElementById(index+'score-preview')['value'] = this.nationalityList[index]['score']
      document.getElementById(index+'type-preview')['value'] = this.nationalityList[index]['risk']
  }
 


   
  //----------get Country of Nationality --------------//

     getNationalityRiskList() {
      this.nationalityList = [];
      this.csvRecords =[]
      this.totalItems = 0;
      let url;
      // on selected tab condition
      if(this.tabName == 'NATIONALITY') {
        url  = apiEndpoint.nationalityRisk.getnationalityRisk;
      }else if(this.tabName == 'RESIDENTS') {
        url  = apiEndpoint.countryResidenceRisk.getCountryResidence
      }else if(this.tabName == 'SCREEING'){
        url  = apiEndpoint.screeningRisk.getscreeningRisk;
      }
      // for pagination
      url = url + `?page=${this.currentPage - 1}&pageSize=${this.itemPerPage}&ip=${localStorage.getItem('ip')}`
      // if country selcted in filter
      if (this.searchKey && this.tabName != 'SCREEING') {
        url = url + `&country=${this.searchKey}`
      }else if(this.searchKey && this.tabName == 'SCREEING'){
        url = url + `&authorizedSigners=${this.searchKey}`
      }
      
      this.server.showSpinner()
      this.server.getApi(url).subscribe(res => {
        this.server.hideSpinner()
        if (res.status == 200) {
          console.log(typeof res.data.data)
          if(this.searchKey && res.data.data)  {
            this.nationalityList.push(res.data.data)
          }else {
            this.nationalityList = res.data.data  ? res.data.data :[]
          }

          this.countryArr = this.tabName == 'SCREEING' ?  res.data.authorizedSigners : res.data.countryList
          this.allCountry = this.tabName == 'SCREEING' ?  res.data.authorizedSigners : res.data.countryList
          
        
         
          this.totalItems = res.data.count
          this.nationalityList.forEach(element => {
            element['disable'] = true
          });
        }
      })
    }
  //----------get Country of ScreeningRiskList --------------//

    

    //--------------Pagination --------------//
    pagination(event) {
    this.currentPage = event;
    this.getNationalityRiskList()
    }

    // on reset
    clearSearch() {
      this.currentPage = 1;
      this.totalItems = 0;
      this.countryArr = []
      this.searchKey= ''
      this.preview = false
      this.showOptions=false
      this.nationalityList = []
      this.searchKey=''
      if(document.getElementById('myfile')) {
        document.getElementById('myfile')['value']=null
      }
      this.getNationalityRiskList()
    }
 
   // Your applications input change listener for the CSV File for nationality
   fileChangeListener($event: any): void {
    let file = $event.target.files[0];
    console.log(file)
    let type = file.type
    if(type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.convertToExcel($event)
    }else if(type == 'text/csv') {
      this.csvFileParser(file)
    }
    console.log(file)   
  }

  // TO extract data from excel file
  convertToExcel(evt: any): void {
    let data, header;
    const target: DataTransfer = <DataTransfer>(evt.target);
    let isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (target.files.length > 1) {
      // this.inputFile.nativeElement.value = '';
    }
    if (isExcelFile) {
      // this.spinnerEnabled = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws);
      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        // this.spinnerEnabled = false;
        let keys = Object.keys(data[0]);
        this.csvRecords=data;
        this.preview= true;
        console.log(data)
      }
    } else {
      // this.inputFile.nativeElement.value = '';
    }
  }
   

  //----------Import csv file for nationality
  csvFileParser(data) {
    console.log(data)
    this.ngxCsvParser.parse(data, { header: this.header, delimiter: ',' })
    .pipe().subscribe((result: Array<any>) => {
      console.log('Result', result);
      this.csvRecords = result;
      this.preview = true
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });
  }
  
 
    // to upload nationality
    confirmUpload() {

      let url,req={};
      this.csvRecords.forEach((ele,index) => {
        ele['risk'] = document.getElementById(index+'type-preview')['value'],
        ele['score'] = document.getElementById(index+'score-preview')['value']
      });


      if(this.tabName == 'NATIONALITY') {
        url  = apiEndpoint.nationalityRisk.getnationalityRisk
        req['nationalityRiskRatingListdto'] = this.csvRecords
      }else if(this.tabName == 'RESIDENTS') {
        url  = apiEndpoint.countryResidenceRisk.getCountryResidence
        req['countryResidenceRiskListDto'] = this.csvRecords
      }else if(this.tabName == 'SCREEING'){
        url  = apiEndpoint.screeningRisk.getscreeningRisk;
        req['screeningRiskListDto'] = this.csvRecords
      }
    
      this.server.showSpinner()
      this.server.postApi(url,req).subscribe(res=>{
        this.server.hideSpinner()
        console.log(res)
        if(res.status == 200) {
          this.preview = false
          this.csvRecords = [];
          this.server.showSuccToast(res.message)
         this.clearSearch()
        }
      })

    }


  ExportToCsv(){
    this.server.showSpinner()
    setTimeout( r => {
      this.server.hideSpinner()
    },3000)
    let listingArr=[]
    this.nationalityList.forEach((element)=> {
      let obj ={}
      
      if(this.tabName == 'NATIONALITY') {
       obj['countryOfNationality'] = element.countryOfNationality
      }else if(this.tabName == 'RESIDENTS') {
        obj['countryOfResidency'] = element.countryOfResidency
      }else if(this.tabName == 'SCREEING'){
        obj['authorizedSigners'] = element.authorizedSigners
      }
      obj['risk'] = element.risk
      obj['score'] = element.score
      listingArr.push(obj)

    });
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
     csvExporter.generateCsv(listingArr); 
  }
 
    
}


