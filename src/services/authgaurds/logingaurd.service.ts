import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { PermissionsService } from '../permissions.service';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class LogingaurdService {
  constructor(private permissionService:PermissionsService,private notification:CommonService,private route:Router) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
   if(this.permissionService.loginStatus()){
     return true;
   }
   else{
     this.route.navigate(['auth']);
     this.notification.openCustomSnackbar('Kindly Login, To access home !')
   }
   return true;
 }
}
