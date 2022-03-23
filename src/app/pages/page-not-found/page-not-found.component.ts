import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  showPage: boolean=false;
  message: string;
  constructor(private service: ServerService) { 
    let url = window.location.href;
    if(url.includes('page-not-found')){
      this.showPage = true
    }else {
      this.showPage = false
    }
    this.checkEnv()
  }

  checkEnv(){
    if(this.service.baseUrl == 'https://devapi.scallopx.com/'){
      this.message = 'DEV CONNECTED!'
    }

    if(this.service.baseUrl.includes('https://api.scallopx.com/')){
      this.message = 'LIVE CONNECTED!'
    }

  }

  showMsg(msg){
    this.service.showSuccToast(msg);
    if(msg == 'DEV CONNECTED!'){
      this.service.baseUrl = 'https://devapi.scallopx.com/'
    }
    if(msg == 'LIVE CONNECTED!'){
      this.service.baseUrl = 'https://api.scallopx.com/'
    }
    this.checkEnv();
  }

  ngOnInit(): void {
    
  }
}