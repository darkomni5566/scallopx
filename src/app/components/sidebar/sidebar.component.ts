import { Component, OnInit } from "@angular/core";
import { ServerService } from "src/app/service/server.service";


declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
  hash_id:any;
  id:any;
  children:any;
}
export let ROUTES: RouteInfo[] = [
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any=[];

  constructor(private server:ServerService) {
    ROUTES = this.server.ROUTES
  }

  ngOnInit() {
    this.menuItems = this.server.menuItems
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }


  
}
