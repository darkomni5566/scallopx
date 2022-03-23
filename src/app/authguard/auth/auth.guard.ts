import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ServerService } from 'src/app/service/server.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      if(this.server.isAuthenticated()) {
     
        return true
      } else{
      this.router.navigate(['/login']);
        return false;
    }
    
  }

  

  constructor(public server: ServerService,public router:Router){}
  
}

export class AuthGuard2 implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      if(this.server.isAuthenticated()) {
     
        return true
      } else{
      this.router.navigate(['/login']);
        return false;
    }
    
  }

  

  constructor(public server: ServerService,public router:Router){}
  
}



