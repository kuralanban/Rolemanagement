import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { PermissionsService } from '../permissions.service';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class SuperadmingaurdService {

  constructor(private permissionService:PermissionsService,private notification:CommonService,private route:Router) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
   if(this.permissionService.adminStatus()){
     return true;
   }
   else{
     this.route.navigate(['/home/user']);
     this.notification.openCustomSnackbar('Access Denied')
   }
   return true;
 }
}
