import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-kyc-management',
  templateUrl: './kyc-management.component.html',
  styleUrls: ['./kyc-management.component.scss']
})
export class KycManagementComponent implements OnInit {
  
  csvRecords: any = [];
  
  preview: boolean = false
  countryArr: any = [];
  search$: Subject<any> = new Subject;
  sub: any;
  allCountry: any = [];
  showOptions: boolean = false
  permissionObj: any = {};
  buttonName; any
  myArr: any=[];
  header: boolean;
  constructor(public server: ServerService, private ngxCsvParser: NgxCsvParser) {
    let permitted_routes
    permitted_routes = localStorage.getItem('permitted') ? JSON.parse(atob(localStorage.getItem('permitted'))) : []
    this.permissionObj = permitted_routes.find(x => x.name == 'User SignUp')
  }

  arr = []
  ngOnInit(): void {
    
  }


  // Your applications input change listener for the CSV File for nationality
  fileChangeListener($event: any): void {
    let file = $event.target.files[0];
    let type = file.type
    if (type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.convertToExcel($event)
    } else if (type == 'text/csv') {
      this.csvFileParser(file)
    }
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
        this.csvRecords = data;
        this.preview = true;
        this.myArr = []

        this.csvRecords.forEach(ele => {
          let req = {

            "deviceToken": "string",
            "deviceType": "string",
            "email": ele.email,
            "ip": "string",
            "password": ele.password,
            "phoneNo": ele.phoneNo,
            "role": "USER",
            "userStatus": "UNVERIFIED"

          }
          this.myArr.push(req)
        });
        this.callApi(this.myArr)
      }
    } else {
      // this.inputFile.nativeElement.value = '';
    }
  }

  callApi(myArr) {
    let req={
      "signupDto":myArr
    }
    this.server.postApi(`account/v1/list/users`,req).subscribe(res=>{
      if(res.status == 200){
      }
    },err=>{})
  }

  //----------Import csv file for nationality
  csvFileParser(data) {
    this.ngxCsvParser.parse(data, { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        this.csvRecords = result;
        this.preview = true
      }, (error: NgxCSVParserError) => {
      });
  }











}
