import { Component, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { apiEndpoint } from "src/environments/environment.prod";
import { ActivatedRoute, Router } from "@angular/router";
import { ServerService } from "src/app/service/server.service";
  
/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end


@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  dashBoardList: any;
  permissionObj: any={};


  constructor(public server: ServerService, private router: Router, private route: ActivatedRoute) {
    let  permitted_routes 
    permitted_routes = localStorage.getItem('permitted') ? JSON.parse(atob(localStorage.getItem('permitted'))) : []
    this.permissionObj = permitted_routes.find(x=>x.name == 'Dashboard')   
  }

  ngOnInit() {
    this.getDashBoard()
  }


  firstChart(){
    let chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
   
     chart.legend = new am4charts.Legend();
   
   chart.data = [
     
     {
       country: "EUR",
       litres: this.dashBoardList.EUR.totalUsers
     },
     {
       country: "UK",
       litres: this.dashBoardList.UK.totalUsers
     },
     {
       country: "ROW",
       litres: this.dashBoardList.ROW.totalUsers
     },
    
   ];
   
   let series = chart.series.push(new am4charts.PieSeries3D());
     series.dataFields.value = "litres";
     series.dataFields.category = "country";
  }

  secondChart(){
    let chart = am4core.create("chartdiv1", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
   
     chart.legend = new am4charts.Legend();
   
   chart.data = [
    {
    country: "Approved",
    litres: this.dashBoardList.EUR.kycApproved + this.dashBoardList.UK.kycApproved +this.dashBoardList.ROW.kycApproved
  },
    {
    country: "Pending",
    litres:this.dashBoardList.EUR.kycPending + this.dashBoardList.UK.kycPending +this.dashBoardList.ROW.kycPending
  },
    {
    country: "Rejected",
    litres: this.dashBoardList.EUR.kycRejected + this.dashBoardList.UK.kycRejected +this.dashBoardList.ROW.kycRejected
  },
 
   ];
   
   let series = chart.series.push(new am4charts.PieSeries3D());
     series.dataFields.value = "litres";
     series.dataFields.category = "country";
  }


  getDashBoard(){

    let url = apiEndpoint.dashBoard.getDashboard+`?ip=${localStorage.getItem('ip')}`
      this.server.showSpinner()
      this.server.getApi(url).subscribe(res => {
        this.server.hideSpinner()
        if (res.status == 200) {
          this.dashBoardList = res.data 
          this.firstChart()
          this.secondChart()
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


  // {
  //   "status": 200,
  //   "message": "Success.",
  //   "data": {
  //     "EUR": {
  //       "country": null,
  //       "totalUsers": 1,
  //       "kycPending": 0,
  //       "kycRejected": 0,
  //       "kycApproved": 0
  //     },
  //     "UK": {
  //       "country": null,
  //       "totalUsers": 1,
  //       "kycPending": 0,
  //       "kycRejected": 0,
  //       "kycApproved": 0
  //     },
  //     "ROW": {
  //       "country": null,
  //       "totalUsers": 1,
  //       "kycPending": 0,
  //       "kycRejected": 0,
  //       "kycApproved": 0
  //     }
  //   },
  //   "timestamp": "2021-08-05T08:37:40.806+00:00"
  // }

}
