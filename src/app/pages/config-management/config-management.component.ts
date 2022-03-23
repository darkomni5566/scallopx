import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/service/server.service';
import { apiEndpoint } from 'src/environments/environment.prod';

@Component({
  selector: 'app-config-management',
  templateUrl: './config-management.component.html',
  styleUrls: ['./config-management.component.scss']
})
export class ConfigManagementComponent implements OnInit {
  totalItems: number;
  configList: any[];
  configDetails: any = {};
  title: string;
  buttonName: string;
  ObjArr: any = [];
  configUpdateDetails: any = {};
  selectedIndex: any = null;
  permissionObj: any={};

  constructor(public server: ServerService, private router: Router, private route: ActivatedRoute) {
    let  permitted_routes 
    permitted_routes = localStorage.getItem('permitted') ? JSON.parse(atob(localStorage.getItem('permitted'))) : []
    this.permissionObj = permitted_routes.find(x=>x.name == 'Configuration Management') 

    let url = window.location.href
    if (this.router.url.includes('config-management')) {
      this.title = 'CONFIGURATION MANAGEMENT';
      this.buttonName = 'list';
    } else if (this.router.url.includes('config-details')) {
      this.title = this.configDetails.configurationFor;
      this.buttonName = 'View';
    } else {
      this.title = 'CONFIGURATION UPDATE';
      this.buttonName = 'Update';
    }
  }

  ngOnInit(): void {
    this.getConfigList()
  }

  //--------Transaction Get Api Integrtion -------------//
  getConfigList() {
    this.configList = []
    this.totalItems = 0;
    let url = apiEndpoint.config.getAllConfigList
    this.server.getApi(url).subscribe(res => {
      if (res.status == 200) {
        this.configList = res.data
        this.noConfigDetails(this.configList[0])
      }
    })
  }


  postConfig() {
    let url = apiEndpoint.config.getAllConfigList + `?configurationName=${this.configDetails.configurationFor}`
    this.server.postApi(url, '').subscribe(res => {
      if (res.status == 200) {
        this.configUpdateDetails = res.data
        let objKeyArr = Object.keys(this.configUpdateDetails)
        let objValueArr = Object.values(this.configUpdateDetails)
        let disable = true
        this.ObjArr = []
        for (let i = 0; i < objKeyArr.length; i++) {
          this.ObjArr.push({
            key: objKeyArr[i],
            value: objValueArr[i],
            disabled: disable
          })
        }

      }
    })
  }


  noConfigDetails(item) {
    this.configDetails = item;
    if (this.configDetails.configurations.length == 0) {
      this.server.showErrToast('No Configurations Found')
      return;
    }
    this.postConfig();

  }

  onEditAction() {
    this.ObjArr.forEach(element => {
      element.disabled = false
    });
  }

  onSaveConfig() {
    let url = apiEndpoint.config.getAllConfigList +`?configurationName=${this.configDetails.configurationFor}`
    let arr =[]
   this.ObjArr.map(x=>arr.push(x.value))
    let req = {
      "configurations": JSON.stringify(this.ObjArr),
      "configurationFor": this.configDetails.configurationFor,
      "id": this.configDetails.id
    }
    this.server.putApi(url, req).subscribe((res: any) => {
      if (res.status == 200) {
        this.server.showSuccToast(res.message);
        this.getConfigList()
      }
    })
  }

}
